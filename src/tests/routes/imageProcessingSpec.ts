import supertest from 'supertest';
import app from '../../index';
import fs from 'fs';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Image proscissing', (): void => {
  it('folder is creatred', async (): Promise<void> => {
    await request.get('/images?filename=nature&width=199&height=199');
    let isFileExist;
    try {
      const path = `assets/resizingImages/nature_199_199.jpg`;
      isFileExist = fs.existsSync(path);
    } catch (err) {
      isFileExist = false;
    }

    expect(isFileExist).toBeTrue();
  });
});
