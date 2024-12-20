
import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { SessionsTypeOrmRepository } from 'src/sessions/repositories/sessions.repository';

@Injectable()
export class FindUserSessionsService {
    constructor(
        private readonly sessionsTypeOrmRepository: SessionsTypeOrmRepository
    ) {}

    async execute(userId: number) {
        try {
            return await this.sessionsTypeOrmRepository.findUserSessions(userId);
        } catch (error) {
            throw error instanceof HttpException
            ? error
            : new InternalServerErrorException(error.message);
        }
    }
}