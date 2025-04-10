import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { UserMasterEntity } from "src/entity/usermaster.entity";
import { Repository } from "typeorm";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from 'bcrypt';
import { MslSummaryEntity } from "src/entity/mslsummary.entity";

@Injectable({})
export class AuthService {
    constructor (
        private JwtService: JwtService,
        @InjectRepository(UserMasterEntity)
        private readonly userMasterRepository: Repository<UserMasterEntity>,
        @InjectRepository(MslSummaryEntity)
        private readonly mslSummaryRepository: Repository<MslSummaryEntity>,
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

    async GetDoctorListOfUser(empCode: string) {
        try {
            // Step 1: Get user
            const user = await this.userMasterRepository.findOne({
                where: { username: empCode }
            });
    
            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
    
            const { designation, username } = user;
    
            // Step 2: Set filter field based on designation
            let filterField: string | null = null;
            switch (designation?.toUpperCase()) {
                case 'BE': filterField = 'empcode'; break;
                case 'ABM': filterField = 'abmempcode'; break;
                case 'RBM': filterField = 'rbmempcode'; break;
                case 'SM': filterField = 'smempcode'; break;
                case 'GDM': filterField = 'gdmempcode'; break;
                case 'HO': filterField = null; break;
                default:
                    throw new HttpException('Invalid designation', HttpStatus.BAD_REQUEST);
            }
    
            // Step 3: Query the doctor list
            const query = this.mslSummaryRepository.createQueryBuilder('msl');
            if (filterField) {
                query.where(`msl.${filterField} = :username`, { username });
            }
    
            const doctorList = await query.getMany();
    
            if (doctorList.length === 0) {
                throw new HttpException('No doctors found', HttpStatus.NOT_FOUND);
            }
    
            // Step 4: Return just the doctor list
            return {
                status: 'success',
                total: doctorList.length,
                doctors: doctorList.map(doc => ({
                    id: doc.id,
                    drCode: doc.drcode,
                    drName: doc.drname,
                    category: doc.category,
                    speciality: doc.speciality,
                    empCode: doc.empcode,
                    empName: doc.empname,
                    region: doc.regionname,
                    zone: doc.zone,
                }))
            };
    
        } catch (err) {
            console.error('Error in GetDoctorListOfUser:', err);
            throw new HttpException(
                err instanceof HttpException ? err.getResponse() : "Internal Server Error",
                err instanceof HttpException ? err.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    
    async GetDoctorDetails(drcode: string) {
        try {
            const doctor = await this.mslSummaryRepository.findOne({
                where: {
                    drcode: drcode
                },
                relations: ['divisionmaster']
            });

            if (!doctor) {
                throw new HttpException('Doctor not found', HttpStatus.NOT_FOUND);
            }

            return {
                status: "success",
                doctor,
            }
        } catch (err) {
            throw new HttpException(
                err instanceof HttpException ? err.getResponse() : "Internal Server Error",
                err instanceof HttpException ? err.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}