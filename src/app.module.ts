import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresTypeOrmConfigService } from './config/postgres.config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresTypeOrmConfigService,
      inject: [PostgresTypeOrmConfigService]
    }),
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
