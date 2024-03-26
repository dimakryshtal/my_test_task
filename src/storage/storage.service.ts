import { Injectable } from '@nestjs/common';
import tinify from 'tinify';

@Injectable()
export class StorageService {
  constructor() {
    tinify.key = process.env.TINIFY_API_KEY;
  }
  async s3_upload(file): Promise<any> {
    const source = tinify.fromBuffer(file.buffer);
    const resized = source.resize({
      method: 'cover',
      width: 70,
      height: 70,
    });
    const location = await resized
      .store({
        service: 's3',
        aws_access_key_id: process.env.AWS_S3_ACCESS_KEY_ID,
        aws_secret_access_key: process.env.AWS_S3_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
        path: `${process.env.AWS_S3_BUCKET_NAME}/${file.originalname}`,
      })
      .location();

    return location;
  }
}
