import { HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from "src/users/models/dtos/register-user.dto";
import { UsersTypeOrmRepository } from "src/users/repositories/users.repository";
import { FindUserByLoginService } from "../find-user-by-login/find-user-by-login.service";

@Injectable()
export class RegisterUserService {
    constructor(
        private readonly usersTypeOrmRepository: UsersTypeOrmRepository,
        private readonly findUserByLoginService: FindUserByLoginService
    ) { }

    async execute(newUser: RegisterUserDto): Promise<{ message: string; }> {
        try {
            await this.findUserByLoginService.execute(newUser.login);

            newUser.password = await this.hashPassword(newUser.password);

            await this.usersTypeOrmRepository.create(newUser);

            return {
                message: 'Usuário cadastrado com sucesso!'
            }
        } catch (error) {
            throw error instanceof HttpException
                ? error
                : new InternalServerErrorException('Aconteceu um problema ao registrar o usuario, erro: ' + error.message);
        }
    }

    private async hashPassword(password: string): Promise<string> {
        const salts = Number(process.env.SALT_SESSION);
        return await bcrypt.hash(password, salts);
    }
}