import { IsDateString, IsString } from "class-validator";

export class CreateMedicalDateDto {

    @IsDateString()
    date!: string;
    
    @IsString()
    motivo!: string;

    @IsString()
    pet_id!: string;

    @IsString()
    vet_id!: string;
}
