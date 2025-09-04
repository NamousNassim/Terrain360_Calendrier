export interface Appointment {
  id: number;
  appointment_time: string; // ISO datetime string
  status: string; // "a faire", etc.
  company: {
    client_name: string;
    notes: string;
    location: string;
    contact_email: string;
    contact_phone: string;
    id: number;
  };
  agent: {
    username: string;
    email: string;
    id: number;
  };
}