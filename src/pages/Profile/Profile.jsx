import React, { useEffect, useState } from 'react';
import { 
  FaUserMd, FaEnvelope, FaPhone, FaHospital, 
  FaStar, FaFileMedical, FaCalendarCheck, 
  FaSignOutAlt, FaEdit 
} from 'react-icons/fa';
import { FiSettings, FiClock, FiUser } from 'react-icons/fi';
import { FiMenu } from 'react-icons/fi';

import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa";

function Profile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("loggedUser")));
  const [activeTab, setActiveTab] = useState('home');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => setMenuOpen(!menuOpen);


  const handleSave = () => {
    setIsEditing(false);
    localStorage.setItem("loggedUser", JSON.stringify(user));
  };

    const [ avatarImage, setAvatarImage ] = useState ( JSON.parse(localStorage.getItem("loggedUser")))

  const tabs = [
    { id: 'home', icon: <FiUser />, label: 'Профиль' },
    { id: 'schedule', icon: <FiClock />, label: 'Расписание' },
    { id: 'records', icon: <FaCalendarCheck />, label: 'Записи' },
    { id: 'menu', icon: <FiMenu />, label: 'Меню' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 flex">
    
          <nav className="bg-blue-600 text-white p-4 lg:hidden md:hidden shadow-md fixed top-0 left-0 w-full z-50">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold">HealthApp</div>
    
            <button
              onClick={toggleMenu}
              className="text-white text-2xl focus:outline-none"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
    
    <div
      className={`fixed top-0 left-0 h-full w-72 bg-gray-900 text-white z-40 transform ${
        menuOpen ? "translate-x-0" : "-translate-x-full"
      } transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-2xl`}
    >
      {/* Menu Header */}
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Навигация
        </h2>
      </div>
    
      {/* Menu Items */}
      <div className="p-4 mt-4 flex flex-col space-y-3">
        <button 
          className="flex items-center p-4 rounded-lg hover:bg-gray-800 transition-all duration-200 group hover:shadow-[0_4px_12px_rgba(59,130,246,0.2)]"
          onClick={() => navigate("/menu")}
        >
          <div className="w-8 h-8 rounded-md bg-blue-500/10 flex items-center justify-center mr-3 group-hover:bg-blue-500/20 transition-colors">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <span className="font-medium text-gray-200 group-hover:text-white">Меню</span>
          <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </button>
    
        <button 
          className="flex items-center p-4 rounded-lg hover:bg-gray-800 transition-all duration-200 group hover:shadow-[0_4px_12px_rgba(168,85,247,0.2)]"
          onClick={() => navigate("/profile")}
        >
          <div className="w-8 h-8 rounded-md bg-purple-500/10 flex items-center justify-center mr-3 group-hover:bg-purple-500/20 transition-colors">
            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <span className="font-medium text-gray-200 group-hover:text-white">Профиль</span>
          <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </button>
    
        <div className="border-t border-gray-700 my-2"></div>
    
        <button 
          className="flex items-center p-4 rounded-lg hover:bg-gray-800 transition-all duration-200 group hover:shadow-[0_4px_12px_rgba(239,68,68,0.2)]"
          onClick={() => {
            navigate("/login");
            localStorage.removeItem("loggedUser");
          }}
        >
          <div className="w-8 h-8 rounded-md bg-red-500/10 flex items-center justify-center mr-3 group-hover:bg-red-500/20 transition-colors">
            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <span className="font-medium text-gray-200 group-hover:text-white">Выйти</span>
          <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </button>
    
    
        <button 
        onClick={()=> {
          navigate("/menu/premium")
        }}
      className="group relative flex items-center w-full p-4 rounded-lg bg-gradient-to-r from-amber-500/10 to-yellow-500/10 hover:from-amber-500/20 hover:to-yellow-500/20 transition-all duration-200 hover:shadow-[0_4px_12px_rgba(234,179,8,0.3)] border border-amber-500/30 hover:border-amber-500/50"
    >
      <div className="relative w-8 h-8 rounded-md bg-gradient-to-br from-amber-400/20 to-yellow-600/20 flex items-center justify-center mr-3 group-hover:from-amber-400/30 group-hover:to-yellow-600/30 transition-all">
        <svg 
          className="w-5 h-5 text-amber-400 group-hover:text-yellow-300 transition-colors"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" 
          />
        </svg>
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      </div>
    
      <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-300">
        Купить Premium
      </span>
    
      <span className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
        <svg 
          className="w-5 h-5 text-amber-300 drop-shadow-[0_0_4px_rgba(234,179,8,0.4)]" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 5l7 7-7 7" 
          />
        </svg>
      </span>
    
      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-[10px] font-bold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
        PRO
      </span>
    </button>
      </div>
    
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 bg-gray-800/50 backdrop-blur-sm">
      <div className="flex items-center">
        <div className="relative w-12 h-12">
          <img
            className="w-full h-full object-cover rounded-full border border-white shadow-md"
            src={avatarImage.avatar}
            alt="Avatar"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></span>
        </div>
        <div className="ml-3 overflow-hidden">
          <p className="text-sm font-medium text-white truncate">
            {avatarImage.first_name} {avatarImage.last_name}
          </p>
          <p className="text-xs text-gray-400">Premium Member</p>
        </div>
      </div>
    </div>
    
    </div>
          {/* Backdrop */}
          {menuOpen && (
            <div
              onClick={toggleMenu}
              className="fixed top-0 left-0 w-full h-full bg-black opacity-40 z-30"
            />
          )}
        </nav>

      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-80 bg-white/90 backdrop-blur-lg shadow-2xl p-6 hidden md:block rounded-r-3xl border-r border-white/20 sticky top-0 h-screen"
      >
        <div className="flex flex-col items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative mb-6 group cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            <img 
              src={user.avatar || 'https://randomuser.me/api/portraits/lego/5.jpg'} 
              className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
              alt="User Avatar"
            />
            <div className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full shadow-md">
              <FaEdit className="text-white text-sm" />
            </div>
          </motion.div>
          
          <h2 className="text-2xl font-bold text-gray-800 text-center">{user.first_name} {user.last_name}</h2>
          <p className="text-indigo-600 text-sm font-medium mt-1">{user.specialty || user.key }</p>
          <p className="text-indigo-500 text-sm mt-1">Пользователь</p>
        </div>

        <nav className="mt-12 space-y-1">
          {tabs.map((tab) => (
            <motion.button 
              key={tab.id}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all 
                ${activeTab === tab.id ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => tab.id == "menu" ? navigate ("/menu") : setActiveTab(tab.id) }
            >
              <span className={`${activeTab === tab.id ? 'text-indigo-600' : 'text-gray-500'}`}>
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </motion.button>
          ))}
          
          <motion.button 
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
            className="w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 text-red-500 hover:bg-red-50 transition-all mt-8"
            onClick={()=> {
              navigate ("/")
              localStorage.removeItem("loggedUser")
            }}
          >
            <FaSignOutAlt />
            <span>Выйти</span>
          </motion.button>
        </nav>
      </motion.aside>

      <main className="flex-1 p-6 md:p-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-6xl mx-auto"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl border border-white">
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl font-bold text-gray-800">Личный кабинет</h1>
              <div className="flex flex-wrap gap-3">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="text-sm text-gray-600 flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100"
                >
                  <FaPhone className="text-indigo-500" />
                  <a href={`tel:${user.contact?.phone || '+7 (XXX) XXX-XXXX'}`} className="hover:text-indigo-600">
                    {user.contact?.phone || 'Не указан'}
                  </a>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="text-sm text-gray-600 flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100"
                >
                  <FaEnvelope className="text-indigo-500" />
                  <a href={`mailto:${user.contact?.email || 'example@mail.com'}`} className="hover:text-indigo-600">
                    {user.contact?.email || 'Не указан'}
                  </a>
                </motion.div>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-indigo-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              onClick={() => setIsEditing(true)}
            >
              <FaEdit /> Редактировать
            </motion.button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-500 text-sm font-medium">Записи</h3>
                  <p className="text-2xl font-bold text-gray-800 mt-1">24</p>
                </div>
                <div className="text-indigo-400 text-3xl">
                  <FaCalendarCheck />
                </div>
              </div>
              <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-500 text-sm font-medium">Пациенты</h3>
                  <p className="text-2xl font-bold text-gray-800 mt-1">156</p>
                </div>
                <div className="text-green-400 text-3xl">
                  <FaUserMd />
                </div>
              </div>
              <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-500 text-sm font-medium">Рейтинг</h3>
                  <p className="text-2xl font-bold text-gray-800 mt-1">4.8</p>
                </div>
                <div className="text-yellow-400 text-3xl">
                  <FaStar />
                </div>
              </div>
              <div className="mt-3 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={`text-sm ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-500 text-sm font-medium">Документы</h3>
                  <p className="text-2xl font-bold text-gray-800 mt-1">12</p>
                </div>
                <div className="text-blue-400 text-3xl">
                  <FaFileMedical />
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">PDF</span>
                <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">DOC</span>
                <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">IMG</span>
              </div>
            </motion.div>
          </div>

          {/* Content Area */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <AnimatePresence mode="wait">
              {activeTab === 'home' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Основная информация</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-gray-500 text-sm font-medium mb-2">Полное имя</h3>
                      <p className="text-gray-800">{user.first_name} {user.last_name}</p>
                    </div>
                    <div>
                      <h3 className="text-gray-500 text-sm font-medium mb-2">Дата рождения</h3>
                      <p className="text-gray-800">{user.date_of_birth || 'Не указана'}</p>
                    </div>
                    <div>
                      <h3 className="text-gray-500 text-sm font-medium mb-2">Пол</h3>
                      <p className="text-gray-800">{user.gender || 'Не указан'}</p>
                    </div>
                    <div>
                      <h3 className="text-gray-500 text-sm font-medium mb-2">Адрес</h3>
                      <p className="text-gray-800">{user.address || 'Не указан'}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'schedule' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Расписание</h2>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-gray-500">Расписание будет доступно после подтверждения профиля</p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'records' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Последние записи</h2>
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <motion.div 
                        key={item}
                        whileHover={{ scale: 1.01 }}
                        className="p-4 border border-gray-100 rounded-xl hover:shadow-sm transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-gray-800">Консультация #{item}</h3>
                            <p className="text-sm text-gray-500">15.0{item}.2023 - 10:00</p>
                          </div>
                          <span className="px-3 py-1 bg-green-50 text-green-600 text-sm rounded-full">Завершено</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>


      <AnimatePresence>
        {isEditing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">Редактировать профиль</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                  <input 
                    type="text" 
                    value={user.first_name}
                    onChange={(e) => setUser({...user, first_name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Фамилия</label>
                  <input 
                    type="text" 
                    value={user.last_name}
                    onChange={(e) => setUser({...user, last_name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    value={user.contact?.email || ''}
                    onChange={(e) => setUser({
                      ...user, 
                      contact: {...user.contact, email: e.target.value}
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                  <input 
                    type="tel" 
                    value={user.contact?.phone || ''}
                    onChange={(e) => setUser({
                      ...user, 
                      contact: {...user.contact, phone: e.target.value}
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
                  onClick={() => setIsEditing(false)}
                >
                  Отмена
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
                  onClick={handleSave}
                >
                  Сохранить
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Profile;