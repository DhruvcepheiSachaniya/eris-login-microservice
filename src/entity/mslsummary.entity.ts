import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DivisionMaster } from "./divisionmaster.entity";

@Entity('mslsummary')
export class MslSummaryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    drcode: string;

    @Column({ nullable: true })
    drname: string;

    @Column({ nullable: true })
    category: string;

    @Column({ nullable: true })
    speciality: string;

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

    @ManyToOne(() => DivisionMaster, division => division.doctors)
    division: DivisionMaster;
}