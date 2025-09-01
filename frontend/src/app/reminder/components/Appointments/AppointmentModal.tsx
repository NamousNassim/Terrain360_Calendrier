import React from 'react';
import { X, Edit, Trash2, Phone, Mail, MapPin, User } from 'lucide-react';
import { Appointment, typeColors, statusColors } from '../../types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface AppointmentModalProps {
  appointment: Appointment | null;
  onClose: () => void;
  onDelete: (id: number) => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  appointment,
  onClose,
  onDelete
}) => {
  if (!appointment) return null;

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: typeColors[appointment.type] }}
              >
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Détails du rendez-vous
                </h3>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[appointment.status]} mt-1`}>
                  {appointment.status}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Client</label>
                <p className="text-gray-900 font-medium">{appointment.clientName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Entreprise</label>
                <p className="text-gray-900 font-medium">{appointment.company}</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Type de rendez-vous</label>
              <span
                className="inline-block px-4 py-2 rounded-lg text-white font-medium"
                style={{ backgroundColor: typeColors[appointment.type] }}
              >
                {appointment.type}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Date</label>
                <p className="text-gray-900 font-medium">
                  {formatDate(appointment.date)}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Horaires</label>
                <p className="text-gray-900 font-medium">
                  {appointment.startTime} - {appointment.endTime}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900 font-medium">{appointment.phone}</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900 font-medium">{appointment.email}</span>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                <span className="text-gray-900 font-medium">{appointment.location}</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Notes</label>
              <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                {appointment.notes}
              </p>
            </div>

            <div className="flex space-x-3 pt-6">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2">
                <Edit className="w-4 h-4" />
                <span>Modifier</span>
              </button>
              <button
                onClick={() => onDelete(appointment.id)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Supprimer</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};