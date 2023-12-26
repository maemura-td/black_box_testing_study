import { Test, TestingModule } from '@nestjs/testing';
import { ComplaintsService } from './complaints.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Complaint } from './entities/complaint.entity';

describe('ComplaintsService', () => {
  let service: ComplaintsService;
  let mockComplaintRepository;

  beforeEach(async () => {
    mockComplaintRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ComplaintsService,
        {
          provide: getRepositoryToken(Complaint),
          useValue: mockComplaintRepository,
        },
      ],
    }).compile();

    service = module.get<ComplaintsService>(ComplaintsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of complaints', async () => {
      const item = new Complaint();
      mockComplaintRepository.find.mockResolvedValue([item]);

      const result = await service.findAll();
      expect(result).toEqual([item]);

      expect(mockComplaintRepository.find).toHaveBeenCalledTimes(1);
    });
  });
});
