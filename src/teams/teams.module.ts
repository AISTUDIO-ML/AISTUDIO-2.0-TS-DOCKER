import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TeamService } from './services/team.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { TeamController } from './controllers/team.controller';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({

    imports:     [TypeOrmModule.forFeature([Team]),JwtModule],
    providers:  [TeamService],
    exports:     [TeamService],
    controllers: [TeamController]
})
export class TeamsModule implements NestModule{

    configure(consumer: MiddlewareConsumer) {
      consumer.apply(AuthMiddleware).forRoutes(TeamController) 
    }
}
