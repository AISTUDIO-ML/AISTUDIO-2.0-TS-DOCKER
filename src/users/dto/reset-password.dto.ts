import { IsNotEmpty, IsString } from "class-validator"


export class ResetPasswordDTO {

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsString()
    confirmPassword: string

}