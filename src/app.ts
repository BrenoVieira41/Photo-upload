import 'reflect-metadata';
import express, { Router } from 'express';
import Controller from './resource/Controller';
import multer from 'multer';


const uploads = multer({ dest: 'uploads/' });
const app = express();
const router = Router();

app.use(express.json());
router.post('/api/photo/create', uploads.single('image'), Controller.createPhoto);
router.get('/api/photo/:photoId', Controller.findPhoto);
router.delete('/api/photo/:photoId', Controller.deletePhoto);

app.use(router);

export { app };
