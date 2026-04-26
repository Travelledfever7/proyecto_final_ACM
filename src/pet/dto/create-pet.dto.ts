import { IsString } from "class-validator";


export class CreatePetDto {
    @IsString()
    name!: string;

    @IsString()
    species!: string;

    @IsString()
    raza!: string;

    @IsString()
    owner_id!: string;
}
