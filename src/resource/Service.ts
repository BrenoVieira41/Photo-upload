import { Photos } from '../database/entities/Photos';
import Repository from './Repository';
import S3, { PutObjectRequest, DeleteObjectRequest } from 'aws-sdk/clients/s3';
import { createReadStream } from 'fs';

const s3 = new S3({
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.BUCKET_USER_ACESS,
    secretAccessKey: process.env.BUCKET_USER_PASSWORD,
  }
});

class Service {
  private readonly repository: Repository;

  constructor() {
    this.repository = new Repository();
  }

  public async createPhoto(photo, name: string): Promise<any> {
    try {
      const addS3 = await this.uploadPhotoS3(photo);

      const createPhoto = await this.repository.createPhoto(addS3.Location, name);
      return createPhoto;
    } catch (error) {
      throw new Error(error.message)
    }
  }

  public async findPhoto(id: string | number): Promise<Photos> {
    try {
      id = Number(id)
      const getPhoto = await this.repository.findPhoto(id);

      if (getPhoto === null) {
        throw new Error('Nenhuma foto encontrada');
      }

      return getPhoto;
    } catch(error) {
      throw new Error(error.message);
    }
  }

  public async deletePhoto(id: string | number): Promise<any> {
    try {
      const getPhoto = await this.findPhoto(id);
      const path = getPhoto.image.split('/');

      this.deletePhotoS3(path[3]);

      return this.repository.deletePhoto(getPhoto.id);
    } catch(error) {
      throw new Error(error.message);
    }
  }

  private async uploadPhotoS3(data) {
    const readPhoto = createReadStream(data.path);

    const uploadParams: PutObjectRequest = {
      Bucket: process.env.BUCKET_NAME,
      Body: readPhoto,
      Key: data.filename,
      ACL: 'public-read',
      ContentType: 'png'
    }

    return s3.upload(uploadParams).promise();
  }

  private async deletePhotoS3(filename: string) {
    const deleteParams: DeleteObjectRequest = {
      Bucket: process.env.BUCKET_NAME,
      Key: filename
    }

    return s3.deleteObject(deleteParams).promise();
  }
}

export default new Service();
