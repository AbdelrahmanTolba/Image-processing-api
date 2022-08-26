import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
// import a from '../../images'

const resizeingImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { filename, width, height } = req.query;
    const imageLocation = `${path.resolve(
      __dirname,
      `../../assets/images/${filename}.jpg`
    )}`;

    const widthNum = parseInt(width as string);
    const heightNum = parseInt(height as string);
    const imagePath = path.resolve(
      __dirname,
      `../../assets/resizingImages/${filename}_${widthNum}_${heightNum}.jpg`
    );
    if (fs.existsSync(imageLocation)) {
      await sharp(imageLocation)
        .resize({ width: widthNum, height: heightNum })
        .toFile(`${imagePath}`);
    } else {
      res.status(404).send('Photo is not exist');
      return;
    }
    res.status(200).sendFile(`${imagePath}`);
  } catch (err) {
    console.log(err);
  }
  next();
};

export default resizeingImage;
