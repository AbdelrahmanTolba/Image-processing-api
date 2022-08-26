import express from 'express';

import parameterValidation from '../../middlewares/queryValidation.middleware';
import resizingImage from '../../middlewares/resizingImage.middleware';
import showingImage from '../../controllers/showingNewImage.middleware';

const image = express.Router();

image.get('/', parameterValidation, resizingImage, showingImage);

export default image;
