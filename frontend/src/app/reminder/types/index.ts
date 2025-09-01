export interface Appointment {
  id: number;
  title: string;
  clientName: string;
  company: string;
  date: string;
  startTime: string;
  endTime: string;
  phone: string;
  email: string;
  type: AppointmentType;
  status: AppointmentStatus;
  notes: string;
  location: string;
}

export type AppointmentType = 'Consultation' | 'Suivi' | 'Première consultation' | 'Négociation' | 'Formation';
export type AppointmentStatus = 'confirmé' | 'en attente' | 'annulé';
export type CalendarView = 'month' | 'week' | 'day' | 'agenda';

export const typeColors: Record<AppointmentType, string> = {
  'Consultation': '#10b981',
  'Suivi': '#f59e0b',
  'Première consultation': '#8b5cf6',
  'Négociation': '#3b82f6',
  'Formation': '#6366f1'
};

export const statusColors: Record<AppointmentStatus, string> = {
  'confirmé': 'bg-green-100 text-green-800',
  'en attente': 'bg-yellow-100 text-yellow-800',
  'annulé': 'bg-red-100 text-red-800'
};