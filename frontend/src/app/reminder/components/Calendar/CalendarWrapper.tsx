import React from 'react';
import { Calendar } from 'react-big-calendar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { localizer } from '../../utils/calendarUtils';
import { Appointment, typeColors, CalendarView } from '../../types';

interface CalendarWrapperProps {
  events: any[];
  view: CalendarView;
  date: Date;
  onView: (view: any) => void;
  onNavigate: (date: Date) => void;
  onSelectEvent: (event: any) => void;
}

const EventComponent = ({ event }: any) => {
  const appointment = event.resource as Appointment;
  return (
    <div
      style={{ 
        backgroundColor: typeColors[appointment.type],
        color: 'white',
        padding: '4px 8px',
        borderRadius: '6px',
        fontSize: '12px',
        lineHeight: '1.2',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: '500',
        border: 'none',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        minHeight: '32px',
        cursor: 'pointer'
      }}
    >
      <div style={{ 
        fontWeight: '600', 
        marginBottom: '2px', 
        fontSize: '13px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        width: '100%'
      }}>
        {appointment.company}
      </div>
      <div style={{ 
        fontSize: '11px', 
        opacity: 0.95,
        fontWeight: '400'
      }}>
        {appointment.startTime}
      </div>
    </div>
  );
};

export const CalendarWrapper: React.FC<CalendarWrapperProps> = ({
  events,
  view,
  date,
  onView,
  onNavigate,
  onSelectEvent
}) => {
  if (view === 'agenda') return null;

  return (
    <div className="p-4 h-full calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        culture="fr"
        date={date}
        view={view as any}
        onView={onView}
        onNavigate={onNavigate}
        views={['month', 'week', 'day']}
        formats={{
          dayHeaderFormat: (date: Date) => format(date, 'EEEE d', { locale: fr }),
          timeGutterFormat: (date: Date) => format(date, 'HH:mm', { locale: fr }),
          dayFormat: (date: Date) => format(date, 'EEEE d', { locale: fr }),
          monthHeaderFormat: (date: Date) => format(date, 'MMMM yyyy', { locale: fr })
        }}
        min={new Date(2024, 8, 23, 7, 0)}
        max={new Date(2024, 8, 23, 20, 0)}
        onSelectEvent={onSelectEvent}
        components={{
          event: EventComponent
        }}
        step={30}
        timeslots={2}
        eventPropGetter={() => ({
          style: {
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '6px',
            padding: '2px',
            margin: '2px'
          }
        })}
        dayLayoutAlgorithm="no-overlap"
        showMultiDayTimes
        popup={false}
      />
    </div>
  );
};