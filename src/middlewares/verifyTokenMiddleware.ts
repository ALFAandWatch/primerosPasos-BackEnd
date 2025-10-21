import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'mi_secreto';

export const verifyToken = (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   // Obtener el token desde las cookies
   const token = req.cookies?.token;

   if (!token) {
      return res.status(401).json({
         message: 'Acceso denegado. No se encontró token en las cookies.',
      });
   }

   try {
      const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
      (req as any).user = decoded; // guardamos los datos del token en req.user
      next();
   } catch (err) {
      console.error('Error al verificar el token:', err);
      return res.status(403).json({ message: 'Token inválido o expirado.' });
   }
};
