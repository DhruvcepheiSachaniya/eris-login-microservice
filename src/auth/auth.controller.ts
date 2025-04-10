import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@Controller('/api')
export class AuthController {
    constructor (
        private readonly authService: AuthService
    ) {}

    @Post('login')
    async Login(
        @Body() LoginDto: LoginDto
    ) {
        return this.authService.Login(LoginDto);
    }
}