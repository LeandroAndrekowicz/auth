import { HttpException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { authenticator } from 'otplib';
import * as qrcode from 'qrcode';
import { LoginDto } from 'src/auth/models/dtos/login.dto';
import { LoginResponseType } from 'src/auth/models/types/login-response.type';
import { UsersEntity } from 'src/users/models/entities/users.entity';
import { FindUserByLoginService } from 'src/users/services/find-user-by-login/find-user-by-login.service';
import { UpdateUserSecretService } from 'src/users/services/update-user-secret/update-user-secret.service';

@Injectable()
export class LoginService {
    constructor(
        private readonly findUserByLoginService: FindUserByLoginService,
        private readonly updateUserSecretService: UpdateUserSecretService
    ) { }

    async execute(login: LoginDto, isVerify?: boolean): Promise<UsersEntity | LoginResponseType> {
        try {
            const user: UsersEntity = await this.findUserByLoginService.execute(login.login, true);

            if (!user) {
                throw new UnauthorizedException('Usuario ou senha inválidos.');
            }

            const compare: boolean = await bcrypt.compare(login.password, user.password);

            if (!compare) {
                throw new UnauthorizedException('Usuario ou senha inválidos.');
            }

            if (isVerify) {
                return user;
            }

            if (user && user.firstAccess) {
                const qrCode: string = await this.generateQrcode(user.username, user.id);

                return {
                    message: 'Login realizado com sucesso!',
                    qrcode: qrCode
                }
            }

            return {
                message: 'Login realizado com sucesso.'
            }
        } catch (error) {
            throw error instanceof HttpException
                ? error
                : new InternalServerErrorException('Falha ao realizar login, erro: ' + error.message);
        }
    }

    private async generateQrcode(username: string, userId: number): Promise<string> {
        const secret: string = authenticator.generateSecret();
        const qrcode = await this.generateTwoFAQRCode(username, secret);

        await this.updateUserSecretService.execute(userId, secret);

        return qrcode;
    }

    private async generateTwoFAQRCode(username: string, secret: string): Promise<string> {
        try {
            const otpauthURL = authenticator.keyuri(username, "AUTH", secret);

            let imagePath = await qrcode.toDataURL(otpauthURL);

            return imagePath;
        } catch (error) {
            throw error instanceof HttpException
                ? error
                : new InternalServerErrorException();
        }
    }
}