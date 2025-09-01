import React from 'react';
import { Clock } from 'lucide-react';
import { Appointment } from '../../types';

interface CalendarSidebarProps {
  appointments: Appointment[];
  showSidebar: boolean;
}

export const CalendarSidebar: React.FC<CalendarSidebarProps> = ({
  appointments,
  showSidebar
}) => {
  if (!showSidebar) return null;

  return (
    <div className="w-72 bg-white border-r border-gray-200 p-6 overflow-y-auto">
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Statistiques</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Total</span>
              </div>
              <span className="text-lg font-semibold text-blue-600">{appointments.length}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Confirmés</span>
              </div>
              <span className="text-lg font-semibold text-green-600">
                {appointments.filter(apt => apt.status === 'confirmé').length}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">En attente</span>
              </div>
              <span className="text-lg font-semibold text-yellow-600">
                {appointments.filter(apt => apt.status === 'en attente').length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};