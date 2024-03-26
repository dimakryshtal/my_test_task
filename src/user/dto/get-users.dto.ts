import { User } from '../entities/user.entity';

export class GetUsersDto {
  success: boolean;
  page: number;
  offset: number;
  total_pages: number;
  total_users: number;
  count: number;
  links: {
    next_url?: string;
    prev_url?: string;
  };
  users: User[];
}
