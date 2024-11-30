import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { config } from '../config';
import { ApiError } from '../utils/ApiError';

const s3Client = new S3Client({
  region: config.aws.region,
  credentials: {
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
  },
});

export const uploadImage = async (file: Express.Multer.File): Promise<string> => {
  try {
    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = file.originalname.split('.').pop();
    const key = `executives/${timestamp}-${randomString}.${extension}`;

    // Upload to S3
    await s3Client.send(
      new PutObjectCommand({
        Bucket: config.aws.bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      })
    );

    // Return the public URL
    return `https://${config.aws.bucketName}.s3.${config.aws.region}.amazonaws.com/${key}`;
  } catch (error) {
    throw new ApiError(500, 'Error uploading file to S3');
  }
};

export const deleteImage = async (imageUrl: string): Promise<void> => {
  try {
    // Extract key from URL
    const key = imageUrl.split('.com/')[1];

    // Delete from S3
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: config.aws.bucketName,
        Key: key,
      })
    );
  } catch (error) {
    throw new ApiError(500, 'Error deleting file from S3');
  }
};