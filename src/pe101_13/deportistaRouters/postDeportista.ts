import * as express from 'express';
import { Deportista } from '../deportista';

export const postDeportistaRouter = express.Router();

/* Crear un nuevo deportista y guardarlo en la base de datos. */
postDeportistaRouter.post('/deportista', async (req, res) => {
  const deportista = new Deportista(req.body);

  try {
    await deportista.save();
    res.status(201).send(deportista);
  } catch (error) {
    res.status(400).send(error);
  }
});