"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const image_route_1 = __importDefault(require("./api/image.route"));
const routes = express_1.default.Router();
routes.get('/', (_, res) => {
    res.status(200).send('<h1>Connected!</h1>');
});
routes.use('/images', image_route_1.default);
routes.all('*', (_, res) => {
    res.redirect('/images');
});
exports.default = routes;
