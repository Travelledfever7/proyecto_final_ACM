import { Module } from '@nestjs/common';
import { MedicalDateService } from './medical_date.service';
import { MedicalDateController } from './medical_date.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalDate } from './entities/medical_date.entity';
import { VetModule } from 'src/vet/vet.module';
import { PetModule } from 'src/pet/pet.module';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalDate]), VetModule, PetModule],
  controllers: [MedicalDateController],
  providers: [MedicalDateService],
  exports: [MedicalDateService]
})
export class MedicalDateModule {}
