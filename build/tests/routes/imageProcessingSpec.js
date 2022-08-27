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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const promises_1 = __importDefault(require("fs/promises"));
const resizingImage_middleware_1 = require("../../controllers/resizingImage.middleware");
const request = (0, supertest_1.default)(index_1.default);
describe('Image proscissing', () => {
    it('file is creatred', () => __awaiter(void 0, void 0, void 0, function* () {
        let width = Math.floor(Math.random() * 1000 + 50);
        let height = Math.floor(Math.random() * 1000 + 50);
        let imagePath = `assets/resizingImages/nature_${width}_${height}.jpg`;
        while (fs_1.default.existsSync(imagePath)) {
            width = Math.floor(Math.random() * 1000 + 50);
            height = Math.floor(Math.random() * 1000 + 50);
            imagePath = `assets/resizingImages/nature_${width}_${height}.jpg`;
        }
        yield request.get(`/images?filename=nature&width=${width}&height=${height}`);
        let isFileExist;
        try {
            isFileExist = fs_1.default.existsSync(imagePath);
            isFileExist && fs_1.default.unlinkSync(imagePath);
        }
        catch (err) {
            isFileExist = false;
        }
        expect(isFileExist).toBeTrue();
    }));
    it('Sharp function is run successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        let width = Math.floor(Math.random() * 1000 + 50);
        let height = Math.floor(Math.random() * 1000 + 50);
        const originPath = `assets/images/nature.jpg`;
        let clonePath = `assets/resizingImages/nature_${width}_${height}.jpg`;
        while (fs_1.default.existsSync(clonePath)) {
            width = Math.floor(Math.random() * 1000 + 50);
            height = Math.floor(Math.random() * 1000 + 50);
            clonePath = `assets/resizingImages/nature_${width}_${height}.jpg`;
        }
        yield (0, resizingImage_middleware_1.resizeImage)(originPath, clonePath, width, height);
        let isFileExist;
        try {
            isFileExist = fs_1.default.existsSync(clonePath);
            isFileExist && fs_1.default.unlinkSync(clonePath);
        }
        catch (err) {
            isFileExist = false;
        }
        expect(isFileExist).toBeTrue();
    }));
    describe('GET /images', () => {
        it('created a resizing image', () => __awaiter(void 0, void 0, void 0, function* () {
            const width = Math.floor(Math.random() * 1000 + 50);
            const height = Math.floor(Math.random() * 1000 + 50);
            const imagePath = `assets/resizingImages/nature_${width}_${height}.jpg`;
            (0, supertest_1.default)(index_1.default)
                .get(`/images?filename=nature&width=${width}&height=${height}`)
                .then(() => {
                promises_1.default
                    .stat(path_1.default.resolve(__dirname, `../../../${imagePath}`))
                    .then((fileStat) => expect(fileStat).not.toBeNull());
                fs_1.default.unlinkSync(`${imagePath}`);
            });
        }));
    });
    it('gets /(valid args)', () => __awaiter(void 0, void 0, void 0, function* () {
        const width = Math.floor(Math.random() * 1000 + 50);
        const height = Math.floor(Math.random() * 1000 + 50);
        const imagePath = `assets/resizingImages/nature_${width}_${height}.jpg`;
        const response = yield request.get(`/images?filename=nature&width=${width}&height=${height}`);
        fs_1.default.unlinkSync(imagePath);
        expect(response.status).toBe(200);
    }));
});
