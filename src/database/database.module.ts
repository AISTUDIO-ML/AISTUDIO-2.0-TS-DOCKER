import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invitation } from 'src/invitations/entities/invitation.entity';
import { Team } from 'src/teams/entities/team.entity';
import { Token } from 'src/users/entities/token.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
    imports:[
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService)=>{
                return {
                    type:     'mysql',
                    host:     configService.getOrThrow('database.host'),
                    port:     configService.getOrThrow('database.port'),
                    username: configService.getOrThrow('database.user'),
                    password: configService.getOrThrow('database.pass'),
                    database: configService.getOrThrow('database.name'),
                    entities:[User,Invitation,Team, Token]
                }
            },
            inject:[ConfigService]
        })
    ]
})
export class DatabaseModule {}
