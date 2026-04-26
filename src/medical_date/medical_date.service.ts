import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicalDateDto } from './dto/create-medical_date.dto';
import { UpdateMedicalDateDto } from './dto/update-medical_date.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalDate } from './entities/medical_date.entity';
import { Repository } from 'typeorm';
import { PetService } from 'src/pet/pet.service';
import { VetService } from 'src/vet/vet.service';
import { isUUID } from 'class-validator';

@Injectable()
export class MedicalDateService {

  constructor(@InjectRepository(MedicalDate) private readonly medicalDateRepository: Repository<MedicalDate>,
    private readonly vetService: VetService, private readonly petService: PetService) { }


  async create(createMedicalDateDto: CreateMedicalDateDto) {
    try {
      const pet = await this.petService.findOneById(createMedicalDateDto.pet_id);
      const vet = await this.vetService.findOneById(createMedicalDateDto.vet_id);

      if (!pet || !vet) {
        throw new Error('Pet or Vet not found');
      }

      const medicalDate = this.medicalDateRepository.create({ 
        fecha: createMedicalDateDto.fecha, 
        motivo: createMedicalDateDto.motivo,
        pet, 
        vet 
      });
      return await this.medicalDateRepository.save(medicalDate);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async findAll() {
    return await this.medicalDateRepository.find();
  }

  async findOneById(id: string) {
    if(!isUUID(id)){
      throw new Error('This is nota valid UUID')
    }

    try{
      const medicalDate = await this.medicalDateRepository.findOne({ where: { id } });
      if(!medicalDate){
        throw new NotFoundException
      }
      return medicalDate;
    }catch(error: any){
      throw new Error(error)
    }
  }

  async findOneByPet(petId: string){
    if(!isUUID(petId)){
      throw new Error('This is nota valid UUID')
    }
    try{
      const medicalDateByPet = await this.medicalDateRepository.findOne({ where: { pet: { id: petId } } });
      if(!medicalDateByPet){
        throw new NotFoundException('Medical date not found for this pet')
      }
      return medicalDateByPet;
    }catch(error: any){
      throw new Error(error)
    }
  }

  async findOneByVet(vetId: string){
    if(!isUUID(vetId)){
      throw new Error('This is nota valid UUID')
    }
    try{
      const medicalDateByVet = await this.medicalDateRepository.findOne({ where: { vet: { id: vetId } } });
      if(!medicalDateByVet){
        throw new NotFoundException('Medical date not found for this vet')
      }
      return medicalDateByVet;
    }catch(error: any){
      throw new Error(error)
    }
  }

  async update(id: string, updateMedicalDateDto: UpdateMedicalDateDto) {
    if(!isUUID(id)){
      throw new Error('This is not a valid UUID')
    }
    try{
      const medicalDateUpdated = await this.medicalDateRepository.preload({
        id,
        ...updateMedicalDateDto,
      });
      if(!medicalDateUpdated){
        throw new NotFoundException('Medical date not found');
      }
      return await this.medicalDateRepository.save(medicalDateUpdated);
    }catch(error: any){
      throw new Error(error);
    }
  }

  async remove(id: string) {
    if (!isUUID(id)) {
      throw new Error('This is not a valid UUID');
    }
    try{
      const medicalDate = await this.findOneById(id)
      await this.medicalDateRepository.remove(medicalDate);
    }catch(error: any){
      throw new Error(error)
    }
  }
}
