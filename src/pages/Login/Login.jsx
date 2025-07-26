let api = "http://localhost:3000/patients"

import React, { useState, useEffect, useRef } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { RiStethoscopeLine } from "react-icons/ri";
import { BsHospital } from "react-icons/bs";
import axios from "axios";
import { data, useNavigate } from "react-router-dom";



async function getApi () {
  try {
    const { data } = await axios.get ( api )
    console.log( data );
  } catch (error) {
    console.error(error);
  }
}


function Login() {
  let navigate = useNavigate ()
  
  
  const [activeField, setActiveField] = useState(null);
  const [ inputEmail , setInputEmail ] = useState (null)
  const [ inputPassword , setInputPassword ] = useState (null)
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    getApi ()
    const interval = setInterval(() => {
      setPulse(prev => !prev);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-500 to-teal-900 font-sans">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-blue-100/70 animate-float"
            style={{
              fontSize: `${Math.random() * 24 + 16}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 3}s`,
              animationDuration: `${15 + Math.random() * 20}s`,
            }}
          >
            {Math.random() > 0.5 ? (
              <RiStethoscopeLine />
            ) : (
              <AiOutlineMedicineBox />
            )}
          </div>
        ))}
      </div>

      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden z-10 transition-all duration-300 hover:shadow-lg">
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-6 text-white text-center relative overflow-hidden">
          <div className={`absolute inset-0 bg-white/10 ${pulse ? 'opacity-20' : 'opacity-0'} transition-opacity duration-1000`}></div>
          <div className="flex justify-center mb-4">
            <BsHospital className="text-4xl" />
          </div>
          <h1 className="text-2xl font-bold">Medlink</h1>
          <p className="text-blue-100 mt-1">Безопасный доступ к медицинским сервисам</p>
        </div>

        <div className="p-8">
          <form className="space-y-5">
            <div className="relative">
              <input
                type="text"
                placeholder=" "
                onChange={(e) => setInputEmail(e.target.value)} // ✅
                onFocus={() => setActiveField('username')}
                onBlur={() => setActiveField(null)}
                className={`peer w-full px-4 py-3 border-b-2 bg-transparent focus:outline-none transition-colors duration-300 ${
                  activeField === 'username' ? 'border-teal-500' : 'border-gray-300'
                }`}
              />
              <label
                className={`absolute left-4 top-3 text-gray-500 transition-all duration-300 pointer-events-none ${
                  activeField === 'username' || activeField === null
                    ? 'peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base'
                    : 'text-teal-500 text-sm top-0'
                }`}
              >
                Email пользователя
              </label>
              <div
                className={`absolute bottom-0 left-0 h-0.5 bg-teal-500 transition-all duration-500 ${
                  activeField === 'username' ? 'w-full' : 'w-0'
                }`}
              ></div>
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder=" "
                onChange={(e) => setInputPassword(e.target.value)} // ✅
                onFocus={() => setActiveField('password')}
                onBlur={() => setActiveField(null)}
                className={`peer w-full px-4 py-3 border-b-2 bg-transparent focus:outline-none transition-colors duration-300 ${
                  activeField === 'password' ? 'border-teal-500' : 'border-gray-300'
                }`}
              />
              <label
                className={`absolute left-4 top-3 text-gray-500 transition-all duration-300 pointer-events-none ${
                  activeField === 'password' || activeField === null
                    ? 'peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base'
                    : 'text-teal-500 text-sm top-0'
                }`}
              >
                Пароль
              </label>
              <div
                className={`absolute bottom-0 left-0 h-0.5 bg-teal-500 transition-all duration-500 ${
                  activeField === 'password' ? 'w-full' : 'w-0'
                }`}
              ></div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <span className="ml-2">Запомнить меня</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Забыли пароль?
              </a>
            </div>

            <button
  type="button"
  onClick={async () => {
    try {
      const { data } = await axios.get(api);
      const check = data.filter((elem) => {
        return inputEmail == elem.contact.email && inputPassword == elem.password;
      });
      
      if (check.length > 0) {
        // Clear guest mode if it exists
        localStorage.removeItem('guestMode');
        
        // Set the logged in user
        localStorage.setItem("loggedUser", JSON.stringify(check[0]));
        navigate("/menu");
      } else {
        // Handle invalid credentials
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed. Please try again.");
    }
  }}
  className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-teal-600 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center"
>
  <RiStethoscopeLine className="mr-2" />
  Войти
</button>

            <div className="relative flex items-center justify-center my-6">
              <div className="absolute inset-0 border-t border-gray-300"></div>
              <div className="relative bg-white px-4 text-gray-500">или продолжить через</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 text-gray-700 hover:bg-gray-50 transition-colors duration-300"
              >
                <FcGoogle className="text-xl" />
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 text-gray-700 hover:bg-gray-50 transition-colors duration-300"
              >
                <AiOutlineMedicineBox className="text-xl text-blue-500" />
                EHR Connect
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Нет аккаунта?{' '}
            <a href="#" onClick={()=> navigate("/registration")} className="text-blue-600 hover:underline font-medium">
              Создать новый аккаунт
            </a>
          </div>
        </div>

        {/* Нижний колонтитул */}
        <div className="bg-gray-50 px-6 py-4 text-center text-xs text-gray-500 border-t border-gray-200">
          <p>Соответствие HIPAA • Зашифрованное соединение • v2.4.1</p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }

        input:focus ~ label,
        input:not(:placeholder-shown) ~ label {
          transform: translateY(-20px);
          font-size: 0.75rem;
          color: #0d9488;
        }
      `}</style>
    </div>
  );
}

export default Login;
