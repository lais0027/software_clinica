import { addPatient } from "js/src/services/patientsService";

const test = async () => {
  const newPatient = {
    name: "Test Person",
    age: 31,
    phone: "+123456789",
    email: "test@example.com",
    condition: "Testing",
    diagnosis: "Testing diagnosis"
  };

  const result = await addPatient(newPatient);
  console.log("Inserted patient:", result);
};

test();