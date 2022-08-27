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
exports.resizeImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// import a from '../../images'
const resizeingImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filename, width, height } = req.query;
        const originalImagePath = `${path_1.default.resolve(__dirname, `../../assets/images/${filename}.jpg`)}`;
        const widthNum = parseInt(width);
        const heightNum = parseInt(height);
        const cloneImageDir = `assets/resizingImages/`;
        if (!fs_1.default.existsSync(cloneImageDir)) {
            fs_1.default.mkdirSync(cloneImageDir, { recursive: true });
        }
        const cloneImagePath = path_1.default.resolve(__dirname, `../../${cloneImageDir}/${filename}_${widthNum}_${heightNum}.jpg`);
        if (fs_1.default.existsSync(originalImagePath)) {
            if (fs_1.default.existsSync(cloneImagePath)) {
                fs_1.default.readFile(cloneImagePath, (err) => {
                    if (err)
                        throw err;
                });
                res.status(200).sendFile(`${cloneImagePath}`);
            }
            else {
                yield (0, exports.resizeImage)(originalImagePath, cloneImagePath, widthNum, heightNum);
                res.status(200).sendFile(`${cloneImagePath}`);
            }
        }
        else {
            res.status(400).send(`Photo doesn't exist`);
        }
    }
    catch (err) {
        res.status(400).send(`Photo doesn't exist`);
    }
});
const resizeImage = (oPath, cPath, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, sharp_1.default)(oPath)
        .resize({ width: width, height: height })
        .toFile(`${cPath}`);
});
exports.resizeImage = resizeImage;
exports.default = resizeingImage;
