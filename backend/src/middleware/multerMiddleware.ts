const multer = require('multer');
import { Request } from 'express';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: any) {
        const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        if (!allowedFileTypes.includes(file.mimetype)) {
            cb(new Error('filetype must be jpg, png, or jpeg'));
            return;
        }
        console.log("filemulter:",file)
        //location of uploads folder
        cb(null, path.join(__dirname, '../uploads'));
        // cb(null,'./src/uploads');
    },
    filename: function (req: Request, file: Express.Multer.File, cb: any) {
        const data = Date.now();
        cb(null, data + '-' + file.originalname);
    }
});

const upload = multer({ storage });

export {
    multer,
    storage,
    upload
};