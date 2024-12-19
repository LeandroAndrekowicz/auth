import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RolesEnum } from "src/shared/enums/roles.enum";
import { Repository } from "typeorm";
import { RegisterUserDto } from "../models/dtos/register-user.dto";
import { UsersEntity } from "../models/entities/users.entity";

@Injectable()
export class UsersTypeOrmRepository {
    constructor (
        @InjectRepository(UsersEntity)
        private readonly usersTypeOrmRepository: Repository<UsersEntity>
    ) {}

    async create(newUser: RegisterUserDto) {
        const user = this.usersTypeOrmRepository.create({
            ...newUser,
            role: RolesEnum.COMMON,
        });
        
        return await this.usersTypeOrmRepository.save(user);
    }

    async findByLogin(userLogin: string) {
        return await this.usersTypeOrmRepository.findOne({
            where: {
                login: userLogin
            }
        });
    }
}