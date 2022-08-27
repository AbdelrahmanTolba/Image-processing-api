import supertest from 'supertest';
import app from '../../index';


const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Test responses from endpoints => ', (): void => {
  describe('endpoint: /images', (): void => {
    it('gets /images (valid args)', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/images');

      expect(response.status).toBe(400);
    });

    it('gets /images?filename=nature&width=-750&height=750 (invalid args)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/images?filename=nature&width=-750&height=750'
      );

      expect(response.status).toBe(400);
    });

    it('gets /images?filename=nature&width=750&height=a (invalid args)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/images?filename=nature&width=-750&height=a'
      );

      expect(response.status).toBe(400);
    });

    it('gets /images (with no arguments)', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/images');
      expect(response.status).toBe(400);
    });
  });
});
