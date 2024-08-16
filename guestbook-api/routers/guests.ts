import express from 'express';
import fileDb from '../fileDb';
import { GuestMutation } from '../types';
import { imageUpload } from '../multer';

const guestsRouter = express.Router();

guestsRouter.get('/', async (req, res) => {
  const guests = await fileDb.getItems();
  return res.send(guests);
});

guestsRouter.post('/',
  imageUpload.single('image'),
  async (req, res) => {
    if (!req.body.message) {
      return res.status(400).send({error: 'Message are required'});
    }
    const author = req.body.author ? req.body.author : 'anonymous';

    const guest: GuestMutation = {
      author,
      message: req.body.message,
      image: req.file ? req.file.filename : null,
    };

    const savedGuest = await fileDb.addItem(guest);
    return res.send(savedGuest);
  });

export default guestsRouter;