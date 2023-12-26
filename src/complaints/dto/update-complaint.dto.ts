import { PartialType } from '@nestjs/mapped-types';
import { CreateComplaintDto } from './create-complaint.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateComplaintDto extends PartialType(CreateComplaintDto) {
  @ApiPropertyOptional({
    description: 'The status of the complaint',
    example: 'opened',
    enum: ['pending', 'opened', 'closed', 'cancelled', 're-opened']
  })
  state: string;
}
