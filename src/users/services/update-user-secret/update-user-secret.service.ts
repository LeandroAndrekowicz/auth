
import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersTypeOrmRepository } from 'src/users/repositories/users.repository';

@Injectable()
export class UpdateUserSecretService {
    constructor(
        private readonly usersTypeOrmRepository: UsersTypeOrmRepository,
    ) {}

    async execute(userId: number, secret: string) {
        try {
            await this.usersTypeOrmRepository.updateUserSecret(userId, secret);

            return true;
        } catch (error) {
            throw error instanceof HttpException
            ? error
            : new InternalServerErrorException(error.message);
        }
    }
}