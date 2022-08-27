import supertest from 'supertest';
import app from '../../index';
import sizeOf from 'image-size';
import path from 'path';
import fs from 'fs';
import fsPromise from 'fs/promises';
import { Stats } from 'fs';
import { resizeImage } from '../../controllers/resizingImage.middleware';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Image proscissing', (): void => {
  it('file is creatred', async (): Promise<void> => {
    let width: number = Math.floor(Math.random() * 1000 + 50);
    let height: number = Math.floor(Math.random() * 1000 + 50);
    let imagePath = `assets/resizingImages/nature_${width}_${height}.jpg`;
    while (fs.existsSync(imagePath)) {
      width = Math.floor(Math.random() * 1000 + 50);
      height = Math.floor(Math.random() * 1000 + 50);
      imagePath = `assets/resizingImages/nature_${width}_${height}.jpg`;
    }

    await request.get(
      `/images?filename=nature&width=${width}&height=${height}`
    );
    let isFileExist;
    try {
      isFileExist = fs.existsSync(imagePath);
      isFileExist && fs.unlinkSync(imagePath);
    } catch (err) {
      isFileExist = false;
    }
    expect(isFileExist).toBeTrue();
  });

  it('Sharp function is run successfully', async (): Promise<void> => {
    let width: number = Math.floor(Math.random() * 1000 + 50);
    let height: number = Math.floor(Math.random() * 1000 + 50);
    const originPath = `assets/images/nature.jpg`;
    let clonePath = `assets/resizingImages/nature_${width}_${height}.jpg`;
    while (fs.existsSync(clonePath)) {
      width = Math.floor(Math.random() * 1000 + 50);
      height = Math.floor(Math.random() * 1000 + 50);
      clonePath = `assets/resizingImages/nature_${width}_${height}.jpg`;
    }

    await resizeImage(originPath, clonePath, width, height);
    let isFileExist;
    try {
      isFileExist = fs.existsSync(clonePath);
      isFileExist && fs.unlinkSync(clonePath);
    } catch (err) {
      isFileExist = false;
    }

    expect(isFileExist).toBeTrue();
  });

  describe('GET /images', () => {
    it('created a resizing image', async (): Promise<void> => {
      const width: number = Math.floor(Math.random() * 1000 + 50);
      const height: number = Math.floor(Math.random() * 1000 + 50);
      const imagePath = `assets/resizingImages/nature_${width}_${height}.jpg`;

      supertest(app)
        .get(`/images?filename=nature&width=${width}&height=${height}`)
        .then(() => {
          fsPromise
            .stat(path.resolve(__dirname, `../../../${imagePath}`))
            .then((fileStat: Stats) => expect(fileStat).not.toBeNull());
          fs.unlinkSync(`${imagePath}`);
        });
    });
  });

  it('gets /(valid args)', async (): Promise<void> => {
    const width: number = Math.floor(Math.random() * 1000 + 50);
    const height: number = Math.floor(Math.random() * 1000 + 50);
    const imagePath = `assets/resizingImages/nature_${width}_${height}.jpg`;
    const response: supertest.Response = await request.get(
      `/images?filename=nature&width=${width}&height=${height}`
    );
    fs.unlinkSync(imagePath);
    expect(response.status).toBe(200);
  });
});
