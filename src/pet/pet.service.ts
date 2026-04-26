import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { Repository } from 'typeorm';
import { OwnerService } from 'src/owner/owner.service';
import { isUUID } from 'class-validator';

@Injectable()
export class PetService {

  constructor(@InjectRepository(Pet) private readonly petRepository: Repository<Pet>, private readonly ownerService: OwnerService) { }

  async create(createPetDto: CreatePetDto) {
    const owner = await this.ownerService.findOneById(createPetDto.owner_id);

    if (!owner) {
      throw new Error('Owner not found');
    }

    const pet = await this.petRepository.create({ ...createPetDto, owner });
    return await this.petRepository.save(pet);

  }

  async findAll() {
    return await this.petRepository.find({ relations: ['owner', 'owner.user_id', 'medicalDates'] });
  }

  async findOneById(id: string) {
    if (isUUID(id)) {
      throw new Error('This is not a valid UUID');
    }
    try {
      const pet = await this.petRepository.findOne({ where: { id }, relations: ['owner', 'owner.user_id', 'medicalDates'] });
      if (!pet) {
        throw new NotFoundException('Pet not found');
      }
      return pet;
    } catch (error) {
      throw new Error('Pet not found');
    }
  }

  async findByOwnerId(owner_id: string) {
    if (isUUID(owner_id)) {
      throw new Error('This is not a valid UUID');
    }
    try {
      await this.ownerService.findOneById(owner_id);
      const pets = await this.petRepository.find({ where: { owner: { id: owner_id } }, relations: ['owner', 'owner.user_id', 'medicalDates'] });
      if (!pets || pets.length === 0) {
        throw new NotFoundException('No pets found for this owner');
      }
      return pets;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async update(id: string, updatePetDto: UpdatePetDto) {
    if (isUUID(id)) {
      throw new Error('This is not a valid UUID');
    }
    try {
      const petUpdated = await this.petRepository.preload({ id, ...updatePetDto });
      if (!petUpdated) {
        throw new NotFoundException('Pet not found');
      }
      return await this.petRepository.save(petUpdated);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async remove(id: string) {
    if (isUUID(id)) {
      throw new Error('This is not a valid UUID');
    }
    try {
      const pet = await this.findOneById(id);
      await this.petRepository.remove(pet);

      return { message: 'Pet removed successfully' };
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
