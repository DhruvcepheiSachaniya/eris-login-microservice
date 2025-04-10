import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { UserMasterEntity } from "src/entity/usermaster.entity";
import { Repository } from "typeorm";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from 'bcrypt';

@Injectable({})
export class AuthService {
    constructor (
        private JwtService: JwtService,
        @InjectRepository(UserMasterEntity)
        private readonly userMasterRepository: Repository<UserMasterEntity>,
    ) {}

    async Login(loginDto: LoginDto) {
        const { username, password } = loginDto;

        const user = await this.userMasterRepository.findOne({
            where: {
                username: username,
            }
        });

        if (!user) {
            throw new NotFoundException('Employee code does not exist');
        }

        if (!user.isactive) {
            throw new BadRequestException('Employee is not active');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new BadRequestException('Invalid password');
        }

        // Generate Jwt Token
        const payload = { username: user.username, user_type: user.designation};
        const token = this.JwtService.sign(payload);

        const result = {
            id: user.id,
            username: user.username,
            mobile_number: user.phoneno,
            user_type: user.designation,
            email: user.email,
            isactive: user.isactive,
        }

        return {
            message: 'Login Success',
            token,
            result
        };
    }
}