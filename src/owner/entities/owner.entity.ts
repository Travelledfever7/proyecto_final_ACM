import { Pet } from "src/pet/entities/pet.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Owner {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'address' })
    address!: string;

    @OneToOne(() => User, (user) => user.owner)
    @JoinColumn({ name: 'user_id' })
    user_id!: string;

    @OneToMany(() => Pet, (pet) => pet.owner)
    pets!: Pet[];
}
