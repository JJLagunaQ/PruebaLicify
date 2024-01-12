export interface Project {
    _id: string;
    nombre: string;
    fechaInicio: string;
    fechaFinal: string;
    imagenes: String[];
    items: string[];
    valorUnitario: number;
    createdAt?: Date;
}

export interface FormProject {
  nombre: string;
  fechaInicio: Date | string;
  fechaFinal: Date | string;
  items: string;
  valorUnitario: number;
  imagenes: String[];
}
