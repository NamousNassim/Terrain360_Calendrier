"use client";

import React, { useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarHeader } from './components/Calendar/CalendarHeader';
import { CalendarNavigation } from './components/Calendar/CalendarNavigation';
import { CalendarSidebar } from './components/Calendar/CalendarSidebar';
import { CalendarMain } from './components/Calendar/CalendarMain';
import { AppointmentModal } from './components/Appointments/AppointmentModal';

import { mockAppointments } from './data/mockData';
import { convertToCalendarEvents, navigateCalendar } from './utils/calendarUtils';
import { Appointment, CalendarView } from './types';

export default function CalendarApp() {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [appointments] = useState<Appointment[]>(mockAppointments);
  const [view, setView] = useState<CalendarView>('week');
  const [date, setDate] = useState(new Date(2024, 8, 23));
  const [showSidebar, setShowSidebar] = useState(true);

  const calendarEvents = convertToCalendarEvents(appointments);

  const handleEventClick = (event: any) => {
    const appointment = event.resource as Appointment;
    setSelectedAppointment(appointment);
  };

  const handleNavigate = (action: 'PREV' | 'NEXT' | 'TODAY') => {
    const newDate = navigateCalendar(action, date, view);
    setDate(newDate);
  };

  const handleDeleteAppointment = (id: number): void => {
    setSelectedAppointment(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CalendarHeader
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />

      <CalendarNavigation
        view={view}
        setView={setView}
        date={date}
        onNavigate={handleNavigate}
      />

      <div className="flex h-[calc(100vh-120px)]">
        <CalendarSidebar
          appointments={appointments}
          showSidebar={showSidebar}
        />

        <CalendarMain
          view={view}
          events={calendarEvents}
          date={date}
          appointments={appointments}
          onView={setView}
          onNavigate={setDate}
          onSelectEvent={handleEventClick}
        />
      </div>

      <AppointmentModal
        appointment={selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
        onDelete={handleDeleteAppointment}
      />

      {/* Enhanced Custom Styles for Better Event Centering */}
      <style jsx global>{`
        /* Reset default calendar styles */
        .rbc-calendar {
          height: 100% !important;
          font-family: inherit !important;
        }
        
        .rbc-toolbar {
          display: none !important;
        }
        
        /* Header styles */
        .rbc-header {
          padding: 12px 8px !important;
          background-color: #f8fafc !important;
          font-weight: 600 !important;
          font-size: 13px !important;
          color: #374151 !important;
          border-bottom: 1px solid #e5e7eb !important;
          text-align: center !important;
        }
        
        /* Time grid styles */
        .rbc-time-view {
          border: 1px solid #e5e7eb !important;
          border-radius: 8px !important;
          overflow: hidden !important;
        }
        
        .rbc-time-header {
          border-bottom: 1px solid #e5e7eb !important;
          background-color: #f8fafc !important;
        }
        
        .rbc-time-content {
          border-top: none !important;
        }
        
        .rbc-time-gutter {
          background-color: #f8fafc !important;
          border-right: 1px solid #e5e7eb !important;
          width: 80px !important;
        }
        
        .rbc-timeslot-group {
          border-bottom: 1px solid #f3f4f6 !important;
          min-height: 50px !important;
        }
        
        .rbc-time-slot {
          border-top: 1px solid #f3f4f6 !important;
          font-size: 12px !important;
          color: #6b7280 !important;
        }
        
        .rbc-label {
          padding: 8px 12px !important;
          font-size: 12px !important;
          color: #6b7280 !important;
          font-weight: 500 !important;
        }
        
        /* Current time indicator */
        .rbc-current-time-indicator {
          background-color: #dc2626 !important;
          height: 2px !important;
          z-index: 10 !important;
        }
        
        /* Event styles for better centering */
        .rbc-event {
          border: none !important;
          background-color: transparent !important;
          box-shadow: none !important;
          padding: 0 !important;
          margin: 2px !important;
          border-radius: 6px !important;
          min-height: 32px !important;
        }
        
        .rbc-event:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
          z-index: 5 !important;
          transform: scale(1.02) !important;
          transition: all 0.2s ease !important;
        }
        
        /* Improved event content layout */
        .rbc-event-content {
          padding: 0 !important;
          height: 100% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          text-align: center !important;
          width: 100% !important;
          overflow: hidden !important;
        }
        
        /* Week view day slots */
        .rbc-day-slot {
          border-right: 1px solid #f3f4f6 !important;
          position: relative !important;
        }
        
        .rbc-day-bg {
          border-right: 1px solid #f3f4f6 !important;
        }
        
        .rbc-day-bg.rbc-today {
          background-color: #f0f9ff !important;
        }
        
        /* Month view styles */
        .rbc-month-view {
          border: 1px solid #e5e7eb !important;
          border-radius: 8px !important;
          overflow: hidden !important;
        }
        
        .rbc-month-row {
          min-height: 120px !important;
          border-bottom: 1px solid #e5e7eb !important;
        }
        
        .rbc-date-cell {
          padding: 8px !important;
          font-size: 14px !important;
          color: #374151 !important;
          font-weight: 500 !important;
        }
        
        .rbc-date-cell.rbc-off-range {
          color: #d1d5db !important;
        }
        
        .rbc-today {
          background-color: #dbeafe !important;
        }
        
        .rbc-date-cell.rbc-today {
          color: #1d4ed8 !important;
          font-weight: 600 !important;
        }
        
        /* Show more link */
        .rbc-show-more {
          color: #2563eb !important;
          font-size: 11px !important;
          font-weight: 500 !important;
          padding: 2px 4px !important;
          text-decoration: none !important;
        }
        
        .rbc-show-more:hover {
          background-color: #e5e7eb !important;
          border-radius: 3px !important;
        }
        
        /* Better event positioning and spacing */
        .rbc-time-content > * > * {
          overflow: visible !important;
        }
        
        .rbc-events-container {
          margin-right: 4px !important;
          padding: 2px !important;
        }
        
        /* Ensure events are properly spaced */
        .rbc-event-overlaps {
          margin-right: 4px !important;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .rbc-time-gutter {
            width: 60px !important;
          }
          
          .rbc-label {
            padding: 4px 8px !important;
            font-size: 11px !important;
          }
          
          .rbc-timeslot-group {
            min-height: 40px !important;
          }
          
          .rbc-event {
            min-height: 28px !important;
          }
        }
      `}</style>
    </div>
  );
}