import { Pet } from "src/pet/entities/pet.entity";
import { Vet } from "src/vet/entities/vet.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class MedicalDate {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'fecha' })
    fecha!: Date;

    @Column({ name: 'motivo' })
    motivo!: string;

    @ManyToOne(() => Pet, (pet) => pet.medicalDates)
    @JoinColumn({ name: 'pet_id' })
    pet!: Pet;

    @ManyToOne(() => Vet, (vet) => vet.medicalDates)
    @JoinColumn({ name: 'vet_id' })
    vet!: Vet;  
}
