import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DivisionMaster } from "./divisionmaster.entity";

@Entity('employeehighrachy')
export class EmployeeHighRachyEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    divisionid: number;

    @Column({ nullable: true })
    divisionname: string;

    @Column({ nullable: true })
    employeeid: number;

    @Column({ nullable: true })
    empcode: string;

    @Column({ nullable: true })
    empname: string;

    @Column({ nullable: true })
    designationid: number;

    @Column({ nullable: true })
    designationcode: string;

    @Column({ nullable: true })
    grade: string;

    @Column({ nullable: true })
    mobile: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    joindate: Date;

    @Column({ nullable: true })
    holddate: Date;

    @Column({ nullable: true })
    resigndate: Date;

    @Column({ nullable: true })
    confirmdate: Date;

    @Column({ nullable: true })
    geoid: number;

    @Column({ nullable: true })
    geoname: string;

    @Column({ nullable: true })
    intglcode: string;

    @Column({ nullable: true })
    lastupdateddate: Date;

    @Column({ nullable: true })
    regionname: string;

    @Column({ nullable: true })
    zone: string;

    @Column({ nullable: true })
    abm: string;

    @Column({ nullable: true })
    abmempcode: string;

    @Column({ nullable: true })
    abmempname: string;

    @Column({ nullable: true })
    rbm: number;

    @Column({ nullable: true })
    rbmempcode: string;

    @Column({ nullable: true })
    rbmempname: string;

    @Column({ nullable: true })
    sm: number;

    @Column({ nullable: true })
    smempcode: string;

    @Column({ nullable: true })
    smempname: string;

    @Column({ nullable: true })
    gdm: number;

    @Column({ nullable: true })
    gdmempcode: string;

    @Column({ nullable: true })
    gdmempname: string;

    @ManyToOne(() => DivisionMaster, division => division.employees)
    division: DivisionMaster;

}