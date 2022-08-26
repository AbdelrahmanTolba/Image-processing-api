"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const port = 3000;
app.use('/', routes_1.default);
app.listen(port, () => {
    console.log(`server started at port ${port}`);
});
// const queryParameterValidation = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { filename, width, height } = req.query;
//   if (!filename || typeof filename !== 'string') {
//     res.status(404).send('Filename should to be string');
//     return;
//   }
//   if (!width && Number(width) <= 0) {
//     return res.status(400).send(`Invalid "width" value: ${width}`);
//   }
//   if (!height && Number(height) <= 0) {
//     res.status(400).send(`Invalid "height" value: ${height}`);
//     return;
//   }
//   next();
// };
// const resizeingImage = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     const { filename, width, height } = req.query;
//     const imageLocation = await `./images/${filename}.png`;
//     const widthNum = parseInt(width as string);
//     const heightNum = parseInt(height as string);
//     const imagePath = `${filename}_${widthNum}_${height}.png`;
//     if (fs.existsSync(imageLocation)) {
//       await sharp(imageLocation)
//         .resize({ width: widthNum, height: heightNum })
//         .toFile(`${filename}_${width}_${height}.png`);
//     } else {
//       res.status(404).send('Photo is not exist');
//       return;
//     }
//     res.sendFile(`./${imagePath}`);
//   } catch (err) {
//     console.log(err);
//   }
//   next();
// };
// const showingResizingImage = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const { filename, width, height } = req.query;
//   const widthNum = parseInt(width as string);
//   const heightNum = parseInt(height as string);
//   const imagePath = `${filename}_${widthNum}_${heightNum}.png`;
//   fs.readFile(imagePath, function (err, data) {
//     if (err) throw err;
//     res.write(data);
//   });
// };
