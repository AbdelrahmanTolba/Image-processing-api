"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queryParameterValidation = (req, res, next) => {
    const { filename, width, height } = req.query;
    if (!filename || typeof filename !== 'string') {
        res.status(404).send('Filename should to be string');
        return;
    }
    if (!width && Number(width) <= 0) {
        return res.status(400).send(`Invalid "width" value: ${width}`);
    }
    if (!height && Number(height) <= 0) {
        res.status(400).send(`Invalid "height" value: ${height}`);
        return;
    }
    next();
};
exports.default = queryParameterValidation;
