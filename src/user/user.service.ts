import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

  async create(createUserDto: CreateUserDto) {

    if (await this.findOneByEmail(createUserDto.email)) {
      throw new Error('User with this email already exists');
    }
    const user = await this.userRepository.create({...createUserDto});
    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOneByEmail(email: string) {

    try {
      const user = await this.userRepository.findOneBy({
        email,
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error: any) {
      throw new Error(error);
    }

  }

  async findOneById(id: string) {

    if (!isUUID(id)) {
      throw new Error('This is not a valid UUID');
    }

    try {
      const user = await this.userRepository.findOneBy({
        id,
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error: any) {
      throw new Error(error);
    }

  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    if (!isUUID(id)) {
      throw new Error('This is not a valid UUID');
    }
    try {
      const userUpdated = await this.userRepository.preload({
        id,
        ...updateUserDto,
      });

      if (!userUpdated) {
        throw new NotFoundException('User not found');
      }

      return await this.userRepository.save(userUpdated);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async remove(id: string) {

    if (!isUUID(id)) {
      throw new Error('This is not a valid UUID');
    }
    try {
      const user = await this.findOneById(id);
      await this.userRepository.remove(user);

      return { message: 'User removed successfully' };
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
