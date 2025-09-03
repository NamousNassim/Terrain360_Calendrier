'use client';

import { useState } from 'react';
import { Calendar, dateFnsLocalizer, View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import CalendarMain from './components/Calendar/CalendarMain';
import CalendarSidebar from './components/Calendar/CalendarSidebar';
import AppointmentModal from './components/Appointments/AppointmentModal';// Fixed path - go up one level
import { mockAppointments } from './data/mockData';
import { Appointment } from './types/appointment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './styles/calendar.css'
import { convertToCalendarEvents, navigateCalendar } from './utils/calendarUtils';

export default function CalendarApp() {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [appointments] = useState<Appointment[]>(mockAppointments);
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<View>('month');
  const [showSidebar, setShowSidebar] = useState(true);

  const calendarEvents = convertToCalendarEvents(appointments);

  const handleEventClick = (event: any) => {
    const appointment = event.resource;
    setSelectedAppointment(appointment);
  };

  const handleNavigate = (action: string) => {
    const newDate = navigateCalendar(action, date, view);
    setDate(newDate);
  };

  const handleDeleteAppointment = (id: number) => {
    setSelectedAppointment(null);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <CalendarSidebar 
        appointments={appointments}
        showSidebar={showSidebar}
        onToggleSidebar={() => setShowSidebar(!showSidebar)}
      />
      
      {/* Main Calendar */}
      <div className="flex-1 flex flex-col">
        <CalendarMain
          events={calendarEvents}
          date={date}
          view={view}
          appointments={appointments}
          onView={setView}
          onNavigate={setDate}
          onSelectEvent={handleEventClick}
        />
      </div>

      {/* Appointment Modal */}
      {selectedAppointment && (
        <AppointmentModal
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          onDelete={handleDeleteAppointment}
        />
      )}
    </div>
  );
}