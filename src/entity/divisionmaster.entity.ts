import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('divisionmaster')
export class DivisionMaster {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    division: string
}