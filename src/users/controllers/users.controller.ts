import { Body, Controller, Get, Param, Post, Request, Response, UseGuards } from '@nestjs/common';
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
    async googleAuthCallback(@Request() req, @Response() res){
        res.header('Authorization', `Bearer ${req.user.token}`)
        return res.status(200).json({
          status:  'success',
          message: 'User logged in successfully'
         })
    }


    @Get('microsoft-login')
    @UseGuards(AuthGuard('microsoft-auth'))
    async microsoftLogin(){
          
       
    }

    @Get('microsoft-auth-callback')
    @UseGuards(AuthGuard('microsoft-auth'))
    async microsoftLoginCallback(@Request() req, @Response() res){
       
      res.header('Authorization', `Bearer ${req.user.token}`)
      return res.status(200).json({
         status:  'success',
         message: 'User logged in successfully'
      })
    }

    @Get('github-login')
    @UseGuards(AuthGuard('github-auth'))
    async githubLogin(){
          
       
    }

    @Get('github-auth-callback')
    @UseGuards(AuthGuard('github-auth'))
    async githubLoginCallback(@Request() req, @Response() res){
 
      res.header('Authorization', `Bearer ${req.user.token}`)
      return res.status(200).json({
           status:  'fail',
           message: 'User logged in successfully'
      })    
    }
}
