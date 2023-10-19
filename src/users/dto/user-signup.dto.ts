import { IsEmpty, IsNotEmpty, IsString } from "class-validator";


export class UserSignUpDTO{

    @IsString()
    @IsNotEmpty()
    username: string


    @IsNotEmpty()
    @IsString()
    password: string

    @IsEmpty()
    verifyToken: string;

}