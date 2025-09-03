export interface Appointment {
  id: number;
  clientName: string;
  company: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'meeting' | 'call' | 'presentation' | 'consultation';
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  notes: string;
  agentId: number;
  agentName: string;
}