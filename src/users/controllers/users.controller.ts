import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { UserSignUpDTO } from '../dto/user-signup.dto';
import { AuthService } from '../services/auth.service';
import { UserLoginDTO } from '../dto/user-login.dto';
import { Auth } from 'src/decorators/auth.decorator';
import { User } from '../entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

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

    @Get('google-login')
    @UseGuards(AuthGuard('google-auth'))
    async googleLogin(){
          
       
    }

    @Get('google-auth-callback')
    @UseGuards(AuthGuard('google-auth'))
    async googleAuthCallback(@Request() req){
        return req.user
    }
}
