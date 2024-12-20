import { Body, Controller, HttpStatus, Post, Req } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { Verify2FaDto } from "src/auth/models/dtos/verify-2fa.dto";
import { Verify2FaService } from "./verify-2fa.service";

@ApiTags('AUTH')
@Controller('auth')
export class Verify2FaController {
    constructor(
        private readonly verify2FaService: Verify2FaService
    ) { }

    @ApiOperation({ summary: 'Rota responsável por realizar a verificação do código OTP do usuário.' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Código validado com sucesso.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Código OTP enviado é inválido.' })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Erro interno do servidor.' })
    @ApiBody({ type: Verify2FaDto, description: 'Informações passadas via body para realizar a validação do código OTP do usuário.', required: true })
    @Post('/verify')
    async verify(
        @Body() newSession: Verify2FaDto,
        @Req() request: Request
    ): Promise<{ message: string; accessToken: string; }> {
        return await this.verify2FaService.execute(newSession, request);
    }
}