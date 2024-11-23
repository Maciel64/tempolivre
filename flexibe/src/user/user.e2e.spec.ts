import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';
import { User } from './User';
import { faker } from '@faker-js/faker/.';
import { CreateUserDTO } from './user.dto';

describe('Users (e2e) test suite', () => {
  let app: INestApplication;

  const fakeUser: User = {
    id: faker.number.int(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    createdAt: new Date(),
    updatedAt: null,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /users should return all users', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/users')
      .expect(200);

    expect(response.body).toEqual(expect.any(Array));
    expect(response.body.length).toBeGreaterThanOrEqual(0);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          email: expect.any(String),
          firstName: expect.any(String),
          lastName: expect.any(String),
        }),
      ]),
    );
  });

  it('POST /users should create successfully', async () => {
    const data = new CreateUserDTO();

    data.email = fakeUser.email;
    data.firstName = fakeUser.firstName;
    data.lastName = fakeUser.lastName;
    data.password = fakeUser.password;

    const response = await request(app.getHttpServer())
      .post('/api/v1/users')
      .send(data)
      .expect(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        email: fakeUser.email,
        firstName: fakeUser.firstName,
        lastName: fakeUser.lastName,
      }),
    );
  });
});
