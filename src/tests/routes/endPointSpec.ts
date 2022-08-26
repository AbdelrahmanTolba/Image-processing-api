import supertest from 'supertest';
import app from '../../index';


const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Test responses from endpoints => ', (): void => {
  describe('endpoint: /images', (): void => {
    it('gets /images (valid args)', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/images');

      expect(response.status).toBe(400);
    });

    it('gets /images?filename=nature&width=199&height=199 (valid args)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/images?filename=nature&width=199&height=199'
      );
      expect(response.status).toBe(200);
    });

    it('gets /images?filename=nature&width=-200&height=200 (invalid args)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/images?filename=nature&width=-200&height=200'
      );

      expect(response.status).toBe(400);
    });

    it('gets /images (no arguments)', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/images');
      expect(response.status).toBe(400);
    });
  });
});
