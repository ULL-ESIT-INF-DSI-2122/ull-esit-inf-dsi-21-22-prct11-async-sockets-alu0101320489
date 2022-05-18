import * as express from 'express';
import { Deportista } from '../deportista';

export const getDeportistaRouter = express.Router();

/**
 * Busca por nombre
 */
getDeportistaRouter.get('/deportista', async (req, res) => {
  const filter = req.query.nombre ? { nombre: req.query.nombre.toString() } : {};

  try {
    const deportista = await Deportista.find(filter);

    if (deportista.length !== 0) {
      return res.send(deportista);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send();
  }
});

/**
 * Busca por DNI
 */
getDeportistaRouter.get('/deportista', async (req, res) => {
  const filter = req.query.dni ? { NIF: req.query.dni.toString() } : {};
  try {
    const deportista = await Deportista.findById(filter);

    if (!deportista) {
      return res.status(404).send();
    }

    return res.send(deportista);
  } catch (error) {
    return res.status(500).send();
  }
});