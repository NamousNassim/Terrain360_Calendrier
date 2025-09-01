import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfWeek } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarView } from '../../types';

interface CalendarNavigationProps {
  view: CalendarView;
  setView: (view: CalendarView) => void;
  date: Date;
  onNavigate: (action: 'PREV' | 'NEXT' | 'TODAY') => void;
}

export const CalendarNavigation: React.FC<CalendarNavigationProps> = ({
  view,
  setView,
  date,
  onNavigate
}) => {
  const getHeaderTitle = () => {
    switch (view) {
      case 'month':
        return format(date, 'MMMM yyyy', { locale: fr });
      case 'week':
        return `Semaine du ${format(startOfWeek(date), 'd MMMM', { locale: fr })}`;
      case 'day':
        return format(date, 'EEEE d MMMM yyyy', { locale: fr });
      default:
        return 'Agenda';
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => onNavigate('TODAY')}
          >
            Aujourd'hui
          </button>
          <div className="flex items-center space-x-1">
            <button 
              className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => onNavigate('PREV')}
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button 
              className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => onNavigate('NEXT')}
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <h2 className="text-lg font-medium text-gray-700">
            {getHeaderTitle()}
          </h2>
        </div>
        
        <div className="flex items-center space-x-2">
          {(['day', 'week', 'month', 'agenda'] as CalendarView[]).map((viewType) => (
            <button 
              key={viewType}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                view === viewType 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setView(viewType)}
            >
              {viewType === 'day' ? 'Jour' : 
               viewType === 'week' ? 'Semaine' : 
               viewType === 'month' ? 'Mois' : 'Agenda'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};