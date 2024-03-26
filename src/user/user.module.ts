import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { StorageModule } from 'src/storage/storage.module';
import { PositionModule } from 'src/position/position.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), StorageModule, PositionModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
