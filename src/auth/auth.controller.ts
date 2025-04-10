import { Body, Controller, Get, Param, Post } from "@nestjs/common";
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

    // ? DoctorListunderUser, drdetails
    @Get('doctorlist')
    async doctorList(
        @Param() empCode: string
    ) {
        return this.authService.GetDoctorListOfUser(empCode);
    }

    @Get('drdetails')
    async GetDoctorDetails(
        @Param() drcode: string
    ) {
        return this.authService.GetDoctorDetails(drcode);
    }
}