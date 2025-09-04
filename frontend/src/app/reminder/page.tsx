'use client';

import { useState } from 'react';
import { View } from 'react-big-calendar';
import CalendarMain from './components/Calendar/CalendarMain';
import CalendarSidebar from './components/Calendar/CalendarSidebar';
import AppointmentModal from './components/Appointments/AppointmentModal';
import { Appointment } from './types/appointment';
import { convertToCalendarEvents } from './utils/calendarUtils';
import { useAppointments } from './hooks/useAppointments';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './styles/calendar.css';

export default function CalendarApp() {
  const { appointments, loading, error, refreshAppointments } = useAppointments();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<View>('month');
  const [showSidebar, setShowSidebar] = useState(true);

  const calendarEvents = convertToCalendarEvents(appointments);

  const handleEventClick = (event: any) => {
    const appointment = event.resource;
    setSelectedAppointment(appointment);
  };

  const handleDeleteAppointment = (id: number) => {
    console.log('Deleting appointment with ID:', id);
    setSelectedAppointment(null);
    // TODO: Implement actual deletion via API
    refreshAppointments();
  };

  const handleCloseModal = () => {
    setSelectedAppointment(null);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Chargement des rendez-vous...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={refreshAppointments}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar for appointments overview */}
      <CalendarSidebar 
        appointments={appointments}
        showSidebar={showSidebar}
        onToggleSidebar={() => setShowSidebar(!showSidebar)}
      />
      
      {/* Main calendar view */}
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

      {/* Modal for appointment details */}
      {selectedAppointment && (
        <AppointmentModal
          appointment={selectedAppointment}
          onClose={handleCloseModal}
          onDelete={handleDeleteAppointment}
          open={!!selectedAppointment}
        />
      )}
    </div>
  );
}