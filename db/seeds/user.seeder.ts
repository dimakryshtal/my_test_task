import { User } from '../../src/user/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class UserSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    await dataSource.query('TRUNCATE TABLE "user" RESTART IDENTITY;');

    // const repository = dataSource.getRepository('user');
    const userFactory = factoryManager.get(User);
    await userFactory.save();

    // save 5 factory generated entities, to the database
    await userFactory.saveMany(45);
  }
}
