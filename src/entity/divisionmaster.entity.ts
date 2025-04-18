import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EmployeeHighRachyEntity } from "./employeehighrachy.entity";
import { MslSummaryEntity } from "./mslsummary.entity";
import { UserDivisionMappingEntity } from "./userdivisionmapping.entity";

@Entity('divisionmaster')
export class DivisionMaster {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    division: string

    @OneToMany(() => EmployeeHighRachyEntity, emp => emp.division)
    employees: EmployeeHighRachyEntity[];

    // @OneToMany(() => MslSummaryEntity, msl => msl.division)
    // doctors: MslSummaryEntity[];

    @OneToMany(() => UserDivisionMappingEntity, mapping => mapping.division)
    userMappings: UserDivisionMappingEntity[];
}