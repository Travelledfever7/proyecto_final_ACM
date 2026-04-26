import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVetDto } from './dto/create-vet.dto';
import { UpdateVetDto } from './dto/update-vet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vet } from './entities/vet.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { UserRole } from 'src/user/enums/user.enum';
import { isUUID } from 'class-validator';
import { NotFoundError } from 'rxjs';

@Injectable()
export class VetService {

  constructor(@InjectRepository(Vet) private readonly vetRepository: Repository<Vet>, 
  private readonly userService: UserService) { }

  async create(createVetDto: CreateVetDto) {
    const user = await this.userService.findOneById(createVetDto.user_id);

    if (user.role !== UserRole.VET) {
      throw new Error('Only users with role veterinarian can be vets');
    }

    if (user.vet) {
      throw new Error('This user is already a vet');
    }

    const vet = this.vetRepository.create(createVetDto);
    return this.vetRepository.save(vet);
  }

  async findAll() {
    return await this.vetRepository.find({ relations: ['user', 'medicalDates'] }) ;
  }

  async findOneById(id: string) {
    if (!isUUID(id)) {
      throw new Error('This is not a valid UUID');
    } 
    try {
      const vet = await this.vetRepository.findOne({ where: { id } });
      if (!vet) {
        throw new NotFoundException('Vet not found');
      }
      return vet;
    }catch (error: any) {
      throw new Error(error);
    }
  }

  async update(id: string, updateVetDto: UpdateVetDto) {
    if (!isUUID(id)) {
      throw new Error('This is not a valid UUID');
    }
    try{
      const vetUpdated = await this.vetRepository.preload({
        id,
        ...updateVetDto,
      });
    }catch (error: any) {
      throw new Error(error);
    }
  }

  async remove(id: string) {
    if (!isUUID(id)) {
      throw new Error('This is not a valid UUID');
    }
    try{
      const vet = await this.findOneById(id);
      return this.vetRepository.remove(vet);
    }catch (error: any) {
      throw new Error(error);
    }
  }
}
