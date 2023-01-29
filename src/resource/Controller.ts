import { Request, Response } from 'express';
import Service from './Service';

class Controller {
  async createPhoto(req: Request, res: Response): Promise<Response> {
    try {
      const image = req.file;
      const { name } = req.body;
      const newPhoto = await Service.createPhoto(image, name);
      return res.status(200).send(newPhoto);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }

  async findPhoto(req: Request, res: Response): Promise<Response> {
    try {
      const image = req.params.photoId;
      const findPhoto = await Service.findPhoto(image);
      return res.status(200).send(findPhoto);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }

  async deletePhoto(req: Request, res: Response): Promise<Response> {
    try {
      const image = req.params.photoId;
      const deletePhoto = await Service.deletePhoto(image);
      return res.status(200).send(deletePhoto);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
}

export default new Controller();
