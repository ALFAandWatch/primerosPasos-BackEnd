import { Router } from 'express';
import {
   loginUsuarioController,
   registrarUsuarioController,
} from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/register', registrarUsuarioController);
authRouter.post('/login', loginUsuarioController);

export default authRouter;
