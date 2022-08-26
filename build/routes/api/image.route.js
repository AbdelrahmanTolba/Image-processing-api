"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const queryValidation_middleware_1 = __importDefault(require("../../middlewares/queryValidation.middleware"));
const resizingImage_middleware_1 = __importDefault(require("../../middlewares/resizingImage.middleware"));
const showingNewImage_middleware_1 = __importDefault(require("../../controllers/showingNewImage.middleware"));
const image = express_1.default.Router();
image.get('/', queryValidation_middleware_1.default, resizingImage_middleware_1.default, showingNewImage_middleware_1.default);
exports.default = image;
