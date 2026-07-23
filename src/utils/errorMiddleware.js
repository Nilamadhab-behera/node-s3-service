import multer from "multer";
import { ApiError } from "./ApiError.js";

export const errorMiddleware = (error, req, res, next) => {
    // Check Whether The Error Object Is Generated Through Multer Class Or Not.
    if (error instanceof multer.MulterError) {
        switch (error.code) {
            case "LIMIT_FILE_SIZE":
                error = ApiError.FileTooLarge("File size exceeds 5 MB.!");
            case "LIMIT_FILE_COUNT":
                error = ApiError.LimitFIleCount("Too many files uploaded.");
            case "LIMIT_UNEXPECTED_FILE":
                error = ApiError.LimitUnExpectedFile("Unexpected file or incorrect field name.");
            default:
                error = error;
        };

        return res.status(400).json({ message: error.message });
    };

    let status = error?.status ?? 500;
    let message = error?.status && error?.message ? error.message : "Internal Server Error";

    return res.status(status).json({
        success: false,
        message: message,
        ...(error?.errors && { errors: error.errors })
    });
}