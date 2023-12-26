import { INestApplication } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Test } from "@nestjs/testing";

import { ComplaintsModule } from "../../src/complaints/complaints.module";
import { Complaint } from "../../src/complaints/entities/complaint.entity";
import { DeepPartial, Repository } from "typeorm";

import * as request from 'supertest';


describe('Complaints Module', () => {
  let app: INestApplication
  let repo: Repository<Complaint>

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [
        ComplaintsModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'db.e2e.sqlite',
          entities: [Complaint],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Complaint])
      ]
    }).compile();
    app = moduleFixture.createNestApplication();
    repo = moduleFixture.get('ComplaintRepository');
    await app.init();
  });

  afterEach(async () => {
    await repo.clear();
  });


  describe('/complaints', () => {
    it('GET returns empty list if there is no data.', async () => {
      const res: { body: Complaint[] } = await request(app.getHttpServer())
        .get('/complaints')
        .send()
        .expect(200);

      expect(res.body.length).toEqual(0);
    });


    it('GET returns list of complaints', async () => {
      const complaint = await repo.save({
        customer: 'John Doe',
        detail: 'I am not happy with the service',
        product: 'Product A',
        lot: '0123',
        title: 'Bad product',
      });

      const res: { body: Complaint[] } = await request(app.getHttpServer())
        .get('/complaints')
        .send()
        .expect(200);

      expect(res.body.length).toEqual(1);
    });
  });
});


describe('State Transition Test', () => {
  let app: INestApplication
  let repo: Repository<Complaint>

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [
        ComplaintsModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'db.e2e.sqlite',
          entities: [Complaint],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Complaint])
      ]
    }).compile();
    app = moduleFixture.createNestApplication();
    repo = moduleFixture.get('ComplaintRepository');
    await app.init();
  });

  afterEach(async () => {
    await repo.clear();
  });

  describe('Matrix test', () => {
    it('pending -> opened', async () => {
      const pending = await createWithState('pending');

      const response = await request(app.getHttpServer())
        .put(`/complaints/${pending.id}`)
        .send({
          state: 'opened',
        })
        .expect(200);

      expect(response.body.state).toBe('opened');
      expect(find(pending.id)).resolves.toMatchObject({ state: 'opened' });
    });
  });

  describe('Path test', () => {
    it('pending -> opened -> cancelled', async () => {
      let response = await request(app.getHttpServer())
        .post(`/complaints`)
        .send({
          customer: 'John Doe',
          product: 'Product Name',
          detail: 'Detail',
          lot: '0123',
          title: 'Title',
        })
        .expect(201);

      const id = response.body.id;

      response = await request(app.getHttpServer())
        .get(`/complaints/${id}`)
        .send()
        .expect(200);
      expect(response.body.state).toBe('pending');

      response = await request(app.getHttpServer())
        .put(`/complaints/${id}`)
        .send({
          state: 'opened',
        })
        .expect(200);

      response = await request(app.getHttpServer())
        .get(`/complaints/${id}`)
        .send()
        .expect(200);
      expect(response.body.state).toBe('opened');

      response = await request(app.getHttpServer())
        .put(`/complaints/${id}`)
        .send({
          state: 'cancelled',
        })
        .expect(200);

      response = await request(app.getHttpServer())
        .get(`/complaints/${id}`)
        .send()
        .expect(200);
      expect(response.body.state).toBe('cancelled');
    });
  });

  const find = async (id: string) => {
    return await repo.findOne({
      where: { id },
    });
  }

  const createWithState = async (state: 'pending' | 'opened' | 'closed' | 'cancelled' | 're-opened') => {
    return await repo.save<DeepPartial<Complaint>>({
      customer: 'John Doe',
      product: 'Product Name',
      detail: 'Detail',
      lot: '0123',
      title: 'Title',
      state: 'pending',
    });
  }

});