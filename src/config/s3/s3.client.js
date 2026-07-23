import { S3Client } from "@aws-sdk/client-s3";
import { AWS_REGION, AWS_ACCESSKEYID, AWS_SECRETACCESSKEY } from "../../utils/env.js";

// S3 Client represents the AWS credentials that will access S3.
const s3Client = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESSKEYID,
        secretAccessKey: AWS_SECRETACCESSKEY,
    },
});

export default s3Client;
