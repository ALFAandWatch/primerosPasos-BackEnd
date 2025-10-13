import { Router } from 'express';
import {
   loginUsuarioController,
   logoutUsuarioController,
   registrarUsuarioController,
} from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/register', registrarUsuarioController);
authRouter.post('/login', loginUsuarioController);
authRouter.post('/logout', logoutUsuarioController);

export default authRouter;
