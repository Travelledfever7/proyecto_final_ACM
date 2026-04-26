import { Injectable } from '@nestjs/common';
import { CreateMedicalDateDto } from './dto/create-medical_date.dto';
import { UpdateMedicalDateDto } from './dto/update-medical_date.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalDate } from './entities/medical_date.entity';
import { Repository } from 'typeorm';
import { PetService } from 'src/pet/pet.service';
import { VetService } from 'src/vet/vet.service';

@Injectable()
export class MedicalDateService {

  constructor(@InjectRepository(MedicalDate) private readonly medicalDateRepository: Repository<MedicalDate>, 
  private readonly vetService: VetService, private readonly petService: PetService) { }


  async create(createMedicalDateDto: CreateMedicalDateDto) {
    const pet = await this.petService.findOneById(createMedicalDateDto.pet_id);
    const vet = await this.vetService.findOneById(createMedicalDateDto.vet_id);
    const medicalDate = this.medicalDateRepository.create({ ...createMedicalDateDto});
    return await this.medicalDateRepository.save(medicalDate);
  }

  async findAll() {
    return await this.medicalDateRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} medicalDate`;
  }

  update(id: number, updateMedicalDateDto: UpdateMedicalDateDto) {
    return `This action updates a #${id} medicalDate`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicalDate`;
  }
}
