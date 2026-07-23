
import multer, { MulterError } from 'multer';
import { ApiError } from '../utils/ApiError.js';

export const uploadLimit5Mb = multer({
    storage: multer.memoryStorage(),

    fileFilter: function (_, file, cb) {
        const allowedFields = ["application/pdf", "image/jpeg"];
        if (allowedFields.includes(file.mimetype)) {
            return cb(null, true);
        } else {
            return cb(ApiError.InvalidFileType("Only PDF & JPEG Files Allowed"), null);
        }
    },

    limits: {
        fileSize: 5 * 1024 * 1024,
    }
});