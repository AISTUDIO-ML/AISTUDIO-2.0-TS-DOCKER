import { Body, Controller, Get, Header, Param, Post } from '@nestjs/common';
import { CreateInvitationDTO } from '../dto/create-invitation.dto';
import { Auth } from 'src/decorators/auth.decorator';
import { User } from 'src/users/entities/user.entity';
import { InvitationService } from '../services/invitation.service';
@Controller('invitations')
export class InvitationsController {

    constructor(private invitationService: InvitationService){}

    @Post()
    async create(
        @Body() createInviationDto: CreateInvitationDTO,
        @Auth() auth: User
    ){
      
       await this.invitationService.create(createInviationDto, auth);
       return {
           status:  'success',
           message: 'Invitation sent successfuly'
       }
    }

    @Get('accept/:token')
    async validate(
        @Param('token') token: string,
        @Auth() auth: User
    ){
       await this.invitationService.accept(auth, token);
       return {
         status:  'success',
         message: 'Invitation accepted successfuly'
       }
    }
}
