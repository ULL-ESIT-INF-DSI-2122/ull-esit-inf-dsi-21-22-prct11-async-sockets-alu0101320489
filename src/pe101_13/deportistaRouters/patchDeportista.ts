import * as express from 'express';
import { Deportista } from '../deportista';

export const patchDeportistaRouter = express.Router();



patchDeportistaRouter.patch('/deportista', async (req, res) => {
  if (!req.query.dni) {
    return res.status(400).send({
      error: 'Se debe proporcionar un dni',
    });
  }

  const allowedUpdates = ['nombre', 'apellidos', 'NIF', 'edad', 'deporte', 'prueba', 'PB'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
    actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update is not permitted',
    });
  }
  try {
    const deportista = await Deportista.findByIdAndUpdate({ NIF: req.query.dni.toString() }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!deportista) {
      return res.status(404).send();
    }

    return res.send(deportista);
  } catch (error) {
    return res.status(400).send(error);
  }
});