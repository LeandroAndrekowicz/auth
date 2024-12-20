import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSessionDto {
    @IsNotEmpty({message: 'O token não pode ser NULO.'})
    @IsString({message: 'O token deve ser uma STRING.'})
    token: string;

    @IsNotEmpty({message: 'O refresh token não pode ser NULO.'})
    @IsString({message: 'O refresh token deve ser uma STRING.'})
    refreshToken: string;

    @IsNotEmpty({message: 'O navegador não pode ser NULO.'})
    @IsString({message: 'O navegador deve ser uma STRING.'})
    browser: string;

    @IsNotEmpty({message: 'O host não pode ser NULO.'})
    @IsString({message: 'O host deve ser uma STRING.'})
    host: string;

    @IsNotEmpty({message: 'O Id do usuário não pode ser NULO.'})
    @IsNumber({}, {message: 'O Id do usuário deve ser um NUMERO.'})
    @IsInt({message: 'O Id do usuário deve ser um NUMERO INTEIRO.'})
    userId: number;
}