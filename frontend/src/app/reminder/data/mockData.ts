import { Appointment } from '../types/appointment';

export const mockAppointments: Appointment[] = [
  {
    id: 1,
    clientName: 'Marie Dubois',
    company: 'TechCorp Solutions',
    date: '2024-12-20',
    startTime: '09:00',
    endTime: '10:00',
    type: 'meeting',
    status: 'confirmed',
    notes: 'Quarterly business review and strategy discussion for Q1 2025.',
    agentId: 1,
    agentName: 'John Smith'
  },
  {
    id: 2,
    clientName: 'Pierre Martin',
    company: 'DataFlow Inc',
    date: '2024-12-20',
    startTime: '14:30',
    endTime: '15:30',
    type: 'call',
    status: 'pending',
    notes: 'Follow-up call regarding the new data analytics platform implementation.',
    agentId: 2,
    agentName: 'Sarah Johnson'
  },
  {
    id: 3,
    clientName: 'Sophie Laurent',
    company: 'Innovation Labs',
    date: '2024-12-21',
    startTime: '11:00',
    endTime: '12:30',
    type: 'presentation',
    status: 'confirmed',
    notes: 'Product demo presentation for the new AI-powered automation tools.',
    agentId: 1,
    agentName: 'John Smith'
  }
];