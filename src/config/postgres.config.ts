import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

@Injectable()
export class PostgresTypeOrmConfigService {
    constructor (
        private readonly configService: ConfigService
    ) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            name: this.configService.get<string>('DB_PG_DATABASE'),
            host: this.configService.get<string>('DB_PG_HOST'),
            port: this.configService.get<number>('DB_PG_PORT'),
            username: this.configService.get<string>('DB_PG_USERNAME'),
            password: this.configService.get<string>('DB_PG_PASSWORD'),
            database: this.configService.get<string>('DB_PG_DATABASE'),
            schema: this.configService.get<string>('DB_PG_SCHEMA'),
            autoLoadEntities: true,
            entities: [__dirname + './../**/*.entity.{js,ts}'],
            synchronize: false
        }
    }
}