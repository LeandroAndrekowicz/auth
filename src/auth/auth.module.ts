import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { SessionsModule } from "src/sessions/sessions.module";
import { UsersModule } from "src/users/users.module";
import { LoginController } from "./services/login/login.controller";
import { LoginService } from "./services/login/login.service";
import { Verify2FaController } from "./services/verify-2fa/verify-2fa.controller";
import { Verify2FaService } from "./services/verify-2fa/verify-2fa.service";

@Module({
    imports: [
        UsersModule,
        JwtModule,
        SessionsModule
    ],
    providers: [
        LoginService,
        Verify2FaService
    ],
    controllers: [
        LoginController,
        Verify2FaController
    ],
    exports: []
})
export class AuthModule{}