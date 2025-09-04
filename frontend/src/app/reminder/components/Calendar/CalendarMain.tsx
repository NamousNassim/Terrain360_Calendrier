'use client';

import React from 'react';
import { Calendar, dateFnsLocalizer, View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Appointment } from '../../types/appointment';

const locales = {
  'fr-FR': fr,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface CalendarMainProps {
  events: any[];
  date: Date;
  view: View;
  appointments: Appointment[];
  onView: (view: View) => void;
  onNavigate: (date: Date) => void;
  onSelectEvent: (event: any) => void;
}

const getStatusColor = (status: string) => {
  const colors = {
    'a faire': '#F59E0B', // yellow
    'fait': '#10B981', // green
    'confirme': '#3B82F6', // blue
    'annule': '#EF4444' // red
  };
  return colors[status as keyof typeof colors] || '#6B7280';
};

const CalendarMain: React.FC<CalendarMainProps> = ({
  events,
  date,
  view,
  onView,
  onNavigate,
  onSelectEvent
}) => {
  const EventComponent = ({ event }: { event: any }) => {
    const appointment = event.resource as Appointment;
    return (
      <div 
        className="text-white text-xs p-1 rounded cursor-pointer"
        style={{ 
          backgroundColor: getStatusColor(appointment.status),
          height: '100%'
        }}
      >
        <div className="font-medium truncate">{appointment.company.client_name}</div>
        <div className="text-xs opacity-90 truncate">{appointment.company.location}</div>
        <div className="text-xs opacity-80">
          {new Date(appointment.appointment_time).toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 p-6">
      <div className="bg-white rounded-lg shadow-sm border h-full">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold text-gray-900">Calendrier des Agents</h1>
          <p className="text-gray-600">Gérer et visualiser tous les rendez-vous</p>
        </div>
        
        <div className="p-4 h-full">
          <Calendar
            localizer={localizer}
            events={events}
            date={date}
            view={view}
            onView={onView}
            onNavigate={onNavigate}
            onSelectEvent={onSelectEvent}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 'calc(100% - 80px)' }}
            components={{
              event: EventComponent
            }}
            eventPropGetter={(event) => ({
              style: {
                backgroundColor: getStatusColor(event.resource.status),
                borderColor: getStatusColor(event.resource.status),
                color: 'white'
              }
            })}
            popup
            views={['month', 'week', 'day']}
            step={30}
            showMultiDayTimes
            selectable={false}
            toolbar={true}
            messages={{
              next: "Suivant",
              previous: "Précédent",
              today: "Aujourd'hui",
              month: "Mois",
              week: "Semaine",
              day: "Jour",
              agenda: "Agenda"
            }}
            culture="fr-FR"
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarMain;