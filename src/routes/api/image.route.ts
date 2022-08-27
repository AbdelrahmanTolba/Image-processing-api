import express from 'express';

import parameterValidation from '../../middlewares/queryValidation.middleware';
import resizingImage from '../../controllers/resizingImage.middleware';

const image = express.Router();

image.get('/', parameterValidation, resizingImage);

export default image;
