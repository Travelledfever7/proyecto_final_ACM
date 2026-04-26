import { Owner } from 'src/owner/entities/owner.entity';
import { Vet } from 'src/vet/entities/vet.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

export type UserRole = 'Veterinarian' | 'Owner';

@Entity()
export class User {

   @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'nombre' })
    name!: string;

    @Column({ name: 'email' })
    email!: string;

    @Column({ name: 'password' })
    password!: string;

    @Column({ name: 'role', type: "enum", enum: ['Veterinarian', 'Owner'] })
    role!: UserRole;

    @OneToOne(() => Owner, (owner) => owner.user_id)
    owner!: Owner;

    @OneToOne(() => Vet, (vet) => vet.user)
    vet!: Vet;
}
