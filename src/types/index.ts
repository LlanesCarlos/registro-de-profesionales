export type EstadoPerfil = 'activo' | 'inactivo' | 'pendiente' | 'suspendido';
export type EstadoSolicitud = 'borrador' | 'enviado' | 'aprobado' | 'devuelto' | 'rechazado';
export type TipoNotificacion = 'email' | 'alerta' | 'recordatorio';
export type FrecuenciaNotificacion = 'inmediata' | 'diaria' | 'semanal' | 'mensual';
export type Genero = 'M' | 'F';

export interface PerfilEstudio {
  id: string;
  nivelEstudio: string;
  institucion: string;
  especialidad: string;
  anioFinalizacion: number;
  completado: boolean;
}

export interface PerfilIdioma {
  id: string;
  idioma: string;
  nivelOral: 'básico' | 'intermedio' | 'avanzado' | 'nativo';
  nivelEscrito: 'básico' | 'intermedio' | 'avanzado' | 'nativo';
  activo: boolean;
}

export interface ExperienciaProfesional {
  id: string;
  institucion: string;
  cargo: string;
  sector: string;
  fechaInicio: string;
  fechaFin?: string;
  actual: boolean;
}

export interface PerfilPatrimonial {
  id: string;
  tipo: 'activo' | 'pasivo';
  descripcion: string;
  valor: number;
  moneda: 'EUR' | 'USD';
}

export interface Profesional {
  id: string;
  nombre: string;
  apellido: string;
  ci: string;
  genero: Genero;
  email: string;
  emailLaboral: string;
  celular: string;
  telefono: string;
  cargo: string;
  entidad: string;
  rubro: string;
  direccionLaboral: string;
  direccionParticular: string;
  estadoPerfil: EstadoPerfil;
  tipoVinculo: string;
  perfilAsignado: string;
  fechaAsignacion: string;
  fechaCreacion: string;
  estudios: PerfilEstudio[];
  idiomas: PerfilIdioma[];
  experiencias: ExperienciaProfesional[];
  patrimonial: PerfilPatrimonial[];
}

export interface Perfil {
  id: string;
  nombre: string;
  descripcion: string;
  roles: string[];
  activo: boolean;
  fechaCreacion: string;
  cantidadUsuarios: number;
}

export interface Curso {
  id: string;
  nombre: string;
  duracion: string;
  modalidad: 'presencial' | 'virtual' | 'híbrido';
}

export interface Competencia {
  id: string;
  nombre: string;
  descripcion: string;
  cursos: Curso[];
  activo: boolean;
  fechaCreacion: string;
}

export interface Notificacion {
  id: string;
  asunto: string;
  contenido: string;
  tipo: TipoNotificacion;
  frecuencia: FrecuenciaNotificacion;
  destinatarios: string[];
  activo: boolean;
  fechaCreacion: string;
}

export interface Solicitud {
  id: string;
  nroSolicitud: string;
  solicitante: string;
  entidad: string;
  ci: string;
  cargo: string;
  estado: EstadoSolicitud;
  areas: string[];
  fechaSolicitud: string;
  fechaVencimiento: string;
  observaciones: string;
}
