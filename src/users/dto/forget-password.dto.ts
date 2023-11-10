import { IsEmail, IsNotEmpty, IsString } from "class-validator";



export class ForgetPasswordDTO{

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string
}