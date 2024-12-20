
import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSessionDto } from 'src/sessions/models/dtos/create-session.dto';
import { SessionsTypeOrmRepository } from 'src/sessions/repositories/sessions.repository';

@Injectable()
export class CreateSessionService {
    constructor(
        private readonly sessionsTypeOrmRepository: SessionsTypeOrmRepository
    ) {}

    async execute(newSession: CreateSessionDto) {
        try {
            return await this.sessionsTypeOrmRepository.create(newSession);
        } catch (error) {
            throw error instanceof HttpException
            ? error
            : new InternalServerErrorException(error.message);
        }
    }
}