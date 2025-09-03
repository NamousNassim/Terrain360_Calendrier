'use client';

import React from 'react';
import { format } from 'date-fns';
import { Appointment } from '../../types/appointment';

interface CalendarSidebarProps {
  appointments: Appointment[];
  showSidebar: boolean;
  onToggleSidebar: () => void;
}

const statusColors = {
  confirmed: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-red-100 text-red-800'
};

const typeColors = {
  meeting: 'border-l-blue-500',
  call: 'border-l-green-500',
  presentation: 'border-l-yellow-500',
  consultation: 'border-l-purple-500'
};

const CalendarSidebar: React.FC<CalendarSidebarProps> = ({
  appointments,
  showSidebar,
  onToggleSidebar
}) => {
  const today = new Date();
  const todayAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.date);
    return aptDate.toDateString() === today.toDateString();
  });

  const upcomingAppointments = appointments
    .filter(apt => new Date(apt.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 8);

  if (!showSidebar) {
    return (
      <button
        onClick={onToggleSidebar}
        className="fixed left-4 top-4 z-10 bg-white p-2 rounded-lg shadow-md border hover:bg-gray-50"
        aria-label="Open sidebar"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    );
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Appointments</h2>
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg"
          aria-label="Close sidebar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Today's Appointments */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Today's Schedule</h3>
        {todayAppointments.length > 0 ? (
          <div className="space-y-2">
            {todayAppointments.map((apt) => (
              <div
                key={apt.id}
                className={`p-3 rounded-lg border-l-4 bg-gray-50 hover:bg-gray-100 transition-colors ${typeColors[apt.type]}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-gray-900 text-sm">{apt.clientName}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${statusColors[apt.status]}`}>
                    {apt.status}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-1">{apt.company}</p>
                <p className="text-xs text-gray-500 font-medium">{apt.startTime} - {apt.endTime}</p>
                <p className="text-xs text-gray-400 mt-1">Agent: {apt.agentName}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">No appointments today</p>
        )}
      </div>

      {/* Upcoming Appointments */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Upcoming Appointments</h3>
        <div className="space-y-2">
          {upcomingAppointments.map((apt) => (
            <div
              key={apt.id}
              className={`p-3 rounded-lg border-l-4 bg-gray-50 hover:bg-gray-100 transition-colors ${typeColors[apt.type]}`}
            >
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-medium text-gray-900 text-sm">{apt.clientName}</h4>
                <span className={`px-2 py-1 text-xs rounded-full ${statusColors[apt.status]}`}>
                  {apt.status}
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-1">{apt.company}</p>
              <p className="text-xs text-gray-500">
                {format(new Date(apt.date), 'MMM dd')} • {apt.startTime} - {apt.endTime}
              </p>
              <p className="text-xs text-gray-400 mt-1">Agent: {apt.agentName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarSidebar;