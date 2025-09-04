import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Appointment } from '../types/appointment';
import { fetchUserAppointments } from '../utils/apiUtils';

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        // Check if user is logged in
        const token = localStorage.getItem('access_token');
        if (!token) {
          router.push('/login');
          return;
        }

        setLoading(true);
        setError(null);
        
        const apiAppointments = await fetchUserAppointments(token);
        setAppointments(apiAppointments);
        
        console.log(`Loaded ${apiAppointments.length} appointments`);
      } catch (err) {
        console.error('Error loading appointments:', err);
        
        if (err instanceof Error) {
          if (err.message.includes('401')) {
            // Token is invalid, redirect to login
            localStorage.removeItem('access_token');
            localStorage.removeItem('user_data');
            router.push('/login');
            return;
          }
          setError(`Erreur lors du chargement des rendez-vous: ${err.message}`);
        } else {
          setError('Erreur lors du chargement des rendez-vous');
        }
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, [router]);

  const refreshAppointments = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      setError(null);
      const apiAppointments = await fetchUserAppointments(token);
      setAppointments(apiAppointments);
      console.log('Appointments refreshed successfully');
    } catch (err) {
      console.error('Error refreshing appointments:', err);
      if (err instanceof Error && err.message.includes('401')) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_data');
        router.push('/login');
      }
    }
  };

  return {
    appointments,
    loading,
    error,
    refreshAppointments
  };
};