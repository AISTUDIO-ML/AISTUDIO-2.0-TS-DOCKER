import { IsEmail, IsNotEmpty } from "class-validator";


export class CreateInvitationDTO{

    @IsNotEmpty()
    @IsEmail()
    email: string

}

