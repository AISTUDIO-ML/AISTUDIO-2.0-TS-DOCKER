import { Global, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UserService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { GoogleAuthStrategy } from './strategies/google.strategy';
import { PassportModule } from '@nestjs/passport';

@Global()
@Module({
  imports:     [
     TypeOrmModule.forFeature([User]),
     JwtModule.registerAsync({
       useFactory: (configService: ConfigService) =>{
          return {
             global: true,
             secret: configService.getOrThrow('jwt.secret'),
             signOptions:{
               expiresIn: configService.getOrThrow('jwt.expiresIn'),
             }
          }
       },
       inject:[ConfigService]
     }),
     PassportModule
  ],
  controllers: [UsersController],
  providers:   [UserService, AuthService,GoogleAuthStrategy],
  exports:     [UserService]
})
export class UsersModule implements NestModule{
  
  configure(consumer: MiddlewareConsumer) {
       consumer.apply(AuthMiddleware)
       .exclude(
        {path: 'users/login',  method: RequestMethod.ALL},
        {path: 'users/singup', method: RequestMethod.ALL},
        {path: 'users/verify-email/:token', method: RequestMethod.ALL},
        {path: 'users/google-login', method: RequestMethod.ALL},
        {path: 'users/google-auth-callback', method: RequestMethod.ALL}
       )
       .forRoutes(UsersController)
  }
}
