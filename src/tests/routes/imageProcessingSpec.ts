import supertest from 'supertest';
import app from '../../index';
import sizeOf from 'image-size';
import path from 'path';
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

  it('created a resizing image with the correct height and width', (done): void => {
    supertest(app)
      .get('/images?filename=nature&width=200&height=250')
      .then(() => {
        const dimensions = sizeOf(
          path.resolve(
            __dirname,
            '../../../assets/resizingImages/nature_200_250.jpg'
          )
        );
        console.log(dimensions.width);
        expect(dimensions.width).toEqual(200);
        expect(dimensions.height).toEqual(250);
        done();
      });
  });
});
