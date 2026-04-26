import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { VetModule } from './vet/vet.module';
import { OwnerModule } from './owner/owner.module';
import { PetModule } from './pet/pet.module';
import { AuthModule } from './auth/auth.module';
import { MedicalDateModule } from './medical_date/medical_date.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UserModule, VetModule, OwnerModule, PetModule, MedicalDateModule, AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 3305,
      username: 'postgres',
      password: 'pepeperoni123',
      database: 'petClinic',
      autoLoadEntities: true,
      synchronize: true,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
