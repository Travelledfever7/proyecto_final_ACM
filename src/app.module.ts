import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { VetModule } from './vet/vet.module';
import { OwnerModule } from './owner/owner.module';
import { PetModule } from './pet/pet.module';
import { AuthModule } from './auth/auth.module';
import { MedicalDateModule } from './medical_date/medical_date.module';

@Module({
  imports: [UserModule, VetModule, OwnerModule, PetModule, MedicalDateModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
