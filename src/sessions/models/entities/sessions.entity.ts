import { UsersEntity } from "src/users/models/entities/users.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'sessions', schema: process.env.DB_PG_SCHEMA})
export class SessionsEntity {
    @PrimaryGeneratedColumn('increment', {name: 'id', type: 'int'})
    id: number;

    @Column({name: 'token', type: 'character varying', nullable: false, unique: true})
    token: string;

    @Column({name: 'refresh_token', type: 'character varying', nullable: false, unique: true})
    refreshToken: string;

    @Column({name: 'browser', type: 'character varying', nullable: false, unique: true})
    browser: string;

    @Column({name: 'host', type: 'character varying', nullable: false, unique: true})
    host: string;
    
    @CreateDateColumn({name: 'created_at', type: 'timestamptz', nullable: false, unique: false})
    createdAt: Date;

    @ManyToOne(() => UsersEntity, (user) => user.sessions)
    @JoinColumn({name: 'id_users', referencedColumnName: 'id'})
    user: UsersEntity;
}