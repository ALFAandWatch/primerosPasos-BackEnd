import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export const verifyAdmin = (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const user = (req as any).user as JwtPayload;

   if (!user) {
      res.status(401).json({ message: 'Usuario no autenticado' });
      return;
   }

   if (user.rol !== 'Admin') {
      res.status(403).json({ message: 'Acceso solo para administradores' });
      return;
   }

   next();
};
