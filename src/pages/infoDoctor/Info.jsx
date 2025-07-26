import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { 
  FaEnvelope, 
  FaPhone, 
  FaHospital, 
  FaAward, 
  FaCertificate, 
  FaUserMd, 
  FaGraduationCap, 
  FaLanguage, 
  FaIdBadge,
  FaHeartbeat
} from 'react-icons/fa';

const Info = () => {
  let { id } = useParams();
  let [doctor, setDoctor] = useState({});

  async function getUserById() {
    try {
      let { data } = await axios.get(`http://localhost:3000/doctors/${id}`);
      setDoctor(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getUserById();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] to-[#e0f7fa] py-10 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Doctor Image */}
            <div className="md:w-1/3 bg-gradient-to-br from-cyan-500 to-blue-600 p-6 flex items-center justify-center">
              <div className="relative">
                <img
                  src={doctor.avatar || '/default-avatar.png'}
                  alt={doctor.first_name || 'Doctor'}
                  className="w-48 h-48 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <div className="absolute -bottom-3 -right-3 bg-white p-2 rounded-full shadow-md">
                  <FaHeartbeat className="text-cyan-600 text-xl" />
                </div>
              </div>
            </div>
            
            {/* Doctor Info */}
            <div className="md:w-2/3 p-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-cyan-100 text-cyan-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {doctor.specialty || 'Specialist'}
                </span>
                <span className="text-gray-500 text-sm">
                  {doctor.years_of_experience || '5+'} years experience
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Dr. {doctor.first_name} {doctor.last_name}
              </h1>
              
              <p className="text-gray-600 mb-6 max-w-2xl">
                {doctor.bio || 'Dedicated healthcare professional committed to patient wellness and innovative treatment approaches.'}
              </p>
              
              <div className="flex flex-wrap gap-4">
                {doctor.contact?.email && (
                  <a 
                    href={`mailto:${doctor.contact.email}`} 
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-colors"
                  >
                    <FaEnvelope className="text-cyan-600" />
                    <span className="text-gray-700">Email</span>
                  </a>
                )}
                
                {doctor.contact?.phone && (
                  <a 
                    href={`tel:${doctor.contact.phone}`} 
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-colors"
                  >
                    <FaPhone className="text-cyan-600" />
                    <span className="text-gray-700">Call</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Education */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-cyan-100 p-3 rounded-full">
              <FaGraduationCap className="text-cyan-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Education</h3>
          </div>
          <div className="space-y-3">
            {doctor.education ? (
              Array.isArray(doctor.education) ? (
                doctor.education.map((edu, i) => (
                  <p key={i} className="text-gray-600">{edu}</p>
                ))
              ) : (
                <p className="text-gray-600">{doctor.education}</p>
              )
            ) : (
              <p className="text-gray-400">Not specified</p>
            )}
          </div>
        </div>

        {/* Affiliations */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaHospital className="text-blue-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Affiliations</h3>
          </div>
          <div className="space-y-3">
            {doctor.hospital_affiliation && (
              <p className="text-gray-600">
                <span className="font-medium">Hospital:</span> {doctor.hospital_affiliation}
              </p>
            )}
            {doctor.clinic_affiliation && (
              <p className="text-gray-600">
                <span className="font-medium">Clinic:</span> {doctor.clinic_affiliation}
              </p>
            )}
            {!doctor.hospital_affiliation && !doctor.clinic_affiliation && (
              <p className="text-gray-400">Not specified</p>
            )}
          </div>
        </div>

        {/* Languages */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <FaLanguage className="text-purple-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Languages</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {doctor.languages_spoken ? (
              Array.isArray(doctor.languages_spoken) ? (
                doctor.languages_spoken.map((lang, i) => (
                  <span key={i} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    {lang}
                  </span>
                ))
              ) : (
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {doctor.languages_spoken}
                </span>
              )
            ) : (
              <p className="text-gray-400">Not specified</p>
            )}
          </div>
        </div>

        {/* License */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <FaIdBadge className="text-green-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">License</h3>
          </div>
          <p className="text-gray-600">
            {doctor.license_number || 'Not specified'}
          </p>
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-100 p-3 rounded-full">
              <FaCertificate className="text-amber-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Certifications</h3>
          </div>
          <div className="space-y-3">
            {doctor.certifications ? (
              Array.isArray(doctor.certifications) ? (
                doctor.certifications.map((cert, i) => (
                  <p key={i} className="text-gray-600">{cert}</p>
                ))
              ) : (
                <p className="text-gray-600">{doctor.certifications}</p>
              )
            ) : (
              <p className="text-gray-400">Not specified</p>
            )}
          </div>
        </div>

        {/* Awards */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <FaAward className="text-red-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Awards</h3>
          </div>
          <div className="space-y-3">
            {doctor.awards ? (
              Array.isArray(doctor.awards) ? (
                doctor.awards.map((award, i) => (
                  <p key={i} className="text-gray-600">{award}</p>
                ))
              ) : (
                <p className="text-gray-600">{doctor.awards}</p>
              )
            ) : (
              <p className="text-gray-400">Not specified</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;