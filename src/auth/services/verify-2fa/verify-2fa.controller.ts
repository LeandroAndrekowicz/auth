import { Body, Controller, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { Verify2FaDto } from "src/auth/models/dtos/verify-2fa.dto";
import { Verify2FaService } from "./verify-2fa.service";

@Controller('auth')
export class Verify2FaController {
    constructor (
        private readonly verify2FaService: Verify2FaService
    ) {}

    @Post('/verify')
    async verify(
        @Body() newSession: Verify2FaDto,
        @Req() request: Request
    ): Promise<{ message: string; accessToken: string; }> {
        return await this.verify2FaService.execute(newSession, request);
    }
}