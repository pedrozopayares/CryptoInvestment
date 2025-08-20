import { Slice } from "@reduxjs/toolkit";

// Propiedades del componente de tabla
export interface TableProps {
    columns: TableHeadType[];
    data: Array<any>; // TODO : extraer la data del store
    store?: Slice;
  }

// Define tipo para una columna individual
export type TableHeadType = {
    title:string, 
    attribute?:string,
    attributeType?: 'text' | 'boolean' | 'image' | 'link';

    align?: 
    'left' 
    | 'right' 
    | 'center' 
    | 'top' 
    | 'bottom' 
    | 'top-left' 
    | 'top-right' 
    | 'bottom-left' 
    | 'bottom-right';
    className?:string, 
};

