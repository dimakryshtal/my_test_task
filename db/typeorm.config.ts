import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions, runSeeders } from 'typeorm-extension';

config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [__dirname + '/../src/**/entities/*.entity.{js,ts}'],
  seeds: ['./db/seeds/**/*{.ts,.js}'],
  factories: ['./db/factories/**/*{.ts,.js}'],
  synchronize: true,
};
export default new DataSource(dataSourceOptions);
