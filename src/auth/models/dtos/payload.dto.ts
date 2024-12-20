import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PayloadDto {
    @IsNotEmpty({message: 'O Id do usuário não pode ser NULO.'})
    @IsNumber({}, {message: 'O Id do usuário deve ser um NUMERO.'})
    @IsInt({message: 'O Id do usuário deve ser um NUMERO INTEIRO.'})
    userId: number;
    
    @IsNotEmpty({message: 'O nome do usuário não pode ser NULO.'})
    @IsString({message: 'O nome do usuário deve ser uma STRING.'})
    username: string;
    
    @IsNotEmpty({message: 'O cargo do usuário não pode ser NULO.'})
    @IsString({message: 'O cargo do usuário deve ser uma STRING.'})
    role: string;
}