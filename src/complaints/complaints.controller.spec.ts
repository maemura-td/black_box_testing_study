import { Test, TestingModule } from '@nestjs/testing';
import { ComplaintsController } from './complaints.controller';
import { ComplaintsService } from './complaints.service';
import { BadRequestException } from '@nestjs/common';

describe('ComplaintsController', () => {
  let controller: ComplaintsController;
  let mockService;

  const COLLECT_REQUEST_BODY = {
    customer: 'John Doe',
    product: 'Product 1',
    lot: '1234',
    title: 'Title 1',
    detail: 'Detail 1',
    note: null,
  }

  beforeEach(async () => {
    mockService = {
      create: jest.fn(),
      update: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComplaintsController],
      providers: [
        {
          provide: ComplaintsService,
          useValue: mockService,
        }],
    }).compile();

    controller = module.get<ComplaintsController>(ComplaintsController);
  });

  describe('GET', () => {
    it('should create a complaint', () => {
      mockService.create.mockResolvedValue(COLLECT_REQUEST_BODY);
      expect(controller.create(COLLECT_REQUEST_BODY)).resolves.toMatchObject(COLLECT_REQUEST_BODY);

      mockService.create.mockResolvedValue({ ...COLLECT_REQUEST_BODY, lot: '12345' });
      const body = { ...COLLECT_REQUEST_BODY, lot: '12345', }
      expect(controller.create(body)).resolves.toMatchObject(body);
    });

    it('should throw an error if lot number is too short', () => {
      expect(() => {
        controller.create({
          ...COLLECT_REQUEST_BODY,
          lot: '123',
        });
      }).toThrow(BadRequestException);
    });

    it('should throw an error if lot number is too long', () => {
      expect(() => {
        controller.create({
          ...COLLECT_REQUEST_BODY,
          lot: '123456',
        })
      }).toThrow(BadRequestException);
    });
  });

});
