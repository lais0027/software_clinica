import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nftetzvanfgnndclfwkc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mdGV0enZhbmZnbm5kY2xmd2tjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NTkzNjQsImV4cCI6MjA3ODUzNTM2NH0.UN_Sonr7ZrgEpynWIAfxTn35qwmh_KQdCslBTPckf5U';

const supabase = createClient(supabaseUrl, supabaseAnonKey);
// Fetch all patients
export const getPatients = async () => {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .order('registrationDate', { ascending: false });

  if (error) {
    console.error('❌ Error fetching patients:', error.message);
    return [];
  }
  // Convert DB fields to match frontend style
  return data.map(p => ({
    ...p,
    nextAppointment: p.next_appointment ? new Date(p.next_appointment) : null
  }));
};

// Add a new patient
export const addPatient = async (patientData) => {
  const payload = {
    ...patientData,
    registration_date: new Date(),
    status: 'activo',
    total_sessions: 0,
    completed_sessions: 0
  };

  const { data, error } = await supabase
    .from('patients')
    .insert([payload])
    .select();

  if (error) {
    console.error('❌ Error inserting patient:', error.message);
    return null;
  }

  const p = data[0];

  return {
    ...p,
    registrationDate: new Date(p.registration_date),
    nextAppointment: p.next_appointment ? new Date(p.next_appointment) : null
  };
};
