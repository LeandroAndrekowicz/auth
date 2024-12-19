import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { UsersTypeOrmRepository } from "src/users/repositories/users.repository";

@Injectable()
export class FindUserByLoginService {
    constructor (
        private readonly usersTypeOrmRepository: UsersTypeOrmRepository
    ) {}

    async execute(userLogin: string): Promise<boolean> {
        try {
            const user = await this.usersTypeOrmRepository.findByLogin(userLogin);

            if(user) {
                throw new BadRequestException('Esse login já está sendo utilizado, por favor escolha outro!');
            }

            return true;
        } catch (error) {
            throw error instanceof HttpException
            ? error
            : new InternalServerErrorException('Aconteceu um erro ao buscar usuario, erro: ' + error.message);
        }
    }
}