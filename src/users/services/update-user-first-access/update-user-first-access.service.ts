
import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersTypeOrmRepository } from 'src/users/repositories/users.repository';

@Injectable()
export class UpdateUserFirstAccessService {
    constructor(
        private readonly usersTypeOrmRepository: UsersTypeOrmRepository
    ) {}

    async execute(userId: number, newStatus: boolean) {
        try {
            return await this.usersTypeOrmRepository.updateUserFirstAccess(userId, newStatus);
        } catch (error) {
            throw error instanceof HttpException
            ? error
            : new InternalServerErrorException(error.message);
        }
    }
}