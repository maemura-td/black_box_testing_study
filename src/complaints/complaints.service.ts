import { Complaint } from './entities/complaint.entity';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateComplaintDto } from './dto/update-complaint.dto';

@Injectable()
export class ComplaintsService {

  constructor(
    @InjectRepository(Complaint)
    private complaintsRepository: Repository<Complaint>,
  ){}

  async findAll(): Promise<Complaint[]> {
    return this.complaintsRepository.find();
  }

  async findOne(id: string): Promise<Complaint> {
    return this.complaintsRepository.findOne({
      where: {
        id,
      }
    });
}

  async create(createComplaintDto: CreateComplaintDto): Promise<Complaint> {
    return this.complaintsRepository.save(createComplaintDto);
  }

  update(id: string, updateComplaintDto: UpdateComplaintDto) {
    return this.complaintsRepository.update(id, updateComplaintDto);
  }
}
