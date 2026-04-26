import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { UserRole } from 'src/user/enums/user.enum';
import { isUUID } from 'class-validator';

@Injectable()
export class OwnerService {

  constructor(@InjectRepository(Owner) private readonly ownerRepository: Repository<Owner>,
    private readonly userService: UserService) { }

  async create(createOwnerDto: CreateOwnerDto) {
    const user = await this.userService.findOneById(createOwnerDto.user_id);

    if (user.role !== UserRole.OWNER) {
      throw new Error('Only users with role OWNER can be owners');
    }
    if (user.owner) {
      throw new Error('This user is already an owner');
    }

    const owner = await this.ownerRepository.create({
      address: createOwnerDto.address,
      ...user
    });
    return await this.ownerRepository.save(owner);

  }

  async findAll() {
    return await this.ownerRepository.find();
  }

  async findOneById(id: string) {

    if (!isUUID(id)) {
      throw new Error('This is not a valid UUID');
    }
    try {
      const owner = await this.ownerRepository.findOne({ where: { id } });
      if (!owner) {
        throw new NotFoundException('Owner not found');
      }
      return owner;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async update(id: string, updateOwnerDto: UpdateOwnerDto) {
    if (!isUUID(id)) {
      throw new Error('This is not a valid UUID');
    }
    try{
      const ownerUpdated = await this.ownerRepository.preload({
        id,
        ...updateOwnerDto,
      });
      if (!ownerUpdated) {
        throw new NotFoundException('Owner not found');
      }
      return await this.ownerRepository.save(ownerUpdated);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async remove(id: string) {
    if (!isUUID(id)) {
      throw new Error('This is not a valid UUID');
    }
    try {
      const owner = await this.findOneById(id);
      await this.ownerRepository.remove(owner);

      return { message: 'Owner removed successfully' };
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
