import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserSignUpDTO } from "../dto/user-signup.dto";
import { UserService } from "./users.service";
import { MailerService } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import { UserLoginDTO } from "../dto/user-login.dto";
import { JwtService } from "@nestjs/jwt";
import { UserUpdateDTO } from "../dto/user-update.dto";
import { User } from "../entities/user.entity";



@Injectable()
export class AuthService {

    constructor(
        private userService   : UserService,
        private mailerService : MailerService,
        private configService : ConfigService,
        private jwtService    : JwtService

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

    async verifyEmailToken(user: User, verifyToken: string): Promise<User>{
         const existedUser = await this.userService.findByVerifyToken(user, verifyToken )
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

}