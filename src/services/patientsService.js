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
export const addPatient = async (p) => {
  const payload = {
    name: p.name,
    age: p.age,
    phone: p.phone,
    email: p.email,
    condition: p.condition,
    registrationDate: new Date().toISOString(),
    status: "activo"
  };

  const { data, error } = await supabase
    .from("patients")
    .insert([payload])
    .select();

  if (error) {
    console.error("❌ Error inserting patient:", error);
    return null;
  }

  return data[0];
};