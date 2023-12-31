import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Not, Repository } from "typeorm";
import { UserSignUpDTO } from "../dto/user-signup.dto";
import { UserUpdateDTO } from "../dto/user-update.dto";



@Injectable()
export class UserService{

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ){}


    async create(userSignUpDto: UserSignUpDTO){
         const user = await this.usersRepository.save( userSignUpDto )
         return await this.usersRepository.findOne({ where:{ id: user.id}})
    }


    async createUniqueVerifyToken(): Promise<string>{
        let result;
        while(true){
            const token =  this.randStr(50)
            const user  =  await this.usersRepository.findOne({where:{ verifyToken: token}})
            if(!user){
                result  = token
                break
            }
        }
        return result;
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

    async isUniqueUsername(username: string){

      const user = await this.usersRepository.findOne({where: { username }})
      if(user){
        return true;
      }
      return false;
    }

    async findByUsername(username: string): Promise<User>{
        const  user = await this.usersRepository.findOne({where: { username }})
        return user;
    }


    async findByVerifyToken(token: string): Promise<User>{

        const  foundUser = await this.usersRepository.findOne({where: { verifyToken: token} })
        return foundUser;
    }

    async updateById(userId: number, userUpdateDto: UserUpdateDTO){
        const user = await this.usersRepository.findOne({ where:{id: userId}})
        user.username = userUpdateDto.username;
        user.password = userUpdateDto.password;
        user.verified = userUpdateDto.verified;
        return this.usersRepository.save(user)
    }

    async findById(userId: number){
        const  user = await this.usersRepository.findOne({ where:{id: userId}})
        return user;
    }
    
    async getVerifyTokenByUserId(userId: number): Promise<string>{
        const  user = await this.usersRepository.findOne({ where:{id: userId}, select:['verifyToken']})
        return user.verifyToken;
    }

    async getPasswordByUserId(userId: number): Promise<string>{
        const  user = await this.usersRepository.findOne({ where:{id: userId}, select:['password']})
        return user.password;
    }

    async getUserByUsername( username: string): Promise<User>{
        const  user = await this.usersRepository.findOne({ where:{ username }})
        return user;
    }

    async createUser(userData: User): Promise<User>{
       const  user = await this.usersRepository.save( userData );
       return user;
    }

    async getUserByGoogleProfileId( profileId: string): Promise<User>{
        const  user = await this.usersRepository.findOne({ where:{ profileId: profileId, provider: 'google' }})
        return user;
    }

    async getUserByMicrosoftProfileId( profileId: string): Promise<User>{
        const  user = await this.usersRepository.findOne({ where:{ profileId: profileId, provider: 'microsoft' }})
        return user;
    }

    async getUserByGithubProfileId( profileId: string): Promise<User>{
        const  user = await this.usersRepository.findOne({ where:{ profileId: profileId, provider: 'github' }})
        return user;
    }

    async updatePasswordByEmail(email: string, password: string): Promise<void>{

        const user = await this.usersRepository.findOne({ where:{ username: email }});
        if(user){
             user.password = password;
             this.usersRepository.save( user );
        }
    }
    // async checkEmailIsTaken( email: string, exceptPlatform: string ): Promise<User>{
    //     const user = await this.usersRepository.findOne({ where: {
    //         username: email,
    //         provider: Not( exceptPlatform )
    //     }})
    //     return user;
    // }
}