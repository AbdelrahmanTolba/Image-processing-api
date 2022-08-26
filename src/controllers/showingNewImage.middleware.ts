import { Request, Response } from 'express';
import fs from 'fs';

const showingResizingImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { filename, width, height } = req.query;
  const widthNum = parseInt(width as string);
  const heightNum = parseInt(height as string);
  const imagePath = `${filename}_${widthNum}_${heightNum}.png`;

  fs.readFile(imagePath, function (error, data) {
    if (error) throw error;
    res.write(data);
  });
};

export default showingResizingImage;
