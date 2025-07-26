import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const API_URL = 'http://localhost:3000/drugs';

function InfoDrugs() {
    const navigate = useNavigate ()
  const { id } = useParams();
  const [infoDrug, setInfoDrug] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getDrugsById() {
    try {
      const { data } = await axios.get(`${API_URL}/${id}`);
      setInfoDrug(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch drug info:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    
    window.scrollTo (0 , 0)
    getDrugsById();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-white to-blue-50">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5, 
            ease: "easeInOut" 
          }}
          className="text-2xl font-light tracking-wide text-blue-600"
        >
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </motion.div>
      </div>
    );
  }

  if (!infoDrug) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-white to-blue-50 p-6">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Ошибка загрузки</h2>
          <p className="text-gray-600 mb-6">Не удалось загрузить информацию о препарате.</p>
          <button 
            onClick={getDrugsById}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            Попробовать снова
          </button>
        </motion.div>
      </div>
    );
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      } 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating bubbles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-100/30"
            style={{
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              x: [0, Math.random() * 100 - 50],
              opacity: [0.3, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "loop",
              delay: Math.random() * 5,
            }}
          />
        ))}
        
        {/* Light streaks */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
        >
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full blur-[80px]"></div>
          <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-blue-100 rounded-full blur-[80px]"></div>
        </motion.div>
      </div>

      <motion.div
        className="relative max-w-7xl mx-auto p-6 md:p-10 lg:p-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Back button */}
        <motion.div
          className="mb-8"
          variants={itemVariants}
        >
          <button 
          onClick={ ()=> {
            navigate ( "/menu/orderdrugs")
          }}
        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Назад к списку
          </button>
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column: Image & Core Details */}
          <motion.div
            className="lg:col-span-1"
            variants={itemVariants}
          >
            <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-lg shadow-blue-100/30 flex flex-col items-center mb-8">
              <motion.div 
                className="w-full h-auto max-h-[350px] bg-white rounded-lg overflow-hidden border border-blue-100 flex items-center justify-center p-4 mb-6 relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={infoDrug.image}
                  alt={infoDrug.name}
                  className="w-full h-full object-contain transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-100/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
              
              <motion.h1 
                className="text-4xl font-extrabold text-blue-600 tracking-tight leading-tight mb-2 text-center"
                whileHover={{ scale: 1.02 }}
              >
                {infoDrug.name}
              </motion.h1>
              
              <p className="text-sm text-blue-400 font-light italic text-center">
                {infoDrug.alternative_names ? `Альтернативные названия: ${infoDrug.alternative_names}` : 'Нет альтернативных названий'}
              </p>
            </div>

            {/* Dosage Section */}
            {infoDrug.dosage && (
              <motion.div
                className="bg-white border border-blue-200 rounded-2xl p-6 shadow-lg shadow-blue-100/20 text-blue-800"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <h2 className="text-2xl font-bold mb-4 flex items-center text-blue-600">
                  <svg className="w-6 h-6 mr-3 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9v-2h2v2zm0-4H9V7h2v6zm4 0h-2V7h2v6zm0 4h-2v-2h2v2z"/>
                  </svg>
                  Дозировка
                </h2>
                <ul className="space-y-3 text-lg">
                  <li>
                    <span className="font-semibold text-blue-600">Взрослые:</span> {infoDrug.dosage.adults || 'Не указано'}
                  </li>
                  <li>
                    <span className="font-semibold text-blue-600">Дети:</span> {infoDrug.dosage.children || 'Не указано'}
                  </li>
                </ul>
              </motion.div>
            )}
          </motion.div>

          {/* Right Columns: Main Details & Comments */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Information Block */}
            <motion.div
              className="bg-white border border-blue-100 rounded-2xl p-8 shadow-lg shadow-blue-100/30"
              variants={itemVariants}
              whileHover={{ boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)" }}
            >
              <h2 className="text-2xl font-bold text-blue-800 mb-6">Ключевая Информация</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8 text-lg">
                <InfoItem label="Цена" value={infoDrug.price || 'Н/Д'} />
                <InfoItem label="Производство" value={infoDrug.place_of_production || 'Н/Д'} />
                <InfoItem label="Срок годности" value={infoDrug.expiration_date || 'Н/Д'} />
                <InfoItem label="Рейтинг" value={infoDrug.rating ? `${infoDrug.rating} ⭐` : 'Н/Д'} />
                <InfoItem label="Хранение" value={infoDrug.storage_conditions || 'Н/Д'} />
                <InfoItem label="Применяется при" value={infoDrug.used_for || 'Н/Д'} fullWidth />
                <InfoItem label="Когда использовать" value={infoDrug.when_to_use || 'Н/Д'} fullWidth />
              </div>
            </motion.div>

            {/* Comments Section */}
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                className="bg-white border border-blue-100 rounded-2xl p-8 shadow-lg shadow-blue-100/30"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <h2 className="text-2xl font-bold mb-4 text-blue-800 flex items-center">
                  <div className="w-3 h-6 bg-blue-500 rounded-full mr-3"></div>
                  Комментарии пользователей
                </h2>
                <p className="text-blue-700 leading-relaxed">
                  {infoDrug.users_comments || 'Пользовательские комментарии пока отсутствуют.'}
                </p>
              </motion.div>

              <motion.div
                className="bg-white border border-blue-100 rounded-2xl p-8 shadow-lg shadow-blue-100/30"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <h2 className="text-2xl font-bold mb-4 text-blue-800 flex items-center">
                  <div className="w-3 h-6 bg-green-500 rounded-full mr-3"></div>
                  Комментарии врачей
                </h2>
                <p className="text-blue-700 leading-relaxed">
                  {infoDrug.doctors_comments || 'Комментарии врачей пока отсутствуют.'}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Helper component for info items
const InfoItem = ({ label, value, fullWidth = false }) => (
  <motion.p 
    className={`flex flex-col ${fullWidth ? 'col-span-full' : ''}`}
    whileHover={{ x: 5 }}
  >
    <span className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-1">{label}</span>
    <span className="text-lg text-blue-800">{value}</span>
  </motion.p>
);

export default InfoDrugs;