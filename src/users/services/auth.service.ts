import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserSignUpDTO } from "../dto/user-signup.dto";
import { UserService } from "./users.service";
import { MailerService } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import { UserLoginDTO } from "../dto/user-login.dto";
import { JwtService } from "@nestjs/jwt";
import { UserUpdateDTO } from "../dto/user-update.dto";
import { User } from "../entities/user.entity";
import { promises } from "dns";
import { InjectRepository } from "@nestjs/typeorm";
import { Token } from "../entities/token.entity";
import { Repository } from "typeorm";



@Injectable()
export class AuthService {

    constructor(
        private userService   : UserService,
        private mailerService : MailerService,
        private configService : ConfigService,
        private jwtService    : JwtService,
        @InjectRepository(Token) private tokenRepository: Repository<Token>

    ){}


    async singup(userSignUpDto: UserSignUpDTO){
       if( await this.userService.isUniqueUsername( userSignUpDto.username)){
          throw new BadRequestException('Username already exists')
       }
       userSignUpDto.verifyToken = await this.userService.createUniqueVerifyToken();
       const  createdUser = await this.userService.create(userSignUpDto)
       const  verifyToken = await this.userService.getVerifyTokenByUserId(createdUser.id)
       this.mailerService.sendMail({
          to:         createdUser.username,
          sender:     this.configService.getOrThrow('mail.from'),
          subject:    'Verify Email',
          template:   'signup',
          context:{
             link: this.configService.get('app.frontend_host') + '/verify/' + verifyToken
          }
       })
       return createdUser;
    }

    async login(userLoginDto: UserLoginDTO){
         const user     = await this.userService.findByUsername(userLoginDto.username)
         if( !user ){
             throw new UnauthorizedException();
         }

         const password = await this.userService.getPasswordByUserId(user.id)
         if(password !== userLoginDto.password){
            throw new UnauthorizedException()
         }

         const payload =  {
            sub: user.id
         }
         return { 
              token: await this.jwtService.sign(payload)
         }
    }

    async verifyEmailToken( verifyToken: string): Promise<User>{
         const existedUser = await this.userService.findByVerifyToken( verifyToken )
         if(!existedUser){
            throw new BadRequestException('Invalid Token')
         }
         if(existedUser.verified){
            throw new BadRequestException('User alreay verified')
         }
         const userUpdateDto = new UserUpdateDTO();
         userUpdateDto.verified = true;
         const  updatedUser = await this.userService.updateById(existedUser.id, userUpdateDto)
         return updatedUser;
    }


    async loginWithGoogle( authData: any ): Promise<string>{

      let loggedUser: User;
      loggedUser = await this.userService.getUserByGoogleProfileId( authData.profileId );
      if( !loggedUser ){
         let newUserData: User = new User();
         newUserData.profileId = authData.profileId;
         newUserData.provider  = 'google'
         newUserData.verified  = true
         loggedUser = await this.userService.create(newUserData)
      }
      const  payload = { sub: loggedUser.id }
      return this.jwtService.sign( payload );
    }

    async loginWithMicrosoft( authData: any ): Promise<string>{

      let loggedUser: User;
      loggedUser = await this.userService.getUserByMicrosoftProfileId( authData.profileId );
      if( !loggedUser ){
         let newUserData: User = new User();
         newUserData.profileId = authData.profileId;
         newUserData.provider  = 'microsoft'
         newUserData.verified  = true
         loggedUser = await this.userService.create(newUserData)
      }
      const  payload = { sub: loggedUser.id }
      return this.jwtService.sign( payload );
    }

    async loginWithGithub( authData: any ): Promise<string>{

      let loggedUser: User;
      loggedUser = await this.userService.getUserByGithubProfileId( authData.profileId );
      if( !loggedUser ){
         let newUserData: User = new User();
         newUserData.profileId = authData.profileId;
         newUserData.provider  = 'github'
         newUserData.verified  = true,
         newUserData.username  = authData.username
         loggedUser = await this.userService.create(newUserData)
      }
      const  payload = { sub: loggedUser.id }
      return this.jwtService.sign( payload );
    }

    
    randStr(length): string {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result  += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
      }
      return result;
   }

   async handleForgetPassword(email: string): Promise<void> {

      const user = await this.userService.findByUsername( email );
      if(!user){
          throw new BadRequestException('This email not exists');
      }
      
      await this.tokenRepository.delete({ email: email});

      let uniqueToken: string;
      while( true){
          uniqueToken = this.randStr(50);
          const dup   = await this.tokenRepository.findOne({ where: { token: uniqueToken }});
          if(!dup){
            break;
          }
      }
      const newToken = new Token;
      newToken.token = uniqueToken;
      newToken.email = email;
      await this.tokenRepository.save(newToken)
      this.mailerService.sendMail({
          sender:    this.configService.getOrThrow('mail.from'),
          to:        newToken.email,
          template:  'forget-password',
          subject:   'Reset Password',
          context:{
             link: `${this.configService.getOrThrow('app.frontend_host')}/reset-password/${newToken.token}`
          }
      })
   }

   async handleResetPassword(
      verifyToken: string,
      password: string,
      confirmPassword: string
   ){
        if(password !== confirmPassword){
           throw new BadRequestException('Password and confirm password are not equal');
        }

        const token = await this.tokenRepository.findOne({ where: { token: verifyToken}})

        if(!token){
           throw new BadRequestException('Invalid token')
        }

        await this.userService.updatePasswordByEmail(token.email, password);
        this.tokenRepository.remove( token );
   }
}