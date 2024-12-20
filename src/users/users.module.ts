import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersEntity } from "./models/entities/users.entity";
import { UsersTypeOrmRepository } from "./repositories/users.repository";
import { FindUserByLoginService } from "./services/find-user-by-login/find-user-by-login.service";
import { RegisterUserController } from "./services/register-user/register-user.controller";
import { RegisterUserService } from "./services/register-user/register-user.service";
import { UpdateUserFirstAccessService } from "./services/update-user-first-access/update-user-first-access.service";
import { UpdateUserSecretService } from "./services/update-user-secret/update-user-secret.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UsersEntity])
    ],
    providers: [
        UsersTypeOrmRepository,
        {
            provide: 'UsersTypeOrmRepository',
            useClass: UsersTypeOrmRepository
        },
        RegisterUserService,
        FindUserByLoginService,
        UpdateUserSecretService,
        UpdateUserFirstAccessService
    ],
    controllers: [
        RegisterUserController
    ],
    exports: [
        FindUserByLoginService,
        UpdateUserSecretService,
        UpdateUserFirstAccessService
    ]
})
export class UsersModule{}