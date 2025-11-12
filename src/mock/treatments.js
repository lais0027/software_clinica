export const mockTreatments = [
  {
    id: '1',
    patientId: '1',
    date: new Date('2025-01-18T10:00:00'),
    type: 'Fisioterapia Manual',
    duration: 60,
    description: 'Masaje terapéutico en zona lumbar, ejercicios de movilización',
    observations: 'Mejoría en movilidad, menos dolor',
    nextSession: new Date('2025-01-20T10:00:00'),
    cost: 45
  },
  {
    id: '2',
    patientId: '2',
    date: new Date('2025-01-17T14:00:00'),
    type: 'Electroterapia',
    duration: 45,
    description: 'TENS y ultrasonido en hombro derecho',
    observations: 'Reducción significativa del dolor',
    nextSession: new Date('2025-01-20T14:00:00'),
    cost: 35
  },
  {
    id: '3',
    patientId: '3',
    date: new Date('2025-01-16T09:00:00'),
    type: 'Rehabilitación',
    duration: 60,
    description: 'Ejercicios de fortalecimiento cuádriceps, trabajo propioceptivo',
    observations: 'Progreso excelente, mayor estabilidad',
    nextSession: new Date('2025-01-19T09:00:00'),
    cost: 50
  }
];