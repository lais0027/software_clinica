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

test();