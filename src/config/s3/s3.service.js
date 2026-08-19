import s3Client from "./s3.client.js";
import { GetObjectCommand, PutObjectCommand, DeleteObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { AWS_BUCKETNAME } from "../../utils/env.js";

// Upload File
export const uploadToS3 = async (filePath, fileBuffer, contentType) => {
    try {
        // Configure that which Object Or File you want to upload to which bucket with there buffer & mime type
        let command = new PutObjectCommand({
            Bucket: AWS_BUCKETNAME,
            Key: filePath,
            Body: fileBuffer,
            ContentType: contentType
        });

        let response = await s3Client.send(command);
        return 1;
        // When You Want To Upload Large Video & FILES
        /* 
        let command = new PutObjectCommand({
            Bucket: AWS_BUCKETNAME,
            Key: filePath,
            ContentType: contentType
        });
        let response = await getSignedUrl(s3Client, command);
        return response; 
        */
    } catch (error) {
        console.error("Failed To Upload To S3");
        console.log(error);
        return 0;
    }
};

// Check Weather File Exists Or Not In S3
const checkFileExistsInS3 = async (filePath) => {
    try {
        let command = new HeadObjectCommand({
            Bucket: AWS_BUCKETNAME,
            Key: filePath
        });

        await s3Client.send(command);
        return "S3 Object Exists";

    } catch (error) {
        if (error.name === "NotFound") {
            console.log("Object does not exist");
        } else {
            console.error(error);
        }
    };
};

// Generate Pre-Signed URL
export const generateSignedUrl = async (filePath) => {
    try {
        // First Configure Which Object or File From Which Bucket You Want To Access.
        let command = await new GetObjectCommand({
            Bucket: AWS_BUCKETNAME,
            Key: filePath
        });

        // Then Tell To S3 Hey These Client Want These Object From These Bucket
        let preSignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 5 * 60 });
        return preSignedUrl;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// For deleting file from s3
const deleteFromS3 = async (filepath) => {
    try {
        let command = new DeleteObjectCommand({
            Bucket: AWS_BUCKETNAME,
            Key: filepath
        });
        let response = await s3Client.send(command);
        return 1;
    } catch (error) {
        console.error("Failed To Delete From S3");
        console.error(error);
        return 0;
    }
};