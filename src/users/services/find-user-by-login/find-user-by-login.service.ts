import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { UsersEntity } from "src/users/models/entities/users.entity";
import { UsersTypeOrmRepository } from "src/users/repositories/users.repository";

@Injectable()
export class FindUserByLoginService {
    constructor (
        private readonly usersTypeOrmRepository: UsersTypeOrmRepository
    ) {}

    async execute(userLogin: string, isLogin?: boolean): Promise<UsersEntity> {
        try {
            const user = await this.usersTypeOrmRepository.findByLogin(userLogin);

            if(user && !isLogin) {
                throw new BadRequestException('Esse login já está sendo utilizado, por favor escolha outro!');
            }

            return user;
        } catch (error) {
            throw error instanceof HttpException
            ? error
            : new InternalServerErrorException('Aconteceu um erro ao buscar usuario, erro: ' + error.message);
        }
    }
}