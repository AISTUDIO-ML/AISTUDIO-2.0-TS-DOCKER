import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { InvitationsController } from './controllers/invitations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invitation } from './entities/invitation.entity';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { InvitationService } from './services/invitation.service';
import { TeamsModule } from 'src/teams/teams.module';

@Module({
  imports:[TypeOrmModule.forFeature([Invitation]),JwtModule, TeamsModule],
  controllers: [InvitationsController],
  providers:[InvitationService]
})
export class InvitationsModule implements NestModule{

  configure(consumer: MiddlewareConsumer) {
       consumer.apply(AuthMiddleware).forRoutes(InvitationsController) 
  }

}
