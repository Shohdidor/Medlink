import React, { useEffect, useState } from 'react';
import { 
  FaUserMd, FaEnvelope, FaPhone, FaHospital, 
  FaStar, FaFileMedical, FaCalendarCheck, 
  FaSignOutAlt, FaEdit, FaCapsules, FaSearch 
} from 'react-icons/fa';
import { FiSettings, FiClock, FiUser, FiMessageSquare, FiMonitor } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa";
import axios from 'axios';

const API_PATIENTS = 'http://localhost:3000/doctors';
const API_URL = 'http://localhost:3000/drugs';

function Profile() {
  const [drugs, setDrugs] = useState([]);
  const [filteredDrugs, setFilteredDrugs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [idx, setIdx] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("loggedDoctor")));
  const [activeTab, setActiveTab] = useState('home');
  const [isEditing, setIsEditing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [customerDialogOpen, setCustomerDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [acceptChecked, setAcceptChecked] = useState(false);
  const [customerStatuses, setCustomerStatuses] = useState({});
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(() => {
    try {
      const stored = localStorage.getItem('pharmacyComments');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });
  const navigate = useNavigate();

  const [avatarImage, setAvatarImage] = useState(() => {
    const stored = localStorage.getItem("loggedDoctor");
    try {
      return JSON.parse(stored) || { customers: [] };
    } catch {
      return { customers: [] };
    }
  });

  const userCustomers = (user && Array.isArray(user.customers)) ? user.customers : [];

  const tabs = [
    { id: 'home', icon: <FiUser />, label: 'Профиль' },
    { id: 'schedule', icon: <FiClock />, label: 'Расписание' },
    { id: 'records', icon: <FaCalendarCheck />, label: 'Записи' },
    { id: 'pharmacy', icon: <FaCapsules />, label: 'Интернет Аптека' },
    { id: 'chat', icon: <FiMessageSquare />, label: 'Чат' },
    { id: 'dashboard', icon: <FiMonitor />, label: 'Дашборд' },
  ];

  async function getDrugs() {
    try {
      const { data } = await axios.get(API_URL);
      setDrugs(data);
      setFilteredDrugs(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getApi() {
    try {
      const { data } = await axios.get(API_PATIENTS);
      setData(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function DeletePatient(id) {
    try {
      setAvatarImage(prev => {
        const updated = {
          ...prev,
          customers: prev.customers.filter(cust => cust.id !== id)
        };
        localStorage.setItem("loggedDoctor", JSON.stringify(updated));
        return updated;
      });
      setCustomerStatuses(prev => {
        const newStatuses = { ...prev };
        delete newStatuses[id];
        return newStatuses;
      });
      setData(prev => prev.filter(cust => cust.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  const handleSave = () => {
    setIsEditing(false);
    localStorage.setItem("loggedUser", JSON.stringify(user));
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term === '') {
      setFilteredDrugs(drugs);
    } else {
      setFilteredDrugs(drugs.filter(drug => 
        drug.name.toLowerCase().includes(term) || 
        (drug.description && drug.description.toLowerCase().includes(term))
      ));
    }
  };

  const saveComment = (drugId) => {
    setComments(prev => {
      const updated = {
        ...prev,
        [drugId]: comment
      };
      localStorage.setItem('pharmacyComments', JSON.stringify(updated));
      return updated;
    });
    setShowCommentModal(false);
    setComment('');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getApi();
    getDrugs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 flex">
      {/* Mobile Nav */}
      <nav className="bg-blue-600 text-white p-4 lg:hidden md:hidden shadow-md fixed top-0 left-0 w-full z-50">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">HealthApp</div>
          <button onClick={toggleMenu} className="text-white text-2xl focus:outline-none">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className={`fixed top-0 left-0 h-full w-72 bg-gray-900 text-white z-40 transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-2xl`}>
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Навигация
            </h2>
          </div>

          <div className="p-4 mt-4 flex flex-col space-y-3">
            {tabs.map(tab => (
              <button 
                key={tab.id}
                className="flex items-center p-4 rounded-lg hover:bg-gray-800 transition-all duration-200 group hover:shadow-[0_4px_12px_rgba(168,85,247,0.2)]"
                onClick={() => {
                  setActiveTab(tab.id);
                  setMenuOpen(false);
                }}
              >
                <div className={`w-8 h-8 rounded-md bg-${tab.id === 'pharmacy' ? 'blue' : 'purple'}-500/10 flex items-center justify-center mr-3 group-hover:bg-${tab.id === 'pharmacy' ? 'blue' : 'purple'}-500/20 transition-colors`}>
                  {React.cloneElement(tab.icon, { className: `w-5 h-5 text-${tab.id === 'pharmacy' ? 'blue' : 'purple'}-400` })}
                </div>
                <span className="font-medium text-gray-200 group-hover:text-white">{tab.label}</span>
              </button>
            ))}

            <div className="border-t border-gray-700 my-2"></div>

            <button 
              className="flex items-center p-4 rounded-lg hover:bg-gray-800 transition-all duration-200 group hover:shadow-[0_4px_12px_rgba(239,68,68,0.2)]"
              onClick={() => {
                navigate("/");
                localStorage.removeItem("loggedDoctor");
              }}
            >
              <div className="w-8 h-8 rounded-md bg-red-500/10 flex items-center justify-center mr-3 group-hover:bg-red-500/20 transition-colors">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <span className="font-medium text-gray-200 group-hover:text-white">Выйти</span>
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
              </div>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div onClick={toggleMenu} className="fixed top-0 left-0 w-full h-full bg-black opacity-40 z-30" />
        )}
      </nav>

      {/* Desktop Sidebar */}
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
              src={user.avatar || 'https://i.pinimg.com/736x/87/22/ec/8722ec261ddc86a44e7feb3b46836c10.jpg'} 
              className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
              alt="User Avatar"
            />
            <div className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full shadow-md">
              <FaEdit className="text-white text-sm" />
            </div>
          </motion.div>
          
          <h2 className="text-2xl font-bold text-gray-800 text-center">{user.first_name} {user.last_name}</h2>
          <p className="text-indigo-600 text-sm font-medium mt-1">{user.specialty || user.key}</p>
          <div className="flex gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={`text-sm ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} />
            ))}
          </div>
        </div>

        <nav className="mt-12 space-y-1">
          {tabs.map((tab) => (
            <motion.button 
              key={tab.id}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all 
                ${activeTab === tab.id ? `bg-${tab.id === 'pharmacy' ? 'blue' : 'indigo'}-50 text-${tab.id === 'pharmacy' ? 'blue' : 'indigo'}-600` : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className={`${activeTab === tab.id ? `text-${tab.id === 'pharmacy' ? 'blue' : 'indigo'}-600` : 'text-gray-500'}`}>
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
              navigate("/");
              localStorage.removeItem("loggedUser");
            }}
          >
            <FaSignOutAlt />
            <span>Выйти</span>
          </motion.button>
        </nav>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-6xl mx-auto"
        >
          {/* Header */}
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
              <div
                onClick={() => setActiveTab('records')}
                className="flex items-center justify-between cursor-pointer"
              >
                <div>
                  <h3 className="text-gray-500 text-sm font-medium">Записи</h3>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{userCustomers.length}</p>
                </div>
                <div className="text-indigo-400 text-3xl">
                  <FaCalendarCheck />
                </div>
              </div>
              <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${userCustomers.length}%` }}></div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-500 text-sm font-medium">Пациенты</h3>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{avatarImage.patient_success_rate}</p>
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
                      <p className="text-gray-800">{user.nationality || 'Не указан'}</p>
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
                  <div className="space-y-3">
                    {(avatarImage && Array.isArray(avatarImage.customers) ? avatarImage.customers : []).length > 0 ? (
                      (avatarImage.customers).map((elem) => (
                        <motion.div 
                          key={elem.id}
                          whileHover={{ y: -2 }}
                          className="group p-5 bg-white rounded-xl border border-gray-100 hover:border-blue-100 transition-all shadow-sm hover:shadow-md"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4 min-w-0">
                              <div className="relative">
                                <img
                                  src={elem.avatar || 'https://i.pinimg.com/736x/87/22/ec/8722ec261ddc86a44e7feb3b46836c10.jpg'}
                                  alt={`${elem.first_name} ${elem.last_name}`}
                                  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm group-hover:border-blue-100 transition-colors"
                                />
                                <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                                  <div className="bg-white rounded-full p-0.5">
                                    <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="min-w-0">
                                <h3 className="font-semibold text-gray-800 truncate">
                                  {elem.first_name} {elem.last_name}
                                </h3>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                                  <div className="flex items-center text-sm text-gray-500">
                                    <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {elem.date_of_birth || 'Не указана'}
                                  </div>
                                  <div className="flex items-center text-sm text-gray-500">
                                    <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    {elem.gender || 'Не указан'}
                                  </div>
                                  <div className="flex items-center text-sm text-gray-500">
                                    <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    {elem.contact?.email || 'Не указан'}
                                  </div>
                                  <div className="flex items-center text-sm text-gray-500">
                                    <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    {elem.contact?.phone || 'Не указан'}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-end shrink-0">
                              <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full flex items-center">
                               <span className="px-5 py-1 bg-yellow-50 text-yellow-600 text-sm rounded-full">
                                {customerStatuses[elem.id] === 'in_progress' ? 'В процессе' : 'Ожидает'}
                              </span>
                              </span>
                              <button
                                onClick={() => {
                                  setSelectedCustomer(elem);
                                  setAcceptChecked(customerStatuses[elem.id] === 'in_progress');
                                  setCustomerDialogOpen(true);
                                }}
                                className="mt-2 text-blue-500 hover:text-blue-700 transition-colors"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-xl border border-gray-100 shadow-sm"
                      >
                        <div className="mb-6 p-4 bg-blue-50 rounded-full">
                          <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Нет клиентов</h3>
                        <p className="text-gray-500 max-w-md mb-6">
                          У вас пока нет ни одного клиента.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'pharmacy' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Интернет Аптека</h2>
                    <div className="relative w-full md:w-64">
                      <input
                        type="text"
                        placeholder="Поиск лекарств..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredDrugs.length > 0 ? (
                      filteredDrugs.map((drug) => (
                        <motion.div
                          key={drug.id}
                          whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
                          className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all flex flex-col"
                        >
                          <div className="relative w-full h-48 flex items-center justify-center bg-gradient-to-br from-blue-50 to-white rounded-t-2xl overflow-hidden">
                            <img
                              src={drug.image || 'https://via.placeholder.com/120x120?text=No+Image'}
                              alt={drug.name}
                              className="object-contain h-32 max-h-40 w-auto drop-shadow-md cursor-pointer transition-transform duration-200 hover:scale-105"
                              style={{ maxWidth: '80%' }}
                              onClick={() => navigate(`/menu/infodrugs/${drug.id}`)}
                            />
                          </div>
                          <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-semibold text-gray-800 truncate">{drug.name}</h3>
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${drug.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{drug.stock > 0 ? 'В наличии' : 'Нет в наличии'}</span>
                              </div>
                              <p className="text-xs text-gray-500 mb-1">{drug.category}</p>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-gray-500 text-xs">Производитель:</span>
                                <span className="text-gray-700 text-xs font-medium">{drug.manufacturer}</span>
                              </div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-gray-500 text-xs">Цена:</span>
                                <span className="text-lg font-bold text-blue-600">{drug.price} ₽</span>
                              </div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-gray-500 text-xs">Рейтинг:</span>
                                <span className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className={`text-xs ${i < Math.round(drug.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                                  ))}
                                  <span className="ml-1 text-xs text-gray-500">({drug.rating})</span>
                                </span>
                              </div>
                              <div className="mt-2 text-gray-700 text-sm line-clamp-3 min-h-[48px]">{drug.description}</div>
                            </div>
                            <div className="mt-4 flex justify-center">
                              <button
                                onClick={() => {
                                  setSelectedDrug(drug);
                                  setShowCommentModal(true);
                                }}
                                className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium shadow hover:from-blue-600 hover:to-cyan-600 transition-all"
                              >
                                Написать комментарий
                              </button>
                            </div>
                            {comments[drug.id] && (
                              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                                <p className="text-xs text-blue-800 font-medium mb-1">Ваш комментарий:</p>
                                <p className="text-sm text-blue-700">{comments[drug.id]}</p>
                                <button
                                  onClick={() => {
                                    setComments(prev => {
                                      const updated = { ...prev };
                                      delete updated[drug.id];
                                      localStorage.setItem('pharmacyComments', JSON.stringify(updated));
                                      return updated;
                                    });
                                  }}
                                  className="mt-2 px-3 py-1 rounded bg-red-100 text-red-700 text-xs font-medium hover:bg-red-200 transition"
                                >
                                  Удалить комментарий
                                </button>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="col-span-full flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-xl border border-gray-100 shadow-sm"
                      >
                        <div className="mb-6 p-4 bg-blue-50 rounded-full">
                          <FaCapsules className="w-12 h-12 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          {searchTerm ? 'Ничего не найдено' : 'Аптека пуста'}
                        </h3>
                        <p className="text-gray-500 max-w-md mb-6">
                          {searchTerm 
                            ? 'Попробуйте изменить параметры поиска' 
                            : 'В данный момент нет доступных лекарств. Попробуйте позже.'}
                        </p>
                        {searchTerm && (
                          <button
                            onClick={() => {
                              setSearchTerm('');
                              setFilteredDrugs(drugs);
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Сбросить поиск
                          </button>
                        )}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'chat' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-xl border border-gray-100 shadow-sm"
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Чат</h2>
                  <p className="text-gray-500 max-w-md mb-6">
                    Здесь будет чат с пациентами и коллегами. Функция в разработке!
                  </p>
                </motion.div>
              )}

              {activeTab === 'dashboard' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-xl border border-gray-100 shadow-sm"
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Дашборд</h2>
                  <p className="text-gray-500 max-w-md mb-6">
                    Здесь будет дашборд с аналитикой и статистикой. Следите за обновлениями!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>

      {/* Edit Modal */}
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

      {/* Comment Modal */}
      {showCommentModal && selectedDrug && (
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
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                Комментарий для {selectedDrug.name}
              </h3>
              <button
                onClick={() => {
                  setShowCommentModal(false);
                  setComment('');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                &times;
              </button>
            </div>
            
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Введите ваш комментарий..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
              defaultValue={comments[selectedDrug.id] || ''}
            />
            
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowCommentModal(false);
                  setComment('');
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={() => saveComment(selectedDrug.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Сохранить
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Customer Dialog */}
      {customerDialogOpen && selectedCustomer && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          style={{ animationTimingFunction: 'cubic-bezier(0.4,0,0.2,1)' }}
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl"
              onClick={() => setCustomerDialogOpen(false)}
            >
              &times;
            </button>
            <div className="flex flex-col items-center mb-6">
              <img
                src={selectedCustomer.avatar || 'https://i.pinimg.com/736x/87/22/ec/8722ec261ddc86a44e7feb3b46836c10.jpg'}
                alt={`${selectedCustomer.first_name} ${selectedCustomer.last_name}`}
                className="w-20 h-20 rounded-full object-cover border-4 border-indigo-200 shadow-md mb-2"
              />
              <h3 className="text-xl font-bold text-gray-800 mt-2 mb-1">
                {selectedCustomer.first_name} {selectedCustomer.last_name}
              </h3>
              <p className="text-gray-500 text-sm mb-1">{selectedCustomer.date_of_birth || 'Не указана'} • {selectedCustomer.gender || 'Не указан'}</p>
              <p className="text-gray-500 text-sm mb-1">Email: {selectedCustomer.contact?.email || 'Не указан'}</p>
              <p className="text-gray-500 text-sm">Телефон: {selectedCustomer.contact?.phone || 'Не указан'}</p>
            </div>
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => {
                  DeletePatient(selectedCustomer.id);
                  setCustomerDialogOpen(false);
                }}
                className="w-full py-2 rounded-lg bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition"
              >
                Удалить
              </button>
              <button className="w-full py-2 rounded-lg bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition">Написать</button>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-green-600"
                  checked={acceptChecked}
                  onChange={e => setAcceptChecked(e.target.checked)}
                />
                <span className="text-gray-700 font-medium">Принять пациента</span>
              </label>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
                onClick={() => setCustomerDialogOpen(false)}
              >
                Отмена
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
                onClick={() => {
                  setCustomerStatuses(prev => ({
                    ...prev,
                    [selectedCustomer.id]: acceptChecked ? 'in_progress' : 'waiting'
                  }));
                  setCustomerDialogOpen(false);
                }}
              >
                Подтвердить
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Profile;