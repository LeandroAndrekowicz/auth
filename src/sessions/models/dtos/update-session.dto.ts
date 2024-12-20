import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateSessionDto {
    @IsOptional()
    @IsString({message: 'O token deve ser uma STRING.'})
    token: string;

    @IsOptional()
    @IsString({message: 'O refresh token deve ser uma STRING.'})
    refreshToken: string;

    @IsOptional()
    @IsString({message: 'O navegador deve ser uma STRING.'})
    browser: string;

    @IsOptional()
    @IsString({message: 'O host deve ser uma STRING.'})
    host: string;

    @IsNotEmpty({message: 'O Id do usuário não pode ser NULO.'})
    @IsNumber({}, {message: 'O Id do usuário deve ser um NUMERO.'})
    @IsInt({message: 'O Id do usuário deve ser um NUMERO INTEIRO.'})
    userId: number;
}