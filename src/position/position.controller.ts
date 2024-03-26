import { Controller, Get } from '@nestjs/common';
import { PositionService } from './position.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Position')
@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Get()
  findAll() {
    return this.positionService.findAll();
  }
}
