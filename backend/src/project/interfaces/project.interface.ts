import { Document } from 'mongoose';
export interface Project extends Document {
  nombre: string;
  fechaInicio: string;
  fechaFinal: string;
  imagenes: string[];
  items: string[];
  valorUnitario: number;
  createdAt: Date;
}
