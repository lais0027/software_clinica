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