import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
  FaHospital, FaUserTie, FaPhone, FaEnvelope, FaSpinner,
  FaSearch, FaFilter, FaTimes, FaMapMarkerAlt, FaExternalLinkAlt,
  FaGlobe, FaBed, FaHeart, FaStar, FaAmbulance, FaChild, FaProcedures,
  FaPlus, FaMinus, FaInfoCircle
} from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = "http://localhost:3000/numbersOfHospitals";

const specialtyIcons = {
  emergency: <FaAmbulance className="text-red-500" />,
  pediatric: <FaChild className="text-blue-500" />,
  surgical: <FaProcedures className="text-purple-500" />,
  cardiology: <FaHeart className="text-pink-500" />,
  general: <FaHospital className="text-green-500" />
};

const specialtyColors = {
  emergency: 'bg-red-100 text-red-800',
  pediatric: 'bg-blue-100 text-blue-800',
  surgical: 'bg-purple-100 text-purple-800',
  cardiology: 'bg-pink-100 text-pink-800',
  general: 'bg-green-100 text-green-800'
};

function Call() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    emergency: false,
    pediatric: false,
    surgical: false,
    cardiology: false,
    general: false
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [expandedHospital, setExpandedHospital] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(API_URL);
      const enhancedData = data.map(hospital => ({
        ...hospital,
        rating: (Math.random() * 2 + 3).toFixed(1),
        beds: Math.floor(Math.random() * 500) + 50,
        distance: (Math.random() * 20).toFixed(1),
        specialties: hospital.specialties || ['general'],
        waitTime: Math.floor(Math.random() * 120) + 5 // Random wait time in minutes
      }));
      setData(enhancedData);
      toast.success('Hospital data loaded successfully!', {
        icon: '🏥',
        position: 'top-right',
        autoClose: 2000,
      });
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load hospital data. Please try again later.');
      toast.error('Failed to load hospital data', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredData = useMemo(() => {
    let results = data;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(h =>
        h.hospital.toLowerCase().includes(term) ||
        h.administrator_name.toLowerCase().includes(term) ||
        h.administrator_phone.includes(searchTerm) ||
        h.administrator_email.toLowerCase().includes(term) ||
        (h.location && h.location.toLowerCase().includes(term))
  )}
    
    const activeFilters = Object.keys(filters).filter(key => filters[key]);
    if (activeFilters.length > 0) {
      results = results.filter(h => 
        h.specialties?.some(specialty => activeFilters.includes(specialty))
      );
    }
    
    return results.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
  }, [searchTerm, filters, data]);

  const toggleFilter = (f) => {
    setFilters(prev => ({ ...prev, [f]: !prev[f] }));
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      emergency: false,
      pediatric: false,
      surgical: false,
      cardiology: false,
      general: false
    });
  };

  const handleCall = (phoneNumber) => {
    toast.info(`Calling ${phoneNumber}`, {
      position: 'top-center',
      autoClose: 1500,
    });
  };

  const handleEmergencyCall = () => {
    toast.warning(
      <div className="flex items-center">
        <FaAmbulance className="mr-2" />
        <span>Calling emergency services!</span>
      </div>,
      {
        position: 'top-center',
        autoClose: 2000,
        className: 'bg-red-100 text-red-800'
      }
    );
  };

  const toggleHospitalExpand = (id) => {
    setExpandedHospital(expandedHospital === id ? null : id);
  };

  useEffect (()=> {
    window.scrollTo( 0 , 0 )
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-8 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header Section */}
        <header className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-block mb-6"
          >
            <div className="bg-blue-600 text-white p-3 rounded-xl inline-flex items-center justify-center shadow-lg">
              <FaHospital className="text-2xl" />
            </div>
          </motion.div>
          <motion.h1 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-3"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
              Hospital Connect
            </span>
          </motion.h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find and connect with trusted healthcare providers in your area
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={handleEmergencyCall}
              className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 shadow-lg hover:shadow-red-200 transition-all"
            >
              <FaAmbulance /> Emergency Services
            </button>
            <button
              className="bg-white border border-blue-500 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl font-medium flex items-center gap-2 shadow-sm hover:shadow-md transition-all"
            >
              <FaMapMarkerAlt /> Nearest Hospitals
            </button>
          </div>
        </header>

        {/* Search and Filter Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                placeholder="Search hospitals, locations, specialties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${showFilters ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <FaFilter /> {showFilters ? 'Hide Filters' : 'Filters'}
              </button>
              
              {(searchTerm || Object.values(filters).some(Boolean)) && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
                >
                  <FaTimes /> Clear
                </button>
              )}
            </div>
          </div>
          
          {/* Expanded Filters */}
          {showFilters && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.2 }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <h3 className="text-sm font-semibold text-gray-600 mb-3">Filter by Specialty</h3>
              <div className="flex flex-wrap gap-3">
                {Object.entries(filters).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => toggleFilter(key)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all ${value ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {specialtyIcons[key] || <FaHospital />}
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Results Section */}
        <section className="mb-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <FaSpinner className="text-4xl text-blue-500 mb-4" />
              </motion.div>
              <p className="text-gray-600">Loading hospitals...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 text-red-600 mb-4">
                <FaTimes />
              </div>
              <p className="text-red-600 font-medium">{error}</p>
              <button 
                onClick={fetchData}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Retry
              </button>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                <FaHospital className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hospitals found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm ? 'Try different search terms' : 'Reset your filters to see more results'}
              </p>
              {(searchTerm || Object.values(filters).some(Boolean)) && (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Reset all filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  {filteredData.length} {filteredData.length === 1 ? 'Hospital' : 'Hospitals'} Available
                </h2>
                <div className="text-sm text-gray-500 flex items-center">
                  <FaInfoCircle className="mr-1 text-blue-500" />
                  Sorted by distance
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {filteredData.map((hospital) => (
                  <motion.div
                    key={hospital.id || hospital.hospital}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="p-5">
                      <div className="flex flex-col sm:flex-row">
                        {/* Hospital Icon and Basic Info */}
                        <div className="flex items-start space-x-4 mb-4 sm:mb-0">
                          <div className="flex-shrink-0">
                            <div className="h-14 w-14 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                              <FaHospital size={24} />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-gray-900">{hospital.hospital}</h3>
                            {hospital.location && (
                              <p className="text-sm text-gray-500 flex items-center mt-1">
                                <FaMapMarkerAlt className="mr-1 flex-shrink-0" /> 
                                <span className="truncate">{hospital.location}</span>
                              </p>
                            )}
                          </div>
                        </div>
                        
                        {/* Stats and Actions */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:ml-auto sm:pl-4">
                          <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                            <div className="flex items-center bg-blue-50 px-3 py-1 rounded-lg">
                              <FaStar className="text-yellow-400 mr-1" />
                              <span className="text-sm font-medium">{hospital.rating}</span>
                            </div>
                            <div className="hidden sm:flex items-center text-sm text-gray-500">
                              <FaBed className="mr-1 text-blue-500" />
                              {hospital.beds} beds
                            </div>
                            <div className="hidden sm:flex items-center text-sm text-gray-500">
                              <FaMapMarkerAlt className="mr-1 text-green-500" />
                              {hospital.distance} mi
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <button
                              onClick={() => toggleHospitalExpand(hospital.id || hospital.hospital)}
                              className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                            >
                              {expandedHospital === (hospital.id || hospital.hospital) ? <FaMinus /> : <FaPlus />}
                            </button>
                            <button
                              onClick={() => handleCall(hospital.administrator_phone)}
                              className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                            >
                              <FaPhone />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Expanded Details */}
                      <AnimatePresence>
                        {expandedHospital === (hospital.id || hospital.hospital) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-4 pt-4 border-t border-gray-200"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <h4 className="text-sm font-semibold text-gray-500 mb-2">CONTACT</h4>
                                <ul className="space-y-2">
                                  <li className="flex items-start">
                                    <FaUserTie className="mt-1 mr-2 text-blue-500 flex-shrink-0" />
                                    <span className="text-gray-700">{hospital.administrator_name}</span>
                                  </li>
                                  <li className="flex items-start">
                                    <FaPhone className="mt-1 mr-2 text-blue-500 flex-shrink-0" />
                                    <a href={`tel:${hospital.administrator_phone}`} className="text-blue-600 hover:underline">
                                      {hospital.administrator_phone}
                                    </a>
                                  </li>
                                  <li className="flex items-start">
                                    <FaEnvelope className="mt-1 mr-2 text-blue-500 flex-shrink-0" />
                                    <a href={`mailto:${hospital.administrator_email}`} className="text-blue-600 hover:underline">
                                      {hospital.administrator_email}
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-semibold text-gray-500 mb-2">SPECIALTIES</h4>
                                <div className="flex flex-wrap gap-2">
                                  {hospital.specialties?.map((specialty, i) => (
                                    <span 
                                      key={i} 
                                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${specialtyColors[specialty] || 'bg-gray-100 text-gray-800'}`}
                                    >
                                      {specialtyIcons[specialty] || <FaHospital className="mr-1" />}
                                      {specialty}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-semibold text-gray-500 mb-2">STATS</h4>
                                <div className="grid grid-cols-2 gap-3">
                                  <div className="bg-gray-50 p-2 rounded-lg">
                                    <div className="text-xs text-gray-500">Wait Time</div>
                                    <div className="font-medium">{hospital.waitTime} min</div>
                                  </div>
                                  <div className="bg-gray-50 p-2 rounded-lg">
                                    <div className="text-xs text-gray-500">Bed Capacity</div>
                                    <div className="font-medium">{hospital.beds}</div>
                                  </div>
                                  <div className="bg-gray-50 p-2 rounded-lg">
                                    <div className="text-xs text-gray-500">Distance</div>
                                    <div className="font-medium">{hospital.distance} mi</div>
                                  </div>
                                  <div className="bg-gray-50 p-2 rounded-lg">
                                    <div className="text-xs text-gray-500">Rating</div>
                                    <div className="font-medium flex items-center">
                                      <FaStar className="text-yellow-400 mr-1" />
                                      {hospital.rating}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-4 flex flex-col sm:flex-row gap-3">
                              <button
                                onClick={() => setSelectedHospital(hospital)}
                                className="flex-1 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                              >
                                View Full Details
                              </button>
                              <button
                                onClick={() => {
                                  toast.info('Directions feature would open maps here');
                                }}
                                className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                              >
                                Get Directions
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Hospital Detail Modal */}
        <AnimatePresence>
          {selectedHospital && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
              onClick={() => setSelectedHospital(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => setSelectedHospital(null)}
                      className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                    >
                      <FaTimes />
                    </button>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-white">
                    <div className="flex items-center space-x-4">
                      <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                        <FaHospital size={28} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{selectedHospital.hospital}</h2>
                        {selectedHospital.location && (
                          <p className="flex items-center mt-1">
                            <FaMapMarkerAlt className="mr-2" /> 
                            <span className="truncate">{selectedHospital.location}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                        <ul className="space-y-4">
                          <li className="flex items-start">
                            <span className="flex-shrink-0 h-6 w-6 text-blue-500">
                              <FaUserTie />
                            </span>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-500">Administrator</p>
                              <p className="text-gray-700">{selectedHospital.administrator_name}</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="flex-shrink-0 h-6 w-6 text-blue-500">
                              <FaPhone />
                            </span>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-500">Phone</p>
                              <a href={`tel:${selectedHospital.administrator_phone}`} className="text-blue-600 hover:underline">
                                {selectedHospital.administrator_phone}
                              </a>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="flex-shrink-0 h-6 w-6 text-blue-500">
                              <FaEnvelope />
                            </span>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-500">Email</p>
                              <a href={`mailto:${selectedHospital.administrator_email}`} className="text-blue-600 hover:underline">
                                {selectedHospital.administrator_email}
                              </a>
                            </div>
                          </li>
                          {selectedHospital.website && (
                            <li className="flex items-start">
                              <span className="flex-shrink-0 h-6 w-6 text-blue-500">
                                <FaGlobe />
                              </span>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500">Website</p>
                                <a 
                                  href={selectedHospital.website} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline flex items-center"
                                >
                                  {selectedHospital.website.replace(/^https?:\/\//, '')}
                                  <FaExternalLinkAlt className="ml-1 text-xs" />
                                </a>
                              </div>
                            </li>
                          )}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Hospital Details</h3>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-2">Specialties</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedHospital.specialties?.map((specialty, i) => (
                                <span 
                                  key={i} 
                                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${specialtyColors[specialty] || 'bg-gray-100 text-gray-800'}`}
                                >
                                  {specialtyIcons[specialty] || <FaHospital className="mr-1" />}
                                  {specialty}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <h4 className="text-sm font-medium text-gray-500 mb-1">Rating</h4>
                              <div className="flex items-center">
                                <FaStar className="text-yellow-400 mr-1" />
                                <span className="font-medium">{selectedHospital.rating}/5.0</span>
                              </div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <h4 className="text-sm font-medium text-gray-500 mb-1">Bed Capacity</h4>
                              <div className="flex items-center">
                                <FaBed className="text-blue-500 mr-2" />
                                <span className="font-medium">{selectedHospital.beds}</span>
                              </div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <h4 className="text-sm font-medium text-gray-500 mb-1">Distance</h4>
                              <div className="flex items-center">
                                <FaMapMarkerAlt className="text-green-500 mr-2" />
                                <span className="font-medium">{selectedHospital.distance} miles</span>
                              </div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <h4 className="text-sm font-medium text-gray-500 mb-1">Wait Time</h4>
                              <div className="font-medium">{selectedHospital.waitTime} minutes</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                        <button
                          onClick={() => handleCall(selectedHospital.administrator_phone)}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center transition-all"
                        >
                          <FaPhone className="mr-2" /> Call Hospital
                        </button>
                        <button
                          onClick={() => {
                            toast.info('Directions feature would open maps here');
                          }}
                          className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg font-medium flex items-center justify-center transition-colors"
                        >
                          <FaMapMarkerAlt className="mr-2" /> Get Directions
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Call;