import { Schema } from 'mongoose';

export const ProjectSchema = new Schema({
  nombre: { type: String, required: true },
  fechaInicio: { type: String, required: true },
  fechaFinal: { type: String, required: true },
  items: Array<string>,
  valorUnitario: { type: Number, required: true },
  imagenes: Array<string>,
  createdAt: { type: Date, default: Date.now },
});
