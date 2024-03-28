import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min, ValidateIf } from 'class-validator';

export class ElementsQueryDto {
  @IsInt()
  @Min(1)
  @ValidateIf((_, value) => (value || value === 0 ? true : false))
  page?: number;

  @ApiProperty({ required: false, default: 5 })
  @IsInt()
  @Min(1)
  @Max(100)
  @ValidateIf((_, value) => (value || value === 0 ? true : false))
  count?: number;

  @IsInt()
  @Min(0)
  @ValidateIf((_, value) => (value ? true : false))
  offset?: number;
}
