import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "src/auth/models/dtos/login.dto";
import { LoginResponseType } from "src/auth/models/types/login-response.type";
import { UsersEntity } from "src/users/models/entities/users.entity";
import { LoginService } from "./login.service";

@ApiTags('AUTH')
@Controller('auth')
export class LoginController {
    constructor(
        private readonly loginService: LoginService
    ) { }

    @ApiOperation({ summary: 'Rota responsável por realizar o Login do usuário.' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Sucesso ao realizar login.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Usuario ou senha inválidos.' })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Erro interno do servidor.' })
    @ApiBody({ type: LoginDto, description: 'Informações passadas via body para realizar o login do usuário.', required: true })
    @Post('/login')
    async login(
        @Body() login: LoginDto,
    ): Promise<UsersEntity | LoginResponseType> {
        return await this.loginService.execute(login);
    }
}