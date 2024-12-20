import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SessionsEntity } from "./models/entities/sessions.entity";
import { SessionsTypeOrmRepository } from "./repositories/sessions.repository";
import { CreateSessionService } from "./services/create-session/create-session.service";
import { FindUserSessionsService } from "./services/find-user-sessions/find-user-sessions.service";
import { UpdateSessionService } from "./services/update-session/update-session.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([SessionsEntity]),
    ],
    providers: [
        SessionsTypeOrmRepository,
        {
            useClass: SessionsTypeOrmRepository,
            provide: 'SessionsTypeOrmRepository'
        },
        CreateSessionService,
        FindUserSessionsService,
        UpdateSessionService
    ],
    controllers: [],
    exports: [
        CreateSessionService,
        FindUserSessionsService,
        UpdateSessionService
    ]
})
export class SessionsModule{}