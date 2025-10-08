import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'mi_secreto'; // deberías usar .env

export const verifyToken = (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(' ')[1]; // extrae el token después de "Bearer"

   if (!token) {
      res.status(401).json({
         message: 'Acceso denegado. No se encontró token.',
      });
      return;
   }

   try {
      const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
      (req as any).user = decoded; // guardamos los datos del token en req.user
      next();
   } catch (err) {
      res.status(403).json({ message: 'Token inválido o expirado.' });
      return;
   }
};
