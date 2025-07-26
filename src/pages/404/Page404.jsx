import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RiStethoscopeLine } from 'react-icons/ri';
import { AiOutlineMedicineBox } from 'react-icons/ai';
import { BsHospital } from 'react-icons/bs';
import { FaHeartbeat, FaClinicMedical } from 'react-icons/fa';

function NotFound() {
  const navigate = useNavigate();

  // Плавающие медицинские иконки
  const medicalIcons = [
    { icon: <RiStethoscopeLine />, size: 24, delay: 0 },
    { icon: <AiOutlineMedicineBox />, size: 28, delay: 2 },
    { icon: <FaHeartbeat />, size: 32, delay: 4 },
    { icon: <BsHospital />, size: 26, delay: 1 },
    { icon: <FaClinicMedical />, size: 30, delay: 3 },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-teal-50 p-4 relative overflow-hidden font-sans">
      {/* Плавающие медицинские иконки */}
      {medicalIcons.map((item, index) => (
        <div
          key={index}
          className="absolute text-blue-200/80 animate-float pointer-events-none"
          style={{
            fontSize: `${item.size}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${item.delay}s`,
            animationDuration: `${15 + Math.random() * 10}s`,
          }}
        >
          {item.icon}
        </div>
      ))}

      {/* Основное содержимое */}
      <div className="relative z-10 bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center transform transition-all hover:scale-[1.01] hover:shadow-2xl">
        {/* Анимация ЭКГ */}
        <div className="relative h-24 mb-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-teal-100 opacity-30 rounded-full"></div>
          <div className="ecg-line absolute bottom-0 left-0 right-0 h-1 bg-blue-400"></div>
          <div className="ecg-pulse absolute bottom-0 h-8 w-1 bg-red-500"></div>
        </div>

        {/* Код ошибки */}
        <div className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600 mb-2">
          404
        </div>

        {/* Сообщение */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Страница не найдена</h1>
        <p className="text-gray-600 mb-6">
          Медицинская карта или страница, которую вы ищете, не найдена.
          Пожалуйста, проверьте URL или перейдите в один из безопасных разделов.
        </p>

        {/* Кнопки навигации */}
        <div className="grid grid-cols-1 gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 bg-blue-100 text-blue-700 hover:bg-blue-200 py-3 px-4 rounded-lg font-medium transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Назад
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:from-blue-700 hover:to-teal-700 py-3 px-4 rounded-lg font-medium transition-colors shadow-md"
          >
            <BsHospital className="text-lg" />
            На главную клиники
          </button>
          
          <button
            onClick={() => navigate('/emergency')}
            className="flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 py-3 px-4 rounded-lg font-medium transition-colors border border-red-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8a1 1 0 10-2 0v3.5a1 1 0 00.293.707l1 1a1 1 0 001.414-1.414L12 11.5V8z" clipRule="evenodd" />
            </svg>
            Экстренные контакты
          </button>
        </div>

        {/* Дополнительная помощь */}
        <div className="mt-8 text-sm text-gray-500">
          <p>Нужна срочная помощь? Позвоните в поддержку:</p>
          <a href="tel:+78005553535" className="text-blue-600 font-medium hover:underline">
            +7 (800) 555-35-35
          </a>
        </div>
      </div>

      {/* Футер */}
      <div className="mt-8 text-xs text-gray-400 text-center">
        <p>Соответствие стандартам • Защищенное соединение • v2.4.1</p>
      </div>

      {/* Стили */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        
        @keyframes ecgMove {
          0% { left: -100px; opacity: 0; }
          5% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        
        @keyframes ecgPulse {
          0%, 70%, 100% { height: 0; }
          10%, 60% { height: 24px; }
        }
        
        .animate-float {
          animation: float 12s ease-in-out infinite;
        }
        
        .ecg-line {
          background: linear-gradient(
            90deg,
            transparent 0%,
            transparent 20%,
            #3B82F6 20%,
            #3B82F6 21%,
            transparent 21%,
            transparent 40%,
            #3B82F6 40%,
            #3B82F6 41%,
            transparent 41%,
            transparent 60%,
            #3B82F6 60%,
            #3B82F6 61%,
            transparent 61%,
            transparent 80%,
            #3B82F6 80%,
            #3B82F6 81%,
            transparent 81%
          );
          animation: ecgMove 8s linear infinite;
        }
        
        .ecg-pulse {
          left: 30%;
          animation: ecgPulse 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default NotFound;