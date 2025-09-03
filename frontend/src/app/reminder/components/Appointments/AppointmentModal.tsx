'use client';

import React from 'react';
import { Appointment } from '../../types/appointment';
import { formatDate, formatTime } from '../../utils/calendarUtils';

interface AppointmentModalProps {
  appointment: Appointment;
  onClose: () => void;
  onDelete: (id: number) => void;
}

const statusColors = {
  confirmed: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-red-100 text-red-800'
};

const statusLabels = {
  confirmed: 'Confirmé',
  pending: 'En attente',
  completed: 'Terminé',
  cancelled: 'Annulé'
};

const typeColors = {
  meeting: '#3B82F6',
  call: '#10B981',
  presentation: '#F59E0B',
  consultation: '#8B5CF6'
};

const typeLabels = {
  meeting: 'Réunion',
  call: 'Appel',
  presentation: 'Présentation',
  consultation: 'Consultation'
};

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  appointment,
  onClose,
  onDelete
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Détails du rendez-vous</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-6">
            {/* Client Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Informations client</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom du client</label>
                  <p className="text-gray-900 font-medium">{appointment.clientName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
                  <p className="text-gray-900">{appointment.company}</p>
                </div>
                {appointment.contactEmail && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-900">{appointment.contactEmail}</p>
                  </div>
                )}
                {appointment.contactPhone && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                    <p className="text-gray-900">{appointment.contactPhone}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Appointment Details */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Détails du rendez-vous</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <p className="text-gray-900 font-medium">{formatDate(appointment.date)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Heure</label>
                  <p className="text-gray-900 font-medium">
                    {formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <span 
                    className="inline-block px-4 py-2 rounded-lg text-white font-semibold capitalize"
                    style={{ backgroundColor: typeColors[appointment.type] }}
                  >
                    {typeLabels[appointment.type]}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize ${statusColors[appointment.status]} mt-1`}>
                    {statusLabels[appointment.status]}
                  </span>
                </div>
                {appointment.location && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lieu</label>
                    <p className="text-gray-900">{appointment.location}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Agent Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Informations agent</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Agent assigné</label>
                <p className="text-gray-900 font-medium">{appointment.agentName}</p>
              </div>
            </div>

            {/* Notes */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Notes</h3>
              <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{appointment.notes}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;