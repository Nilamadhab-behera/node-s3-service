import { completeLargeFileUpload, generatePresignedUrls, uploadLargeFile, uploadToS3 } from "../config/s3/s3.service.js";

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
    } catch (error) {
        next(error);
    }
};

export const handleHeavyFileUpload = async (req, res, next) => {
    try {
        let { fileName, contentType, totalChunks } = req.body;
        let key = `large_file/${fileName}`;

        let result = await uploadLargeFile(key, contentType);
        let presignedUrls = await generatePresignedUrls(result.UploadId, key, totalChunks);

        return res.status(201).json({
            success: true,
            result: { uploadId: result.UploadId, key, presignedUrls },
        });
    } catch (error) {
        console.log(error);
        next(error);
    };
};

export const handleLargeFileCompleteUpload = async (req, res, next) => {
    try {
        let { uploadId, key, parts } = req.body;
        await completeLargeFileUpload(uploadId, key, parts);

        return res.status(201).json({
            success: true,
            message: "File Uploaded Successfully"
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
