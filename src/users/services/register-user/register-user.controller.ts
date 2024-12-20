import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RegisterUserDto } from "src/users/models/dtos/register-user.dto";
import { RegisterUserService } from "./register-user.service";

@ApiTags('USER')
@Controller('users')
export class RegisterUserController {
    constructor (
        private readonly registerUserService: RegisterUserService
    ) {}
    @ApiOperation({ summary: 'Rota responsável cadastrar um novo usuário a API.' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Usuário cadastrado com sucesso.' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Já possuimos um registro com esse login na base de dados.' })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Erro interno do servidor.' })
    @ApiBody({ type: RegisterUserDto, description: 'Informações passadas via body para realizar o cadastro de um novo usuário.', required: true })
    @Post('/register')
    async register(
        @Body() newUser: RegisterUserDto
    ) {
        return await this.registerUserService.execute(newUser);
    }
}