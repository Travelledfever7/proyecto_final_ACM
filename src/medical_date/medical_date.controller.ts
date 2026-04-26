import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicalDateService } from './medical_date.service';
import { CreateMedicalDateDto } from './dto/create-medical_date.dto';
import { UpdateMedicalDateDto } from './dto/update-medical_date.dto';

@Controller('medical-date')
export class MedicalDateController {
  constructor(private readonly medicalDateService: MedicalDateService) {}

  @Post()
  create(@Body() createMedicalDateDto: CreateMedicalDateDto) {
    return this.medicalDateService.create(createMedicalDateDto);
  }

  @Get()
  findAll() {
    return this.medicalDateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalDateService.findOneById(id);
  }

  @Get(':id')
  findOneByVet(@Param('id') id: string) {
    return this.medicalDateService.findOneByVet(id);
  }

  @Get(':id')
  findOneByPet(@Param('id') id: string){
    return this.medicalDateService.findOneByPet(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicalDateDto: UpdateMedicalDateDto) {
    return this.medicalDateService.update(id, updateMedicalDateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalDateService.remove(id);
  }
}
