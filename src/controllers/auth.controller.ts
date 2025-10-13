import { Request, Response } from 'express';
import {
   loginUsuarioService,
   registrarUsuarioService,
} from '../services/auth.service';

export const registrarUsuarioController = async (
   req: Request,
   res: Response
) => {
   try {
      const {
         rol,
         nombreEmpresa,
         nombreTitular,
         cedula,
         domicilio,
         telefono,
         rut,
         actividad,
         email,
         password,
      } = req.body;

      if (!rol || !nombreTitular || !email || !password) {
         res.status(400).json({ message: 'Campos obligatorios faltantes' });
         return;
      }

      const dataUsuario = {
         rol,
         nombreEmpresa,
         nombreTitular,
         cedula,
         domicilio,
         telefono,
         rut,
         actividad,
      };
      const dataCredencial = {
         email,
         password,
      };

      const nuevaEmpresa = await registrarUsuarioService(
         dataUsuario,
         dataCredencial
      );
      res.status(201).json({
         message: 'Empresa registrada exitosamente',
         empresa: nuevaEmpresa,
      });
   } catch (error: any) {
      if (error.message === 'El email ya está registrado') {
         res.status(409).json({ message: error.message });
         return;
      }
      res.status(500).json({
         message: 'Error al registrar la empresa',
         error: error.message || error,
      });
   }
};

export const loginUsuarioController = async (req: Request, res: Response) => {
   try {
      const { email, password } = req.body;

      if (!email || !password) {
         res.status(400).json({
            message: 'Email y contraseña son obligatorios',
         });
         return;
      }

      const dataLogin = { email, password };

      const loginExistoso = await loginUsuarioService(dataLogin);

      res.cookie('token', loginExistoso.token, {
         httpOnly: true, // evita acceso desde JS del frontend
         secure: process.env.NODE_ENV === 'production',
         sameSite: 'strict',
         maxAge: 24 * 60 * 60 * 1000, // 1 día
      });

      const { credencial, ...usuarioSinPassword } = loginExistoso.usuario;

      res.status(200).json({
         message: loginExistoso.message,
         usuario: usuarioSinPassword,
      });
   } catch (error: any) {
      res.status(401).json({ message: 'Email o contraseña incorrectos' });
   }
};

export const logoutUsuarioController = (req: Request, res: Response) => {
   res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
   });
   res.status(200).json({ message: 'Logout exitoso' });
};
