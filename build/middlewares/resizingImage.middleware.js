"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const resizeingImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filename, width, height } = req.query;
        const imageLocation = yield `./images/${filename}.png`;
        const widthNum = parseInt(width);
        const heightNum = parseInt(height);
        const imagePath = `${filename}_${widthNum}_${height}.png`;
        if (fs_1.default.existsSync(imageLocation)) {
            yield (0, sharp_1.default)(imageLocation)
                .resize({ width: widthNum, height: heightNum })
                .toFile(`${filename}_${width}_${height}.png`);
        }
        else {
            res.status(404).send('Photo is not exist');
            return;
        }
        res.sendFile(`./${imagePath}`);
    }
    catch (err) {
        console.log(err);
    }
    next();
});
exports.default = resizeingImage;
