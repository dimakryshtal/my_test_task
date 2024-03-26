import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { StorageService } from '../storage/storage.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PositionService } from '../position/position.service';
import { ElementsQueryDto } from './dto/elements-query.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly positionService: PositionService,
    private readonly storageService: StorageService,
  ) {}

  async create(user: CreateUserDto, file: Express.Multer.File) {
    const { position_id, ...userCredentials } = user;
    const position = await this.positionService.findOne(position_id);
    const photoLocation = await this.storageService.s3_upload(file);
    if (!position) throw new NotFoundException('Position not found');

    try {
      const newUser = await this.userRepository.insert({
        ...userCredentials,
        position,
        photo: photoLocation,
      });
      return {
        success: true,
        message: 'User created successfully',
        user_id: newUser.identifiers[0].id,
      };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException({
          success: false,
          message: 'User with this phone or email already exist',
        });
      }
    }
  }

  async getAll(query: ElementsQueryDto): Promise<GetUsersDto> {
    let { page, count } = query;
    const { offset } = query;

    page = page ?? 1;
    count = count ?? 5;

    const users = await this.userRepository
      .createQueryBuilder('user')
      .skip(offset ?? page * count)
      .take(count)
      .getManyAndCount();

    const total_pages = Math.floor(users[1] / count);

    if (page > total_pages)
      throw new NotFoundException({ success: false, message: 'Page not found' });

    return {
      success: true,
      page: offset ? null : page ?? 1,
      offset,
      total_pages: offset ? null : total_pages,
      total_users: users[1],
      count,
      links: offset
        ? { next_url: null, prev_url: null }
        : {
            next_url:
              page === total_pages
                ? null
                : `http://localhost:3000/user?page=${page + 1}&count=${count}`,
            prev_url:
              page === 1 ? null : `http://localhost:3000/user?page=${page - 1}&count=${count}`,
          },
      users: users[0],
    };
  }

  async getOne(id: number): Promise<GetUserDto> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException({ success: false, message: 'User not found' });
    return { success: true, message: 'User found', user };
  }
}
