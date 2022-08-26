import { Request, Response, NextFunction } from 'express';
const queryParameterValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(res);
  const { filename, width, height } = req.query;
  if (!filename && !width && !height) {
    res
      .status(400)
      .send(
        '<h3>Please enter query => (filename={filename}&width={width}&height={height})</h3>'
      );
    return;
  }
  if (filename == undefined || width == undefined || height == undefined) {
    return res
      .status(400)
      .send(`Please complete parameters "filename,width,height"`);
  }
  if (!filename || typeof filename !== 'string') {
    res.status(400).send('filename should to be string');
    return;
  }
  if ((width && Number(width) <= 0) || width === '') {
    return res.status(400).send(`Invalid "width" value: ${width}`);
  }

  if ((height && Number(height) <= 0) || height === '') {
    res.status(400).send(`Invalid "height" value: ${height}`);
    return;
  }

  next();
};

export default queryParameterValidation;
