'use client';

import React from 'react';
import { Appointment } from '../../types/appointment';
import { formatDate, formatTime, getStatusColor, getStatusLabel } from '../../utils/calendarUtils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Calendar, Clock, MapPin, User, Phone, Mail, FileText } from "lucide-react";

interface AppointmentModalProps {
  appointment: Appointment;
  onClose: () => void;
  onDelete: (id: number) => void;
  open: boolean;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  appointment,
  onClose,
  onDelete,
  open
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Détails du rendez-vous
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-4 w-4" />
                Informations client
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">
                    Nom du client
                  </label>
                  <p className="font-medium">{appointment.company.client_name}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    Lieu
                  </label>
                  <p>{appointment.company.location}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    Email
                  </label>
                  <p className="text-blue-600 hover:underline">
                    <a href={`mailto:${appointment.company.contact_email}`}>
                      {appointment.company.contact_email}
                    </a>
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    Téléphone
                  </label>
                  <p className="text-blue-600 hover:underline">
                    <a href={`tel:${appointment.company.contact_phone}`}>
                      {appointment.company.contact_phone}
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appointment Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Détails du rendez-vous
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">
                    Date et heure
                  </label>
                  <p className="font-medium">
                    {formatDate(appointment.appointment_time)} à {formatTime(appointment.appointment_time)}
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">
                    Statut
                  </label>
                  <Badge className={`${getStatusColor(appointment.status)} border`}>
                    {getStatusLabel(appointment.status)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Agent Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informations agent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">
                    Agent assigné
                  </label>
                  <p className="font-medium">{appointment.agent.username}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">
                    Email de l'agent
                  </label>
                  <p className="text-blue-600">{appointment.agent.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-3 rounded-md">
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {appointment.company.notes}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
          <Button 
            variant="destructive" 
            onClick={() => onDelete(appointment.id)}
          >
            Supprimer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;