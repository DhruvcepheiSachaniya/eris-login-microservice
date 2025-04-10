import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('userdivisionmapping')
export class UserDivisionMappingEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userid: number;

    @Column()
    divisionid: number;
}