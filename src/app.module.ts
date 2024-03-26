import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { PositionModule } from './position/position.module';
import { TokenModule } from './token/token.module';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: () => dataSourceOptions }),
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    PositionModule,
    TokenModule,
    UserModule,
  ],
})
export class AppModule {}
