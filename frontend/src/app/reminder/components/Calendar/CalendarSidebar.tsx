'use client';

import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Appointment } from '../../types/appointment';
import { getStatusColor, getStatusLabel, formatTime } from '../../utils/calendarUtils';

interface CalendarSidebarProps {
  appointments: Appointment[];
  showSidebar: boolean;
  onToggleSidebar: () => void;
}

const CalendarSidebar: React.FC<CalendarSidebarProps> = ({
  appointments,
  showSidebar,
  onToggleSidebar
}) => {
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];
  
  const todayAppointments = appointments.filter(apt => {
    const appointmentDate = new Date(apt.appointment_time).toISOString().split('T')[0];
    return appointmentDate === todayString;
  });

  const upcomingAppointments = appointments
    .filter(apt => new Date(apt.appointment_time) >= today)
    .sort((a, b) => new Date(a.appointment_time).getTime() - new Date(b.appointment_time).getTime())
    .slice(0, 8);

  if (!showSidebar) {
    return (
      <button
        onClick={onToggleSidebar}
        className="fixed left-4 top-4 z-10 bg-white p-2 rounded-lg shadow-md border hover:bg-gray-50"
        aria-label="Ouvrir la barre latérale"
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
        <h2 className="text-lg font-semibold text-gray-900">Rendez-vous</h2>
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg"
          aria-label="Fermer la barre latérale"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Today's Appointments */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
          Planning d'aujourd'hui ({todayAppointments.length})
        </h3>
        {todayAppointments.length > 0 ? (
          <div className="space-y-2">
            {todayAppointments.map((apt) => (
              <div
                key={apt.id}
                className="p-3 rounded-lg border-l-4 border-l-blue-500 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-gray-900 text-sm">{apt.company.client_name}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(apt.status)}`}>
                    {getStatusLabel(apt.status)}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-1">{apt.company.location}</p>
                <p className="text-xs text-gray-500 font-medium">{formatTime(apt.appointment_time)}</p>
                <p className="text-xs text-gray-400 mt-1">Agent : {apt.agent.username}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-12 h-12 mx-auto mb-2 text-gray-300">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
              </svg>
            </div>
            <p className="text-sm text-gray-500">Aucun rendez-vous aujourd'hui</p>
          </div>
        )}
      </div>

      {/* Upcoming Appointments */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          Prochains rendez-vous
        </h3>
        <div className="space-y-2">
          {upcomingAppointments.map((apt) => (
            <div
              key={apt.id}
              className="p-3 rounded-lg border-l-4 border-l-green-500 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-medium text-gray-900 text-sm">{apt.company.client_name}</h4>
                <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(apt.status)}`}>
                  {getStatusLabel(apt.status)}
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-1">{apt.company.location}</p>
              <p className="text-xs text-gray-500">
                {format(new Date(apt.appointment_time), 'dd MMM • HH:mm', { locale: fr })}
              </p>
              <p className="text-xs text-gray-400 mt-1">Agent : {apt.agent.username}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 pt-6 border-t">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Statuts</h3>
        <div className="space-y-2">
          <div className="flex items-center text-xs">
            <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
            <span>À faire</span>
          </div>
          <div className="flex items-center text-xs">
            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
            <span>Confirmé</span>
          </div>
          <div className="flex items-center text-xs">
            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
            <span>Terminé</span>
          </div>
          <div className="flex items-center text-xs">
            <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
            <span>Annulé</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarSidebar;