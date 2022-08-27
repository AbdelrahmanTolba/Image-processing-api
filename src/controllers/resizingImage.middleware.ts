import { Request, Response } from 'express';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
// import a from '../../images'

const resizeingImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { filename, width, height } = req.query;
    const originalImagePath = `${path.resolve(
      __dirname,
      `../../assets/images/${filename}.jpg`
    )}`;

    const widthNum = parseInt(width as string);
    const heightNum = parseInt(height as string);
    const cloneImagePath = path.resolve(
      __dirname,
      `../../assets/resizingImages/${filename}_${widthNum}_${heightNum}.jpg`
    );
    if (fs.existsSync(originalImagePath)) {
      if (fs.existsSync(cloneImagePath)) {
        fs.readFile(cloneImagePath, (err) => {
          if (err) throw err;
        });
        res.status(200).sendFile(`${cloneImagePath}`);
      } else {
        await resizeImage(
          originalImagePath,
          cloneImagePath,
          widthNum,
          heightNum
        );
        res.status(200).sendFile(`${cloneImagePath}`);
      }
    } else {
      res.status(400).send(`Photo doesn't exist`);
    }
  } catch (err) {
    res.status(400).send(`Photo doesn't exist`);
  }
};
export const resizeImage = async (
  oPath: string,
  cPath: string,
  width: number,
  height: number
): Promise<void> => {
  await sharp(oPath)
    .resize({ width: width, height: height })
    .toFile(`${cPath}`);
};
export default resizeingImage;
