import { useEffect, useState } from 'react';
import { getAppointments } from '../services/appointmentsService';

export const useAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await getAppointments();
      setAppointments(data);
      setLoading(false);
    };
    load();
  }, []);

  return { appointments, setAppointments, loading };
};


export const mockAppointments = [
  {
    id: '1',
    patientId: '1',
    patientName: 'María González',
    date: new Date('2025-01-20T10:00:00'),
    duration: 60,
    type: 'Fisioterapia Manual',
    status: 'confirmada',
    notes: 'Continuar con ejercicios de fortalecimiento lumbar'
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'Carlos Ruiz',
    date: new Date('2025-01-20T14:00:00'),
    duration: 45,
    type: 'Electroterapia',
    status: 'confirmada',
    notes: 'Aplicar TENS en zona del hombro'
  },
  {
    id: '3',
    patientId: '3',
    patientName: 'Ana Martín',
    date: new Date('2025-01-20T16:30:00'),
    duration: 60,
    type: 'Rehabilitación',
    status: 'pendiente',
    notes: 'Evaluación de movilidad de rodilla'
  },
  {
    id: '4',
    patientId: '1',
    patientName: 'María González',
    date: new Date('2025-01-21T10:00:00'),
    duration: 60,
    type: 'Fisioterapia Manual',
    status: 'pendiente',
    notes: ''
  }
];