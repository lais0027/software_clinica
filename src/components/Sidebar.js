import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Heart,
  Settings,
  Bell,
  ArrowRight,
  User
} from 'lucide-react';

const Sidebar = ({ currentView, onViewChange }) => {
  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Panel Principal', 
      icon: LayoutDashboard,
      gradient: 'from-blue-500 to-blue-600'
    },
    { 
      id: 'patients', 
      label: 'Pacientes', 
      icon: Users,
      gradient: 'from-green-500 to-green-600'
    },
    { 
      id: 'appointments', 
      label: 'Citas', 
      icon: Calendar,
      gradient: 'from-purple-500 to-purple-600'
    },
    { 
      id: 'treatments', 
      label: 'Tratamientos', 
      icon: Heart,
      gradient: 'from-pink-500 to-pink-600'
    },
    { 
      id: 'accounting', 
      label: 'Contabilidad', 
      icon: User,
      gradient: 'from-amber-500 to-amber-600'
    }
  ];

  return (
    <motion.div 
      className="w-72 bg-white/95 backdrop-blur-xl border-r border-gray-200/50 shadow-xl h-screen flex flex-col"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div 
        className="p-8 border-b border-gray-200/50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="flex items-center gap-4">
          <motion.div 
            className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart className="w-7 h-7 text-white" />
          </motion.div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Step
            </h1>
            <p className="text-gray-500 text-sm font-medium">Gestión Clínica</p>
          </div>
        </div>
      </motion.div>

      <nav className="flex-1 p-6">
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full group relative flex items-center gap-4 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-900 shadow-md border border-gray-200/50' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/80'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className={`p-2 rounded-xl ${
                    isActive 
                      ? `bg-gradient-to-br ${item.gradient}` 
                      : 'bg-gray-100 group-hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-gray-800'}`} />
                </motion.div>
                
                <span className="flex-1 text-left">{item.label}</span>
                
                <motion.div
                  className={`transition-all duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                  animate={{ 
                    x: isActive ? 0 : -10,
                    opacity: isActive ? 1 : 0
                  }}
                  whileHover={{ x: 0, opacity: 1 }}
                >
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </motion.div>
              </motion.button>
            );
          })}
        </motion.div>
      </nav>

      <motion.div 
        className="p-6 border-t border-gray-200/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <motion.div 
          className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-200/50"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <Bell className="w-5 h-5 text-blue-500" />
            <span className="font-semibold text-blue-900">Recordatorio</span>
          </div>
          <p className="text-blue-700 text-sm leading-relaxed">
            Tienes 3 citas programadas para mañana
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;