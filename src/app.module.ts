import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresTypeOrmConfigService } from './config/postgres.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresTypeOrmConfigService,
      inject: [PostgresTypeOrmConfigService]
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
