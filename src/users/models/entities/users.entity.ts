import { SessionsEntity } from "src/sessions/models/entities/sessions.entity";
import { RolesEnum } from "src/shared/enums/roles.enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users', schema: process.env.DB_PG_SCHEMA})
export class UsersEntity {
    @PrimaryGeneratedColumn('increment', {name: 'id', type: 'int'})
    id: number;

    @Column({name: 'username', type: 'character varying', nullable: false, unique: false})
    username: string;

    @Column({name: 'login', type: 'character varying', nullable: false, unique: true})
    login: string;

    @Column({name: 'password', type: 'character varying', nullable: false, unique: false})
    password: string;

    @Column({name: 'active', type: 'boolean', nullable: false, unique: false, default: true})
    active: boolean;

    @Column({name: 'role', type: 'enum', enum: RolesEnum, nullable: false, unique: false, default: RolesEnum.COMMON})
    role: RolesEnum;

    @Column({name: 'first_access', type: 'boolean', nullable: false, unique: false, default: true})
    firstAccess: boolean;

    @Column({name: 'tfa_secret', type: 'character varying', nullable: true, unique: true})
    tfaSecret: string;

    @OneToMany(() => SessionsEntity, (session) => session.user)
    sessions: SessionsEntity[];
}