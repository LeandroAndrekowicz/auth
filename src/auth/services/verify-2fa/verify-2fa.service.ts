import { HttpException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { authenticator } from 'otplib';
import { PayloadDto } from 'src/auth/models/dtos/payload.dto';
import { Verify2FaDto } from 'src/auth/models/dtos/verify-2fa.dto';
import { CreateSessionDto } from 'src/sessions/models/dtos/create-session.dto';
import { SessionsEntity } from 'src/sessions/models/entities/sessions.entity';
import { CreateSessionService } from 'src/sessions/services/create-session/create-session.service';
import { FindUserSessionsService } from 'src/sessions/services/find-user-sessions/find-user-sessions.service';
import { UpdateSessionService } from 'src/sessions/services/update-session/update-session.service';
import { UsersEntity } from 'src/users/models/entities/users.entity';
import { UpdateUserFirstAccessService } from 'src/users/services/update-user-first-access/update-user-first-access.service';
import { LoginService } from '../login/login.service';

@Injectable()
export class Verify2FaService {
    constructor(
        private readonly createSessionService: CreateSessionService,
        private readonly loginService: LoginService,
        private readonly jwtService: JwtService,
        private readonly findUserSessionsService: FindUserSessionsService,
        private readonly updateSessionService: UpdateSessionService,
        private readonly updateUserFirstAccessService: UpdateUserFirstAccessService
    ) { }

    async execute(login: Verify2FaDto, request: Request): Promise<{ message: string; accessToken: string; }> {
        try {
            const user: UsersEntity = await this.loginService.execute(login, true) as UsersEntity;
            const isValid: boolean = this.validateOtpCode(user.tfaSecret, login.otpCode);

            if (!isValid) {
                throw new UnauthorizedException('Código OTP inválido, por favor tente novamente.');
            }

            const payload: PayloadDto = {
                userId: user.id,
                username: user.username,
                role: user.role,
            }

            const token: string = await this.generateToken(process.env.SECRET_SESSION, process.env.SECRET_EXPIRATION, payload);
            const refreshToken: string = await this.generateToken(process.env.REFRESH_SECRET_SESSION, process.env.REFRESH_SECRET_EXPIRATION, payload);
        
            const session: CreateSessionDto = {
                token: token,
                refreshToken: refreshToken,
                browser: request.headers['user-agent'],
                host: request.headers['host'],
                userId: user.id
            }

            const userSessions: SessionsEntity[] = await this.findUserSessionsService.execute(user.id);

            if (userSessions.length < 3) {
                await this.createSessionService.execute(session);
            } else {
                await this.updateSessionService.execute(session, userSessions[0].id);
            }

            await this.updateUserFirstAccessService.execute(user.id, false);
            
            return {
                message: 'Verificação feita com sucesso.',
                accessToken: token
            };
        } catch (error) {
            throw error instanceof HttpException
                ? error
                : new InternalServerErrorException('Falha ao validar codigo autenticador, erro: ' + error.message);
        }
    }

    private validateOtpCode(secret: string, otpCode: string): boolean {
        authenticator.options = {
            window: 1
        }

        return authenticator.verify({
            secret: secret,
            token: otpCode
        });
    }

    private async generateToken(secret: string, expiresIn: string, payload: PayloadDto): Promise<string> {
        return await this.jwtService.signAsync(payload, {
            secret: secret,
            expiresIn: expiresIn
        });
    }
}