import { IsEmail, IsNotEmpty, IsString } from "class-validator"


export class UserLoginDTO{

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    username: string

    @IsNotEmpty()
    @IsString()
    password: string
}