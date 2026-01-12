import { createClient } from '@supabase/supabase-js';

const handleAddPatient = async (patientData) => {
  // Insert into Supabase
  const newPatient = {
    id: Date.now().toString(),
    ...patientData,
    age: parseInt(patientData.age),
    registrationDate: new Date(),
    status: 'activo',
    nextAppointment: null,
    totalSessions: 0,
    completedSessions: 0
  };

  const addedPatient = await addPatient(newPatient);

  if (addedPatient) {
    // Add to frontend state so UI updates immediately
    setPatients(prev => [newPatient, ...prev]);
  } else {
    alert("Error creating patient. Check console for details.");
  }
};

import { addPatient } from "./src/services/patientsService.js";

const test = async () => {
  const dummy = {
    name: "Paciente de Prueba",
    age: 30,
    phone: "+34 600 000 000",
    email: "test@example.com",
    condition: "Prueba",
    diagnosis: "N/A"
  };

  const result = await addPatient(dummy);

  console.log("Resultado de addPatient:", result);
};

const handleAddPatient_ = async (patientData) => {
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

handleAddPatient_({
    name: "AAA",
    age: 23,
    phone: "AAA",
    email: "AAA",
    condition: "AAA",
    diagnosis: "AAA",
    status: "activo",
  })