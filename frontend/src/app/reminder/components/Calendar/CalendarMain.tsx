'use client';

import React from 'react';
import { Calendar, dateFnsLocalizer, View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Appointment } from '../../types/appointment';

const locales = {
  'en-US': enUS,
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

const typeColors = {
  meeting: '#3B82F6',
  call: '#10B981',
  presentation: '#F59E0B',
  consultation: '#8B5CF6'
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
    const appointment = event.resource;
    return (
      <div 
        className="text-white text-xs p-1 rounded cursor-pointer"
        style={{ 
          backgroundColor: typeColors[appointment.type],
          height: '100%'
        }}
      >
        <div className="font-medium">{appointment.clientName}</div>
        <div className="text-xs opacity-90">{appointment.company}</div>
        <div className="text-xs opacity-80">{appointment.startTime}</div>
      </div>
    );
  };

  return (
    <div className="flex-1 p-6">
      <div className="bg-white rounded-lg shadow-sm border h-full">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold text-gray-900">Agent Calendar</h1>
          <p className="text-gray-600">Manage and view all appointments</p>
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
                backgroundColor: typeColors[event.resource.type],
                borderColor: typeColors[event.resource.type],
                color: 'white'
              }
            })}
            popup
            views={['month', 'week', 'day']}
            step={30}
            showMultiDayTimes
            selectable={false}
            toolbar={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarMain;