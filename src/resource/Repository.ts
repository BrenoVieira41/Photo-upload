import { AppDataSource } from '../database/data-source';
import { Photos } from '../database/entities/Photos';

class Repository {
  private repository = AppDataSource.getRepository(Photos);

  public async createPhoto(image: string, name: string): Promise<Photos> {
    const createPhoto = await this.repository.save({ image, name })
      .catch((error) => {
        throw new Error(error);
      });
    return createPhoto;
  }

  public async findPhoto(id: number): Promise<Photos> {
    const findPhoto = await this.repository.findOne({ where: { id } })
      .catch((error) => {
        throw new Error(error);
      });
    return findPhoto;
  }

  public async deletePhoto(id: number): Promise<string> {
    const deletePhoto = await this.repository.delete(id);

    if (deletePhoto.affected !== 1) {
      throw new Error('Falha ao deletar foto');
    }

    return 'Foto deletada com sucesso';
  }
}

export default Repository;
