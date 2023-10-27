import { Body, Controller, Param, Post } from '@nestjs/common';
import { UserSignUpDTO } from '../dto/user-signup.dto';
import { AuthService } from '../services/auth.service';
import { UserLoginDTO } from '../dto/user-login.dto';
import { Auth } from 'src/decorators/auth.decorator';
import { User } from '../entities/user.entity';

@Controller('users')
export class UsersController {

    constructor(private authService: AuthService){}

    @Post('singup')
    async singup(@Body() userSignUpDto: UserSignUpDTO){

       return await this.authService.singup(userSignUpDto)

    }

    @Post('login')
    async login(@Body() userLoginDto: UserLoginDTO){

       return await this.authService.login(userLoginDto)
    }

    @Post('verify-email/:token')
    async verifyEmail(@Param('token') token: string){

      return await this.authService.verifyEmailToken(token)

    }
}
