
export class ApiError extends Error {
    constructor({ message, status, type, errors = null }) {
        super(message);

        this.status = status;
        this.type = type;
        this.errors = errors;

        Error.captureStackTrace(this, this.constructor);
    };

    static ValidationError(message = "Validation Failed", errors = null) {
        return new ApiError({ message: message, status: 400, type: "ValidationError", errors })
    };

    static BadRequest(message = "Bad Request") {
        return new ApiError({ message, status: 400, type: "BadRequest" });
    };

    static UnAuthorized(message = "Unauthorized", errors = null) {
        return new ApiError({ message, status: 401, type: "Unauthorized", errors });
    };

    static InvalidFileType(message = "Invalid File Type", errors = null) {
        return new ApiError({ message, status: 400, type: "InvalidFileType", errors });
    };

    static FileTooLarge(message = "File Too Large", errors = null) {
        return new ApiError({ message, status: 401, type: "LIMIT_FILE_SIZE", errors });
    };

    static LimitFIleCount(message = "File Count Exceeds", errors = null) {
        return new ApiError({ message: message, status: 400, type: "LIMIT_FILE_COUNT", errors: errors });
    };

    static LimitUnExpectedFile(message = "UnExpected File", errors = null) {
        return new ApiError({ message: message, status: 400, type: "LIMIT_UNEXPECTED_FILE", errors: errors });
    }
};
