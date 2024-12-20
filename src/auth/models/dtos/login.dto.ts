import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsString({message: 'O login do usuário deve ser uma STRING.'})
    @IsNotEmpty({message: 'O login do usuário não pode ser NULO.'})
    login: string;

    @IsString({message: 'A senha do usuário deve ser uma STRING.'})
    @IsNotEmpty({message: 'A senha do usuário não pode ser NULA.'})
    password: string;
}