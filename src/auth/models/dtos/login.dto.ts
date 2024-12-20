import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({
        description: 'Login que será validado.',
        name: 'login',
        type: String,
        example: 'teste.test',
        required: true,
        nullable: false
    })
    @IsString({ message: 'O login do usuário deve ser uma STRING.' })
    @IsNotEmpty({ message: 'O login do usuário não pode ser NULO.' })
    login: string;

    @ApiProperty({
        description: 'Senha que será validada.',
        name: 'password',
        type: String,
        example: '123456',
        required: true,
        nullable: false
    })
    @IsString({ message: 'A senha do usuário deve ser uma STRING.' })
    @IsNotEmpty({ message: 'A senha do usuário não pode ser NULA.' })
    password: string;
}