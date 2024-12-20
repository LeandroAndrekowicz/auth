import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RolesEnum } from "src/shared/enums/roles.enum";
import { Repository, UpdateResult } from "typeorm";
import { RegisterUserDto } from "../models/dtos/register-user.dto";
import { UsersEntity } from "../models/entities/users.entity";

@Injectable()
export class UsersTypeOrmRepository {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersTypeOrmRepository: Repository<UsersEntity>
    ) { }

    async create(newUser: RegisterUserDto): Promise<UsersEntity> {
        const user = this.usersTypeOrmRepository.create({
            ...newUser,
            role: RolesEnum.COMMON,
            firstAccess: true,
            active: true
        });

        return await this.usersTypeOrmRepository.save(user);
    }

    async findByLogin(userLogin: string): Promise<UsersEntity> {
        return await this.usersTypeOrmRepository.findOne({
            where: {
                login: userLogin
            }
        });
    }

    async updateUserSecret(userId: number, secret: string): Promise<UpdateResult> {
        return await this.usersTypeOrmRepository.update({
            id: userId
        }, {
            tfaSecret: secret
        });
    }

    async updateUserFirstAccess(userId: number, newStatus: boolean): Promise<UpdateResult> {
        return await this.usersTypeOrmRepository.update({
            id: userId
        }, {
            firstAccess: newStatus
        });
    }
}