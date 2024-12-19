import { Body, Controller, Post } from "@nestjs/common";
import { RegisterUserDto } from "src/users/models/dtos/register-user.dto";
import { RegisterUserService } from "./register-user.service";

@Controller('users')
export class RegisterUserController {
    constructor (
        private readonly registerUserService: RegisterUserService
    ) {}

    @Post('/register')
    async register(
        @Body() newUser: RegisterUserDto
    ) {
        return await this.registerUserService.execute(newUser);
    }
}