import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const showingResizingImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { filename, width, height } = req.query;
  const widthNum = parseInt(width as string);
  const heightNum = parseInt(height as string);
  const imagePath = path.resolve(
    __dirname,
    `../../assets/resizingImages/${filename}_${widthNum}_${heightNum}.jpg`
  );
  fs.readFile(imagePath, (error) => {
    if (error) throw error;
    else res;
    // res.write(data);
  });
};

export default showingResizingImage;
