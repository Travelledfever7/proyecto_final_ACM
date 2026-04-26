import { Module } from '@nestjs/common';
import { MedicalDateService } from './medical_date.service';
import { MedicalDateController } from './medical_date.controller';

@Module({
  controllers: [MedicalDateController],
  providers: [MedicalDateService],
})
export class MedicalDateModule {}
