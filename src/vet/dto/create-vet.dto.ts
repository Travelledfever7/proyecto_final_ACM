import { IsString } from "class-validator";

export class CreateVetDto {

    @IsString()
    especialidad_medica!: string;
    
    @IsString()
    user_id!: string;
}
