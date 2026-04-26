import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { UserRole } from "../enums/user.enum";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    name!: string;
    @IsString()
    @IsNotEmpty()
    email!: string;
    @IsString()
    @IsNotEmpty()
    password!: string;
    @IsEnum(UserRole)
    @IsNotEmpty()
    role!: UserRole;
}
