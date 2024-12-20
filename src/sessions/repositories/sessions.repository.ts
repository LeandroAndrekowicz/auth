import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { CreateSessionDto } from "../models/dtos/create-session.dto";
import { UpdateSessionDto } from "../models/dtos/update-session.dto";
import { SessionsEntity } from "../models/entities/sessions.entity";

@Injectable()
export class SessionsTypeOrmRepository {
    constructor (
        @InjectRepository(SessionsEntity)
        private readonly sessionsTypeOrmRepository: Repository<SessionsEntity>
    ) {}

    async create(newSession: CreateSessionDto) {
        const session = this.sessionsTypeOrmRepository.create({
            ...newSession,
            user: {
                id: newSession.userId
            }
        });

        return await this.sessionsTypeOrmRepository.save(session);
    }

    async findUserSessions(userId: number) {
        return await this.sessionsTypeOrmRepository.find({
            where: {
                user: {
                    id: userId
                }
            },
            relations: ['user'],
            order: {
                createdAt: 'ASC'
            }
        })
    }

    async updateSession(newSession: UpdateSessionDto, sessionId: number): Promise<UpdateResult> {        
        return await this.sessionsTypeOrmRepository.update({
            id: sessionId
        }, {
            browser: newSession.browser,
            host: newSession.host,
            refreshToken: newSession.refreshToken,
            token: newSession.token,
            user: {
                id: newSession.userId
            },
            createdAt: new Date()
        });
    }
}