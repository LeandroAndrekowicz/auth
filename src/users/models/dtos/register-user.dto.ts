import { IsNotEmpty, IsString } from "class-validator";

export class RegisterUserDto { 
    @IsString({message: 'O nome do usuário deve ser uma STRING.'})
    @IsNotEmpty({message: 'O nome do usuário não pode ser NULO.'})
    username: string;

    @IsString({message: 'O login do usuário deve ser uma STRING.'})
    @IsNotEmpty({message: 'O login do usuario não pode ser NULO.'})
    login: string;

    @IsString({message: 'A senha do usuário deve ser uma STRING.'})
    @IsNotEmpty({message: 'A senha do usuário não pode ser NULO.'})
    password: string;
}