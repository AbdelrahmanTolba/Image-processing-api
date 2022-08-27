"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queryParameterValidation = (req, res, next) => {
    const { filename, width, height } = req.query;
    const validation_array = [
        ['filename', filename],
        ['width', width],
        ['height', height],
    ];
    for (const item of validation_array) {
        if (!item[1]) {
            return res.status(400).send(`field ${item[0]} doesn't exist`);
        }
    }
    if (filename == undefined || width == undefined || height == undefined) {
        return res
            .status(400)
            .send(`Please complete parameters "filename,width,height"`);
    }
    if (!filename || typeof filename !== 'string') {
        return res.status(400).send('filename should to be string');
    }
    if ((width && Number(width) <= 0) || width === '' || isNaN(+width)) {
        return res.status(400).send(`Invalid "width" value: ${width}`);
    }
    if ((height && Number(height) <= 0) || height === '' || isNaN(+height)) {
        return res.status(400).send(`Invalid "height" value: ${height}`);
    }
    next();
};
exports.default = queryParameterValidation;
