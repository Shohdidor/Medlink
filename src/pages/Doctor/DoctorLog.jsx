import React, { useState, useEffect } from 'react';
import { FaUserMd, FaStethoscope, FaHeartbeat } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const doctorApi = 'http://localhost:3000/doctors';

function DoctorLog() {
  const navigate = useNavigate();
  const [activeField, setActiveField] = useState(null);
  const [inputEmail, setInputEmail] = useState('');
  const [inputlicense_number, setInputlicense_number] = useState('');
  const [pulse, setPulse] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((prev) => !prev);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-600 to-cyan-900 font-sans">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute text-blue-100/70 animate-float"
            style={{
              fontSize: `${Math.random() * 24 + 16}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 2.5}s`,
              animationDuration: `${12 + Math.random() * 16}s`,
            }}
          >
            {i % 3 === 0 ? <FaUserMd /> : i % 3 === 1 ? <FaStethoscope /> : <FaHeartbeat />}
          </div>
        ))}
      </div> 

      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden z-10 transition-all duration-300 hover:shadow-lg">
        <div className="bg-gradient-to-r from-blue-700 to-cyan-700 p-6 text-white text-center relative overflow-hidden">
          <div className={`absolute inset-0 bg-white/10 ${pulse ? 'opacity-20' : 'opacity-0'} transition-opacity duration-1000`}></div>
          <div className="flex justify-center mb-4">
            <FaUserMd className="text-4xl" />
          </div>
          <h1 className="text-2xl font-bold">Doctor Portal</h1>
          <p className="text-blue-100 mt-1">Secure access for medical professionals</p>
        </div>

        <div className="p-8">
          <form className="space-y-5" onSubmit={e => e.preventDefault()}>
            <div className="relative">
              <input
                type="text"
                placeholder=" "
                onChange={(e) => setInputEmail(e.target.value)}
                onFocus={() => setActiveField('email')}
                onBlur={() => setActiveField(null)}
                className={`peer w-full px-4 py-3 border-b-2 bg-transparent focus:outline-none transition-colors duration-300 ${activeField === 'email' ? 'border-cyan-600' : 'border-gray-300'}`}
              />
              <label
                className={`absolute left-4 top-3 text-gray-500 transition-all duration-300 pointer-events-none ${activeField === 'email' || activeField === null ? 'peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base' : 'text-cyan-600 text-sm top-0'}`}
              >
                Doctor Email
              </label>
              <div className={`absolute bottom-0 left-0 h-0.5 bg-cyan-600 transition-all duration-500 ${activeField === 'email' ? 'w-full' : 'w-0'}`}></div>
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder=" "
                onChange={(e) => setInputlicense_number(e.target.value)}
                onFocus={() => setActiveField('License Number')}
                onBlur={() => setActiveField(null)}
                className={`peer w-full px-4 py-3 border-b-2 bg-transparent focus:outline-none transition-colors duration-300 ${activeField === 'password' ? 'border-cyan-600' : 'border-gray-300'}`}
              />
              <label
                className={`absolute left-4 top-3 text-gray-500 transition-all duration-300 pointer-events-none ${activeField === 'password' || activeField === null ? 'peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base' : 'text-cyan-600 text-sm top-0'}`}
              >
                License Number
              </label>
              <div className={`absolute bottom-0 left-0 h-0.5 bg-cyan-600 transition-all duration-500 ${activeField === 'password' ? 'w-full' : 'w-0'}`}></div>
            </div>

            {error && <div className="text-red-600 text-sm text-center">{error}</div>}

            <button
              type="button"
              onClick={async () => {
                try {
                  const { data } = await axios.get(doctorApi);
                  const check = data.filter((elem) => {
                    navigate('/doctorprofile');
                    return inputEmail === elem.contact?.email && inputlicense_number === elem.license_number;
                  });
                  if (check.length > 0) {
                    localStorage.setItem('loggedDoctor', JSON.stringify(check[0]));
                    navigate('/doctorprofile');
                  } else {
                    setError('Invalid email or License Number');
                  }
                } catch (error) {
                  setError('Server error. Please try again.');
                }
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center"
            >
              <FaUserMd className="mr-2" />
              Log In as Doctor
            </button>
          </form>
        </div>

        <div className="bg-gray-50 px-6 py-4 text-center text-xs text-gray-500 border-t border-gray-200">
          <p>Doctor Portal • Encrypted Connection • v1.0.0</p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        .animate-float { animation: float 10s ease-in-out infinite; }
        input:focus ~ label,
        input:not(:placeholder-shown) ~ label {
          transform: translateY(-20px);
          font-size: 0.75rem;
          color: #0891b2;
        }
      `}</style>
    </div>
  );
}

export default DoctorLog;