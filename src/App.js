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
import { createClient } from '@supabase/supabase-js';



const App = () => {

  const [currentView, setCurrentView] = useState('dashboard');

  const {patients, setPatients, loading: loadingPatients } = usePatients();

  const {appointments, setAppointments, loading: loadingAppointments } = useAppointments();

  const handleAddPatient = async (patientData) => {
    const supabaseUrl = 'https://nftetzvanfgnndclfwkc.supabase.co';
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mdGV0enZhbmZnbm5kY2xmd2tjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NTkzNjQsImV4cCI6MjA3ODUzNTM2NH0.UN_Sonr7ZrgEpynWIAfxTn35qwmh_KQdCslBTPckf5U';

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const patient = {
      name: patientData.name,
      age: Number(patientData.age),
      phone: patientData.phone,
      email: patientData.email,
      condition: patientData.condition,
      diagnosis: patientData.diagnosis,
      status: "activo",
    };

    console.log("📤 Insertando en Supabase:", patient);

    const { data, error } = await supabase
      .from("patients")
      .insert([patient])
      .select();

    if (error) {
      console.error("❌ Error Supabase:", error);
      alert("Error al crear paciente");
      return;
    }

    console.log("✅ Insertado correctamente:", data[0]);

    setPatients(prev => [data[0], ...prev]);
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