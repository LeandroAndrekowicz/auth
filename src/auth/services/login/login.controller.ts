import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto } from "src/auth/models/dtos/login.dto";
import { LoginResponseType } from "src/auth/models/types/login-response.type";
import { UsersEntity } from "src/users/models/entities/users.entity";
import { LoginService } from "./login.service";

@Controller('auth')
export class LoginController {
    constructor (
        private readonly loginService: LoginService
    ) {}

    @Post('/login')
    async login(
        @Body() login: LoginDto,
    ): Promise<UsersEntity | LoginResponseType> {        
        return await this.loginService.execute(login);
    }
}