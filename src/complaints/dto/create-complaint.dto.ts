import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Column } from "typeorm";

export class CreateComplaintDto {

  @ApiProperty({
    required: true,
    nullable: false,
    description: 'Name of the person who is complaining',
    example: 'John Doe',
  })
  customer: string;

  @ApiProperty({
    required: true,
    nullable: false,
    description: 'Name of the product that is being complained about',
    example: 'Product A',
  })
  product: string;

  @ApiProperty({
    required: true,
    nullable: false,
    description: 'Lot number of the product',
    maxLength: 5,
    minLength: 4,
    example: '0123',
  })
  lot: string;

  @ApiProperty({
    required: true,
    nullable: false,
    description: 'Title of the complaint',
    example: 'Product A is not working',
  })
  title: string;

  @ApiProperty({
    required: true,
    nullable: false,
    description: 'Detail of the complaint',
    example: 'Product A is not working. I tried to use it but it did not work.',
  })
  detail: string;

  @ApiPropertyOptional({
    description: 'Note of the complaint',
    example: 'Customer is very angry.',
  })
  note: string;

}
