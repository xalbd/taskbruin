// s3Utils.ts
import AWS from 'aws-sdk';

if (!process.env.AWS_S3_ACCESS_KEY! || !process.env.AWS_S3_SECRET_ACCESS_KEY! || !process.env.AWS_S3_REGION!) {
  throw new Error('AWS credentials not provided. Make sure to set AWS_S3_ACCESS_KEY, AWS_S3_SECRET_ACCESS_KEY, and AWS_S3_REGION environment variables.');
}

AWS.config.update({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY!,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
  region: process.env.AWS_S3_REGION!,
});

const s3 = new AWS.S3();

export async function uploadImageToS3(image: File): Promise<string> {
  const uploadParams: AWS.S3.Types.PutObjectRequest = {
    Bucket: 'taskbruin',
    Key: `images/${image.name}`,
    Body: image,
    ContentType: image.type,
  };

  const result = await s3.upload(uploadParams).promise();
  return result.Location || '';
}
