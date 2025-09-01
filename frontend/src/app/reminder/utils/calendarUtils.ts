import { format, parse, startOfWeek, getDay, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import { dateFnsLocalizer } from 'react-big-calendar';
import { Appointment } from '../types';

const locales = { 'fr': fr };

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const convertToCalendarEvents = (appointments: Appointment[]) => {
  return appointments.map(apt => {
    const start = new Date(`${apt.date}T${apt.startTime}`);
    const end = new Date(`${apt.date}T${apt.endTime}`);
    
    return {
      id: apt.id,
      title: apt.clientName,
      start,
      end,
      resource: apt
    };
  });
};

export const navigateCalendar = (
  action: 'PREV' | 'NEXT' | 'TODAY',
  currentDate: Date,
  view: string
): Date => {
  if (action === 'TODAY') return new Date();

  let newDate;
  if (view === 'month') {
    newDate = addDays(currentDate, action === 'PREV' ? -30 : 30);
  } else if (view === 'week') {
    newDate = addDays(currentDate, action === 'PREV' ? -7 : 7);
  } else {
    newDate = addDays(currentDate, action === 'PREV' ? -1 : 1);
  }
  return newDate;
};