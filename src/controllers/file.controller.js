import { uploadToS3 } from "../config/s3/s3.service.js";

export const handleFileUpload = async (req, res, next) => {
    try {
        let filePath = `uploads/profile/${req.file.originalname}`;
        let fileBuffer = req.file.buffer;
        let contentType = req.file.mimetype;
        await uploadToS3(filePath, fileBuffer, contentType);

        return res.status(200).json({
            success: true,
            message: "File Uploaded Succesfully"
        });
    } catch(error){
        next(error);
    }
};

const getFileFromAws = async (req, res, next) => {
    try {
        let fileName = await ge
    } catch(error) {
        next(error);
    }
}