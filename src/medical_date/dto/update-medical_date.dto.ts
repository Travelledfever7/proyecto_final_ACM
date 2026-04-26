import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalDateDto } from './create-medical_date.dto';

export class UpdateMedicalDateDto extends PartialType(CreateMedicalDateDto) {}
