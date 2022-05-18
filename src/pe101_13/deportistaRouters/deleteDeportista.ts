import * as express from 'express';
import { Deportista } from '../deportista';

export const deleteDeportistaRouter = express.Router();


/* Esta es una ruta que elimina un deportista por DNI. */
deleteDeportistaRouter.delete('/deportista', async (req, res) => {
  if (!req.query.dni) {
    return res.status(400).send({
      error: 'Se debe proporcionar DNI',
    });
  }
  try {
    const deportista =await Deportista.findOneAndDelete({ NIF: req.query.dni.toString() });

    if (!deportista) {
      return res.status(404).send();
    }

    return res.send(deportista);
  } catch (error) {
    return res.status(400).send();
  }
});