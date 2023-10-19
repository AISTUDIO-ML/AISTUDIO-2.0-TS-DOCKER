import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Invitation } from "../entities/invitation.entity";
import { Repository } from "typeorm";
import { CreateInvitationDTO } from "../dto/create-invitation.dto";
import { User } from "src/users/entities/user.entity";
import { MailerService } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import { TeamService } from "src/teams/services/team.service";
import { UserService } from "src/users/services/users.service";


@Injectable()
export class InvitationService{

    constructor(
        @InjectRepository(Invitation) private invitationRepository: Repository<Invitation>,
        private mailerService: MailerService,
        private configService: ConfigService,
        private teamService:   TeamService,
    ){}

    async create(createInviationDto: CreateInvitationDTO, user: User){

        const existedTeam = await this.teamService.getTeamByEmail(user, createInviationDto.email)
        console.log(existedTeam)
        if(existedTeam){
             throw new BadRequestException('This email already a member')
        }
        const uniqueToken = await this.createUniqueVerifyToken();
        const invitation = new Invitation();
        invitation.email = createInviationDto.email;
        invitation.token = uniqueToken;
        invitation.owner  = user;
        this.invitationRepository.save(invitation);
        this.mailerService.sendMail({
            to:         createInviationDto.email,
            sender:     this.configService.getOrThrow('mail.from'),
            subject:    'Invitation Email',
            template:   'invitation',
            context:{
               link: this.configService.get('app.frontend_host') + '/verify/' + uniqueToken
            }
        })
    } 


    async accept(user: User, token: string){

        const invitation = await this.invitationRepository.findOne({where:{ token: token },relations:{owner:true}});
        if(!invitation){
            throw new BadRequestException('Invalid token');
        }
        if(invitation.email !== user.username){
            throw new BadRequestException('Invalid token');
        }
        if(invitation.used){
            throw new BadRequestException('Invalid token')
        }
        invitation.used = true;
        await this.invitationRepository.save(invitation);
        await this.teamService.create(invitation.owner, user)

    }

    async createUniqueVerifyToken(): Promise<string>{
        let result;
        while(true){
            const token =  this.randStr(50)
            const user  =  await this.invitationRepository.findOne({where:{ token: token}})
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
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }
}