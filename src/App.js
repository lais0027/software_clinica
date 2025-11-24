import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Patients from './components/Patients';
import Appointments from './components/Appointments';
import Treatments from './components/Treatments';
import Accounting from './components/Accounting';
import { mockPatients } from './mock/patients'; //pacientes
import { mockAppointments } from './mock/appointments'; //appointments

import { usePatients } from './mock/patients';
import { useAppointments } from './mock/appointments';
import { addPatient } from './services/patientsService';

const App = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const {patients, setPatients, loading: loadingPatients } = usePatients();
  const {appointments, setAppointments, loading: loadingAppointments } = useAppointments();

  const handleAddPatient = async (patientData) => {
      const patient = {
        id: Date.now().toString(),
        ...patientData,
        age: parseInt(patientData.age),
        registrationDate: new Date(),
        status: 'activo',
        nextAppointment: null,
        totalSessions: 0,
        completedSessions: 0
      };

    const newPatient = await addPatient(patient);

    // 2. Si Supabase responde correctamente...
    if (newPatient) {
      // ...actualizar la UI añadiendo el paciente devuelto por Supabase
      setPatients(prev => [newPatient, ...prev]);
    } else {
      alert("Error al crear paciente");
    }
  };

  const handleAddAppointment = (appointmentData) => {
    const newAppointment = {
      id: Date.now().toString(),
      ...appointmentData
    };
    
    setAppointments(prev => [newAppointment, ...prev]);

    // Actualizar la próxima cita del paciente
    if (appointmentData.patientId) {
      setPatients(prev => prev.map(patient => 
        patient.id === appointmentData.patientId
          ? { ...patient, nextAppointment: appointmentData.date }
          : patient
      ));
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard appointments={appointments} patients={patients} />;
      case 'patients':
        return (
          <Patients 
            patients={patients} 
            setPatients={setPatients}
            onAddPatient={handleAddPatient}
          />
        );
      case 'appointments':
        return (
          <Appointments 
            appointments={appointments}
            setAppointments={setAppointments}
            patients={patients}
            onAddAppointment={handleAddAppointment}
          />
        );
      case 'treatments':
        return <Treatments />;
      case 'accounting':
        return <Accounting />;
      default:
        return <Dashboard appointments={appointments} patients={patients} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-8 py-8">

          {/* Show a loading message while patients are loading */}
          {loadingPatients ? (
            <div>Loading patients...</div>
          ) : (
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {renderCurrentView()}
            </motion.div>
          )}
          
        </div>
      </main>
    </div>
  );
};

export default App;