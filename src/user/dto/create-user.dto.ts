import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(60)
  name: string;

  @IsEmail()
  email: string;

  @IsMobilePhone('uk-UA', { strictMode: true })
  phone: string;

  position_id: number;

  @ApiProperty({ type: 'string', format: 'binary' })
  file?: Express.Multer.File;
}
