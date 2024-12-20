
import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UpdateSessionDto } from 'src/sessions/models/dtos/update-session.dto';
import { SessionsTypeOrmRepository } from 'src/sessions/repositories/sessions.repository';

@Injectable()
export class UpdateSessionService {
    constructor(
        private readonly sessionsTypeOrmRepository: SessionsTypeOrmRepository
    ) {}

    async execute(newSession: UpdateSessionDto, sessionId: number) {
        try {
            return await this.sessionsTypeOrmRepository.updateSession(newSession, sessionId);
        } catch (error) {
            throw error instanceof HttpException
            ? error
            : new InternalServerErrorException(error.message);
        }
    }
}