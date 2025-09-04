import { Appointment } from '../types/appointment';

// Get API base URL from environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const APPOINTMENTS_ENDPOINT = process.env.NEXT_PUBLIC_API_APPOINTMENTS_ENDPOINT || '/api/appointments';

export const fetchUserAppointments = async (token: string): Promise<Appointment[]> => {
  try {
    const url = `${API_BASE_URL}${APPOINTMENTS_ENDPOINT}`;
    console.log('Fetching appointments from:', url); // For debugging
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('401: Unauthorized');
      }
      throw new Error(`HTTP ${response.status}: Failed to fetch appointments`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

export const deleteAppointment = async (token: string, appointmentId: number): Promise<void> => {
  try {
    const url = `${API_BASE_URL}${APPOINTMENTS_ENDPOINT}/${appointmentId}`;
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete appointment: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting appointment:', error);
    throw error;
  }
};

export const updateAppointmentStatus = async (
  token: string, 
  appointmentId: number, 
  status: string
): Promise<void> => {
  try {
    const url = `${API_BASE_URL}${APPOINTMENTS_ENDPOINT}/${appointmentId}`;
    
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update appointment: ${response.status}`);
    }
  } catch (error) {
    console.error('Error updating appointment:', error);
    throw error;
  }
};