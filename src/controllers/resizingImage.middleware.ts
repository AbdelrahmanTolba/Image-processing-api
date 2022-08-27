import { Request, Response } from 'express';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
// import a from '../../images'

const resizeingImage = async (req: Request, res: Response): Promise<void> => {
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
    if (fs.existsSync(imagePath)) {
      fs.readFile(imagePath, (err) => {
        if (err) throw err;
      });
      res.status(200).sendFile(`${imagePath}`);
    } else {
      await sharp(imageLocation)
        .resize({ width: widthNum, height: heightNum })
        .toFile(`${imagePath}`);
      res.status(200).sendFile(`${imagePath}`);
    }
  } catch (err) {
    // console.log(err);
  }
};

export default resizeingImage;
