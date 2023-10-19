import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from'@nestjs/config'
import { APP_CONFIG } from 'config/app.config';
import { DATABASE_CONFIG } from 'config/database.config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ValidationPipe } from './pipes/validation.pipe';
import { APP_PIPE } from '@nestjs/core';
import { MailModule } from './mail/mail.module';
import { MAIL_CONFIG } from 'config/mail.config';
import { JWT_CONFIG } from 'config/jwt.config';
import { InvitationsModule } from './invitations/invitations.module';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:[`config/env/${process.env.NODE_ENV}.env`],
      load:[APP_CONFIG, DATABASE_CONFIG,MAIL_CONFIG, JWT_CONFIG],
      isGlobal: true
    }),
    DatabaseModule,
    UsersModule,
    MailModule,
    InvitationsModule,
    TeamsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ],
})
export class AppModule {}
