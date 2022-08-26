import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';
import fs from 'fs';

const resizeingImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { filename, width, height } = req.query;
    const imageLocation = await `./images/${filename}.png`;
    const widthNum = parseInt(width as string);
    const heightNum = parseInt(height as string);
    const imagePath = `${filename}_${widthNum}_${height}.png`;
    if (fs.existsSync(imageLocation)) {
      await sharp(imageLocation)
        .resize({ width: widthNum, height: heightNum })
        .toFile(`${filename}_${width}_${height}.png`);
    } else {
      res.status(404).send('Photo is not exist');
      return;
    }
    res.sendFile(`./${imagePath}`);
  } catch (err) {
    console.log(err);
  }
  next();
};

export default resizeingImage;
