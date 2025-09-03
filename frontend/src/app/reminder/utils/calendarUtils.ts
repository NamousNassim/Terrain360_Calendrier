import { format, parse, startOfWeek, getDay, addMonths, subMonths, addWeeks, subWeeks, addDays, subDays } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { View } from 'react-big-calendar';
import { Appointment } from '../types/appointment';

const locales = {
  'en-US': enUS,
};

export const localizer = {
  format: (date: Date, formatStr: string) => format(date, formatStr),
  parse: (str: string, formatStr: string) => parse(str, formatStr, new Date()),
  startOfWeek: (date: Date) => startOfWeek(date),
  getDay: (date: Date) => getDay(date),
  locales
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

export const formatTime = (time: string) => {
  // Convert 24-hour format to 12-hour format
  const [hours, minutes] = time.split(':').map(Number);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

export const convertToCalendarEvents = (appointments: Appointment[]) => {
  return appointments.map((apt) => {
    const start = new Date(`${apt.date}T${apt.startTime}`);
    const end = new Date(`${apt.date}T${apt.endTime}`);
    
    return {
      id: apt.id,
      title: `${apt.clientName} - ${apt.company}`,
      start,
      end,
      resource: apt
    };
  });
};

export const navigateCalendar = (action: string, currentDate: Date, view: View) => {
  if (action === 'TODAY') return new Date();
  
  let newDate;
  if (view === 'month') {
    newDate = action === 'PREV' ? subMonths(currentDate, 1) : addMonths(currentDate, 1);
  } else if (view === 'week') {
    newDate = action === 'PREV' ? subWeeks(currentDate, 1) : addWeeks(currentDate, 1);
  } else {
    newDate = action === 'PREV' ? subDays(currentDate, 1) : addDays(currentDate, 1);
  }
  
  return newDate;
};

export const getAppointmentsByDate = (appointments: Appointment[], date: Date) => {
  const targetDate = date.toISOString().split('T')[0];
  return appointments.filter(apt => apt.date === targetDate);
};

export const getAppointmentsByAgent = (appointments: Appointment[], agentId: number) => {
  return appointments.filter(apt => apt.agentId === agentId);
};

export const getAppointmentsByStatus = (appointments: Appointment[], status: string) => {
  return appointments.filter(apt => apt.status === status);
};