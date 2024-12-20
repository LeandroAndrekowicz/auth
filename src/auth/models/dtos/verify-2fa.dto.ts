import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { LoginDto } from "./login.dto";

export class Verify2FaDto extends LoginDto {
    @ApiProperty({
        description: 'Código OTP que será validado.',
        name: 'otpCode',
        type: String,
        example: '587214',
        required: true,
        nullable: false
    })
    @IsNotEmpty({ message: 'O código OTP não pode ser NULO.' })
    @IsString({ message: 'O código OTP deve ser uma STRING.' })
    otpCode: string;
}