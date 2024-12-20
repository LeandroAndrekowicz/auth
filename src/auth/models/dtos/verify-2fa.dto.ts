import { IsNotEmpty, IsString } from "class-validator";
import { LoginDto } from "./login.dto";

export class Verify2FaDto extends LoginDto {
    @IsNotEmpty({message: 'O código OTP não pode ser NULO.'})
    @IsString({message: 'O código OTP deve ser uma STRING.'})
    otpCode: string;
}