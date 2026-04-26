import { MedicalDate } from "src/medical_date/entities/medical_date.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Vet {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'especialidad_medica' })
    especialidad_medica!: string;

    @OneToOne(() => User, (user) => user.vet)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @OneToMany(() => MedicalDate, (medicalDate) => medicalDate.vet)
    medicalDates!: MedicalDate[];
}
