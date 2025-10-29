export const formatearTipoArchivo = (tipo: string) => {
   switch (tipo) {
      case 'contado':
         return 'Recibo Contado';
      case 'credito':
         return 'Recibo Crédito';
      case 'varios':
         return 'Recibos de Pagos Varios';
      case 'dgi':
         return 'Pagos DGI';
      case 'bps':
         return 'Pagos BPS';
      case 'otros':
         return 'Otros recibos';
      case 'pagos':
         return 'Informes de Pago';
      case 'sueldos':
         return 'Informes de Sueldos';
      case 'stock':
         return 'Informes de Stock';
      case 'balances':
         return 'Informes de Balances';
      default:
         return tipo;
   }
};
