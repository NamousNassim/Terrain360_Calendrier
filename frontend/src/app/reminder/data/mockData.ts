import { Appointment } from '../types/appointment';

// Helper function to get dates relative to today
const getDateString = (daysFromToday: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);
  return date.toISOString().split('T')[0];
};

export const mockAppointments: Appointment[] = [
  {
    id: 1,
    clientName: 'Marie Dubois',
    company: 'Solutions TechCorp',
    date: getDateString(0), // Aujourd'hui
    startTime: '09:00',
    endTime: '10:00',
    type: 'meeting',
    status: 'confirmed',
    notes: 'Revue trimestrielle des affaires et discussion stratégique pour le T1 2025. Préparer les rapports financiers et les projections de croissance.',
    agentId: 1,
    agentName: 'Jean Dupont',
    location: 'Salle de conférence A',
    contactEmail: 'marie.dubois@techcorp.com',
    contactPhone: '+33 1 23 45 67 89'
  },
  {
    id: 2,
    clientName: 'Pierre Martin',
    company: 'DataFlow Inc',
    date: getDateString(0), // Aujourd'hui
    startTime: '14:30',
    endTime: '15:30',
    type: 'call',
    status: 'pending',
    notes: 'Appel de suivi concernant la mise en œuvre de la nouvelle plateforme d\'analyse de données. Le client a des questions sur l\'intégration.',
    agentId: 2,
    agentName: 'Sophie Moreau',
    location: 'Virtuel - Zoom',
    contactEmail: 'p.martin@dataflow.com',
    contactPhone: '+33 1 23 45 67 90'
  },
  {
    id: 3,
    clientName: 'Sophie Laurent',
    company: 'Laboratoires Innovation',
    date: getDateString(1), // Demain
    startTime: '11:00',
    endTime: '12:30',
    type: 'presentation',
    status: 'confirmed',
    notes: 'Présentation de démonstration produit pour les nouveaux outils d\'automatisation basés sur l\'IA. Préparer l\'environnement de démonstration et les supports de présentation.',
    agentId: 1,
    agentName: 'Jean Dupont',
    location: 'Bureau client - Centre-ville',
    contactEmail: 'sophie@laboratoiresinnovation.com',
    contactPhone: '+33 1 23 45 67 91'
  },
  {
    id: 4,
    clientName: 'Lucas Bernard',
    company: 'StartupX',
    date: getDateString(2), // Après-demain
    startTime: '10:00',
    endTime: '11:00',
    type: 'consultation',
    status: 'confirmed',
    notes: 'Consultation initiale pour la stratégie de transformation numérique. Nouveau client - première réunion pour comprendre les exigences.',
    agentId: 3,
    agentName: 'Michel Leroy',
    location: 'Salle de conférence B',
    contactEmail: 'lucas@startupx.io',
    contactPhone: '+33 1 23 45 67 92'
  },
  {
    id: 5,
    clientName: 'Emma Moreau',
    company: 'Dynamiques Globales',
    date: getDateString(3), // Dans 3 jours
    startTime: '16:00',
    endTime: '17:00',
    type: 'meeting',
    status: 'completed',
    notes: 'Négociation de contrat et discussion des termes terminée avec succès. Actions de suivi assignées.',
    agentId: 2,
    agentName: 'Sophie Moreau',
    location: 'Salle de conférence C',
    contactEmail: 'emma.moreau@dynamiquesglobales.com',
    contactPhone: '+33 1 23 45 67 93'
  },
  {
    id: 6,
    clientName: 'Alexandre Petit',
    company: 'Future Tech',
    date: getDateString(4), // Dans 4 jours
    startTime: '09:30',
    endTime: '10:30',
    type: 'call',
    status: 'confirmed',
    notes: 'Discussion technique sur la stratégie de migration cloud. Préparer la documentation technique.',
    agentId: 1,
    agentName: 'Jean Dupont',
    location: 'Virtuel - Teams',
    contactEmail: 'a.petit@futuretech.com',
    contactPhone: '+33 1 23 45 67 94'
  },
  {
    id: 7,
    clientName: 'Camille Durand',
    company: 'Solutions Numériques',
    date: getDateString(5), // Dans 5 jours
    startTime: '13:00',
    endTime: '14:00',
    type: 'consultation',
    status: 'pending',
    notes: 'Consultation pour les nouvelles exigences de projet. Le client a besoin d\'une solution logicielle personnalisée.',
    agentId: 3,
    agentName: 'Michel Leroy',
    location: 'Bureau client - Quartier Nord',
    contactEmail: 'camille@solutionsnumeriques.com',
    contactPhone: '+33 1 23 45 67 95'
  },
  {
    id: 8,
    clientName: 'Thomas Leroy',
    company: 'Enterprise Corp',
    date: getDateString(6), // Dans 6 jours
    startTime: '15:00',
    endTime: '16:30',
    type: 'presentation',
    status: 'confirmed',
    notes: 'Présentation finale du projet terminé. Démonstration et remise des livrables.',
    agentId: 2,
    agentName: 'Sophie Moreau',
    location: 'Salle de conférence A',
    contactEmail: 'thomas.leroy@enterprisecorp.com',
    contactPhone: '+33 1 23 45 67 96'
  }
];