import { User } from '../entities/user.entity';

export class GetUserDto {
  success: boolean;
  message: string;
  user: User;
}
