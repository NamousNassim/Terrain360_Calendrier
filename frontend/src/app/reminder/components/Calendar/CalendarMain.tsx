import React from 'react';
import { CalendarWrapper } from './CalendarWrapper';
import { Appointment, statusColors, typeColors, CalendarView } from '../../types';
import { format } from 'date-fns';

interface CalendarMainProps {
  view: CalendarView;
  events: any[];
  date: Date;
  appointments: Appointment[];
  onView: (view: any) => void;
  onNavigate: (date: Date) => void;
  onSelectEvent: (event: any) => void;
}

export const CalendarMain: React.FC<CalendarMainProps> = ({
  view,
  events,
  date,
  appointments,
  onView,
  onNavigate,
  onSelectEvent
}) => {
  if (view === 'agenda') {
    return (
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Agenda</h2>
          <div className="space-y-4">
            {appointments.map(apt => (
              <div key={apt.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="w-16 text-sm font-medium text-gray-500">
                  {apt.startTime}
                </div>
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: typeColors[apt.type] }}
                ></div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{apt.clientName} - {apt.company}</div>
                  <div className="text-sm text-gray-500">{apt.type}</div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[apt.status]}`}>
                  {apt.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full overflow-hidden">
        <CalendarWrapper
          events={events}
          view={view}
          date={date}
          onView={onView}
          onNavigate={onNavigate}
          onSelectEvent={onSelectEvent}
        />
      </div>
    </div>
  );
};