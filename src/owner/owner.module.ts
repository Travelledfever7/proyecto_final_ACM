import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Owner]), UserModule],
  controllers: [OwnerController],
  providers: [OwnerService],
  exports: [OwnerService]
})
export class OwnerModule {}
