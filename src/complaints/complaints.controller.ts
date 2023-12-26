import { Controller, Get, Post, Body, Patch, Param, Delete, Response, HttpCode, BadRequestException, Put, Injectable } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateComplaintDto } from './dto/update-complaint.dto';

@ApiTags('complaints')
@Controller('complaints')
export class ComplaintsController {
  constructor(
    private readonly complaintsService: ComplaintsService
  ) { }

  @Get()
  findAll() {
    return this.complaintsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.complaintsService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() createComplaintDto: CreateComplaintDto) {
    // TODO: Use a validation library instead of this if statement.
    if (createComplaintDto.lot.length < 4 || createComplaintDto.lot.length > 5) {
      throw new BadRequestException('Lot number must be 4 or 5 characters long');
    }
    return this.complaintsService.create(createComplaintDto);
  }

  @Put(':id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() updateComplaintDto: UpdateComplaintDto) {
    await this.complaintsService.update(id, updateComplaintDto);
    return this.findOne(id);
  }

}
