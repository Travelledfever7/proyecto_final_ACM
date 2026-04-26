import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateOwnerDto {

    @IsString()
    @IsNotEmpty()
    address!: string;
    @IsUUID()
    @IsNotEmpty()
    user_id!: string;
}
