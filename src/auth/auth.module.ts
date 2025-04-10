import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PassportModule, PassportStrategy } from "@nestjs/passport";
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { JwtStrategy } from "./strategy/jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserMasterEntity } from "src/entity/usermaster.entity";
import { MslSummaryEntity } from "src/entity/mslsummary.entity";
 
dotenv.config();

@Module({
    imports: [
        TypeOrmModule.forFeature([ UserMasterEntity, MslSummaryEntity ]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: '7d',
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [JwtModule, PassportModule],
})

export class AuthModule { }