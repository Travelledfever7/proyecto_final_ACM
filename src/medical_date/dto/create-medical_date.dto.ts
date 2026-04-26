import { IsDateString, IsString } from "class-validator";

export class CreateMedicalDateDto {

    @IsDateString()
    fecha!: string;
    
    @IsString()
    motivo!: string;

    @IsString()
    pet_id!: string;

    @IsString()
    vet_id!: string;
}
