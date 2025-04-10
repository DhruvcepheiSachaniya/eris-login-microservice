import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DivisionMaster } from "./divisionmaster.entity";

@Entity('userdivisionmapping')
export class UserDivisionMappingEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userid: number;

    @Column()
    divisionid: number;

    @ManyToOne(() => DivisionMaster, division => division.userMappings)
    division: DivisionMaster;
}