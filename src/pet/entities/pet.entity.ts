import { MedicalDate } from "src/medical_date/entities/medical_date.entity";
import { Owner } from "src/owner/entities/owner.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Pet {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'nombre' })
    name!: string;

    @Column({ name: 'especie' })
    especie!: string;

    @Column({ name: 'raza' })
    raza!: string;

    @ManyToOne(() => Owner, (owner) => owner.pets)
    @JoinColumn({ name: 'owner_id' })
    owner!: Owner;

    @OneToMany(() => MedicalDate, (medicalDate) => medicalDate.pet)
    medicalDates!: MedicalDate[];
}
