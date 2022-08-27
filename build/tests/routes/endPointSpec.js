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
const request = (0, supertest_1.default)(index_1.default);
describe('Test responses from endpoints => ', () => {
    describe('endpoint: /images', () => {
        it('gets /images (valid args)', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/images');
            expect(response.status).toBe(400);
        }));
        it('gets /images?filename=nature&width=-750&height=750 (invalid args)', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/images?filename=nature&width=-750&height=750');
            expect(response.status).toBe(400);
        }));
        it('gets /images?filename=nature&width=750&height=a (invalid args)', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/images?filename=nature&width=-750&height=a');
            expect(response.status).toBe(400);
        }));
        it('gets /images (with no arguments)', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/images');
            expect(response.status).toBe(400);
        }));
    });
});
