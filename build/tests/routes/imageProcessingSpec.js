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
const image_size_1 = __importDefault(require("image-size"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const request = (0, supertest_1.default)(index_1.default);
describe('Image proscissing', () => {
    it('folder is creatred', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get('/images?filename=nature&width=199&height=199');
        let isFileExist;
        try {
            const path = `assets/resizingImages/nature_199_199.jpg`;
            isFileExist = fs_1.default.existsSync(path);
        }
        catch (err) {
            isFileExist = false;
        }
        expect(isFileExist).toBeTrue();
    }));
    it('created a resizing image with the correct height and width', (done) => {
        (0, supertest_1.default)(index_1.default)
            .get('/images?filename=nature&width=200&height=250')
            .then(() => {
            const dimensions = (0, image_size_1.default)(path_1.default.resolve(__dirname, '../../../assets/resizingImages/nature_200_250.jpg'));
            console.log(dimensions.width);
            expect(dimensions.width).toEqual(200);
            expect(dimensions.height).toEqual(250);
            done();
        });
    });
});
