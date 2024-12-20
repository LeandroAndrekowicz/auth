import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PostgresTypeOrmConfigService } from './config/postgres.config';
import { SessionsModule } from './sessions/sessions.module';
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
    UsersModule,
    AuthModule,
    SessionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
