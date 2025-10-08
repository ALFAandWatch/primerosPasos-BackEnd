export type movimientoDTO = {
   tipo: 'venta' | 'compra';
   formaPago: 'contado' | 'credito';
   codigo: string;
   precio: number;
   cantidad: number;
   fecha: string;
   usuarioId: number;
};
