import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class RegisterUserDto { 
    @ApiProperty({
        description: 'Nome do usuario.',
        name: 'username',
        type: String,
        example: 'Leandro Andrade',
        required: true,
        nullable: false
    })
    @IsString({message: 'O nome do usuário deve ser uma STRING.'})
    @IsNotEmpty({message: 'O nome do usuário não pode ser NULO.'})
    username: string;

    @ApiProperty({
        description: 'Login que o usuario irá usar para realizar o login.',
        name: 'login',
        type: String,
        example: 'leandro.an',
        required: true,
        nullable: false
    })
    @IsString({message: 'O login do usuário deve ser uma STRING.'})
    @IsNotEmpty({message: 'O login do usuario não pode ser NULO.'})
    login: string;

    @ApiProperty({
        description: 'Senha que o usuario irá usar para realizar o login.',
        name: 'password',
        type: String,
        example: '123456',
        required: true,
        nullable: false
    })
    @IsString({message: 'A senha do usuário deve ser uma STRING.'})
    @IsNotEmpty({message: 'A senha do usuário não pode ser NULO.'})
    password: string;
}