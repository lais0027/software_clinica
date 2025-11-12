import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Heart,
  Award,
  Clock,
  Users
} from 'lucide-react';

const Profile = () => {
  const clinicInfo = {
    name: 'Dr. María José Hernández',
    specialty: 'Fisioterapeuta Colegiada',
    email: 'info@fisioclinic.com',
    phone: '+34 612 345 678',
    address: 'Calle Salud, 45 - Madrid, España',
    license: 'Col. 2847 - Madrid',
    experience: '8 años de experiencia',
    patients: '250+ pacientes atendidos',
    specialties: [
      'Fisioterapia Manual',
      'Rehabilitación Deportiva',
      'Electroterapia',
      'Osteopatía',
      'Pilates Terapéutico'
    ]
  };

  const stats = [
    {
      icon: Users,
      label: 'Pacientes Atendidos',
      value: '250+',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Heart,
      label: 'Tratamientos Realizados',
      value: '1,200+',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Award,
      label: 'Años de Experiencia',
      value: '8',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Clock,
      label: 'Horas de Consulta',
      value: '2,500+',
      color: 'from-amber-500 to-amber-600'
    }
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Perfil Profesional</h1>
        <p className="text-gray-600">Información de la clínica y datos profesionales</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          className="lg:col-span-1 bg-white/90 backdrop-blur-lg border border-gray-200/50 rounded-2xl p-8 shadow-lg text-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.div
            className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
          >
            <User className="w-16 h-16 text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{clinicInfo.name}</h2>
            <p className="text-blue-600 font-semibold mb-4">{clinicInfo.specialty}</p>
            <p className="text-gray-600 mb-2">{clinicInfo.license}</p>
            <p className="text-gray-500">{clinicInfo.experience}</p>
          </motion.div>

          <motion.div
            className="mt-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Heart className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-green-700 font-semibold">{clinicInfo.patients}</p>
            <p className="text-green-600 text-sm">Con éxito comprobado</p>
          </motion.div>
        </motion.div>

        <div className="lg:col-span-2 space-y-6">
          <motion.div
            className="bg-white/90 backdrop-blur-lg border border-gray-200/50 rounded-2xl p-6 shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Información de Contacto</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold text-gray-900">{clinicInfo.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Teléfono</p>
                    <p className="font-semibold text-gray-900">{clinicInfo.phone}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Dirección</p>
                    <p className="font-semibold text-gray-900">{clinicInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Award className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Colegio Profesional</p>
                    <p className="font-semibold text-gray-900">{clinicInfo.license}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white/90 backdrop-blur-lg border border-gray-200/50 rounded-2xl p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Especialidades</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {clinicInfo.specialties.map((specialty, index) => (
                <motion.div
                  key={specialty}
                  className="p-3 bg-gradient-to-r from-gray-50 to-white border border-gray-200/50 rounded-xl text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="font-semibold text-gray-900 text-sm">{specialty}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              className="bg-white/90 backdrop-blur-lg border border-gray-200/50 rounded-2xl p-6 shadow-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Profile;