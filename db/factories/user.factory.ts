import { User } from '../../src/user/entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(User, (faker) => {
  const user = new User();
  user.name = faker.person.fullName();
  user.email = faker.internet.email({ firstName: user.name });
  user.position = { id: faker.number.int({ min: 1, max: 4 }) };
  user.phone = faker.phone.number('+380#########');
  user.photo = 'https://s3.eu-north-1.amazonaws.com/dimakrshltestbucket/jpegsystems-home.jpg';

  return user;
});
