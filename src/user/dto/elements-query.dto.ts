import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Max, Min, ValidateIf } from 'class-validator';

export class ElementsQueryDto {
  @IsInt()
  @Min(1)
  @ValidateIf((_, value) => (!isNaN(value) ? true : false))
  page?: number;

  @ApiProperty({ required: false, default: 5 })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(100)
  count?: number;

  @IsInt()
  @Min(0)
  @ValidateIf((_, value) => (!isNaN(value) ? true : false))
  offset?: number;
}
