import express from 'express';
import './mongoose';

import {getDeportistaRouter} from './deportistaRouters/getDeportista';
import {postDeportistaRouter} from './deportistaRouters/postDeportista';
import {deleteDeportistaRouter} from './deportistaRouters/deleteDeportista';
import {patchDeportistaRouter} from './deportistaRouters/patchDeportista';


const app = express();
app.use(express.json());

app.use(postDeportistaRouter);
app.use(getDeportistaRouter);
app.use(patchDeportistaRouter);
app.use(deleteDeportistaRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});