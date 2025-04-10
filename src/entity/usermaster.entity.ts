import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('usermaster')
export class UserMasterEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    designation: string;

    @Column({ nullable: true })
    isactive: boolean;

    @Column()
    password: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    phoneno: string;
}