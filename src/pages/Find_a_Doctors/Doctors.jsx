import React, { useState, useEffect } from "react";
import { FaSearch, FaUserMd } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import IdeoGram from "../../video/images/bacj.jpg";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const api = "http://localhost:3000/doctors";

function Doctors() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpen2, setIsDialogOpen2] = useState(false);
  const [selectedDoctor2, setSelectedDoctor2] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [customers, setCustomers] = useState([]);

  const [idx, setIdx] = useState(null);
  const [nameOfDoctors, setNameOfDoctors] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [filter, setFilter] = useState("Все");
  const [query, setQuery] = useState("");

  const [isRecordsDialogOpen, setIsRecordsDialogOpen] = useState(false);
  const [recordsDoctor, setRecordsDoctor] = useState(null);

  const isGuest = localStorage.getItem('guestMode') === 'guest';

  async function getApi() {
    try {
      const { data } = await axios.get(api);
      setDoctors(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getApi();
    window.scrollTo(0, 0);
  }, []);

  const specialties = ["Все", ...new Set(doctors.map((doc) => doc.specialty))];

  const filteredDoctors = doctors.filter((doc) => {
    const matchName = `${doc.first_name} ${doc.last_name}`
      .toLowerCase()
      .trim()
      .includes(query.toLowerCase().trim());
    const matchSpecialty = filter === "Все" || doc.specialty === filter;
    return matchName && matchSpecialty;
  });

  return (
    <div className=" min-h-screen">
      <div
        className="fixed inset-0"
        style={{
          backgroundImage: `url(${IdeoGram})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>

      <div className="relative z-10">
        <div className="h-screen flex flex-col justify-center pt-32 pb-20 px-6 sm:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center mb-10"
          >
            <div className="bg-white/20 p-4 rounded-full mb-6">
              <FaUserMd className="text-3xl text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-3">
              Найдите своего врача
            </h1>
            <p className="text-xl text-blue-100 text-center max-w-2xl">
              Подберите специалиста по 100+ параметрам в нашей базе
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-xl shadow-2xl max-w-4xl mx-auto overflow-hidden"
          >
            <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-200">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <FaSearch className="text-blue-400 text-xl" />
                </div>
                <input
                  type="text"
                  placeholder="Введите имя врача, специализацию или симптомы..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-5 text-lg border-none focus:ring-0 placeholder-gray-400"
                />
              </div>

              <div className="relative group">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="appearance-none w-full px-4 pr-10 py-5 text-lg border-none focus:ring-0 bg-gray-50 cursor-pointer"
                >
                  {specialties.map((spec, i) => (
                    <option key={i} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 text-lg font-medium transition-all flex items-center justify-center gap-2"
              >
                Поиск
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </motion.button>
            </div>
          </motion.div>
        </div>

        <div className="bg-white pt-20 pb-32 px-6 sm:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 mb-[250px] lg:mb-[110px] lg:grid-cols-3 gap-8">
              {filteredDoctors.reverse().map((doctor) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all border border-gray-200"
                >
                  <Link to={`/menu/info/${doctor.id}`}>
                    <div className="bg-blue-800 text-white p-6 relative">
                      <div className="absolute top-6 right-6 bg-white text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {doctor.years_of_experience}+ лет опыта
                      </div>
                      <h3 className="text-2xl font-bold">Лицензия</h3>
                      <p className="text-blue-200">{doctor.license_number}</p>
                    </div>
                  
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-50 h-50 border-2 border-blue-900">
                        <img
                          src={
                            doctor.avatar ||
                            "https://i.pinimg.com/736x/3a/7a/0b/3a7a0b3e3e3e3e3e3e3e3e3e3e3e3e3e.jpg"
                          }
                          alt={doctor.first_name}
                          className="w-full h-full object-cover hover:opacity-80 cursor-pointer"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {doctor.first_name} {doctor.last_name}
                        </h3>
                        <p className="text-blue-600 font-medium">
                          {doctor.specialty}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-gray-500 text-sm">Контакт</p>
                        <p className="font-medium">{doctor.contact?.phone}</p>
                        <p className="text-blue-600">{doctor.contact?.email}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Место работы</p>
                        <p className="font-medium">{doctor.hospital_affiliation}</p>
                      </div>
                      <div className="pt-4 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500">Успешность лечения</span>
                          <span className="font-bold text-blue-600">{doctor.patient_success_rate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${doctor.patient_success_rate}%` }}
                          ></div>
                        </div>
                      </div>
                      <div
                        className="mt-4 p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 text-blue-700 font-medium text-center"
                        onClick={e => {
                          e.preventDefault();
                          setRecordsDoctor(doctor);
                          setIsRecordsDialogOpen(true);
                        }}
                      >
                        Записи
                      </div>
                    </div>
                  </div>

                  </Link>
                  <div className="p-6 pt-0">
                    <button
                      onClick={() => {
                        if (isGuest) {
                          alert('Эта функция недоступна для гостей. Пожалуйста, войдите в систему.');
                          return;
                        }
                        setSelectedDoctor(doctor);
                        setIsDialogOpen(true);
                        setIdx(doctor.id);
                        setNameOfDoctors(
                          doctor.first_name + " " + doctor.last_name
                        );
                      }}
                      className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                    >
                      Записаться на прием
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {isDialogOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full transform transition-all duration-300 scale-100 opacity-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Записаться к {nameOfDoctors}?
              </h3>
              <p className="text-gray-600 mb-6 text-center">
                Вы действительно хотите записаться на приём к этому доктору?
              </p>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="px-6 py-3 rounded-lg text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors duration-200 font-medium"
                >
                  Отмена
                </button>

                <button
                  onClick={async () => {
                    async function addNewObj(idx, updatedDoctor) {
                      try {
                        await axios.put(`${api}/${idx}`, updatedDoctor);
                        getApi(); // refresh the doctor list from server
                      } catch (error) {
                        console.error("Ошибка при обновлении врача:", error);
                      }
                    }
                    setIsDialogOpen(false);

                    const doctor = doctors.find((doc) => doc.id === idx);
                    if (!doctor) {
                      alert("ID врача не найден.");
                      return;
                    }

                    const currentUser = JSON.parse(
                      localStorage.getItem("loggedUser")
                    );
                    const previousCustomers = Array.isArray(doctor.customers)
                      ? doctor.customers
                      : [];

                    const alreadyRegistered = previousCustomers.some(
                      (c) => c.id === currentUser.id
                    );
                    if (alreadyRegistered) {
                      alert("Вы уже записаны к этому врачу.");
                      return;
                    }

                    const updatedDoctor = {
                      ...doctor,
                      customers: [...previousCustomers, currentUser],
                    };

                    alert("Запись прошла успешно!");
                    await addNewObj(idx, updatedDoctor);
                  }}
                  className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 font-medium shadow-md"
                >
                  Записаться
                </button>
              </div>
            </div>
          </div>
        )}

        {isDialogOpen2 && (
          <div className="space-y-2 px-4 py-6">
            <h1>Имя: {doctor.first_name}</h1>
            <h1>Фамилия: {doctor.last_name}</h1>
            <h1>Специальность: {doctor.specialty}</h1>
            <h1>Номер лицензии: {doctor.license_number}</h1>
            <h1>Телефон: {doctor.contact.phone}</h1>
            <h1>Email: {doctor.contact.email}</h1>
            <h1>Больница: {doctor.hospital_affiliation}</h1>
            <h1>Стаж: {doctor.years_of_experience} лет</h1>
            <h1>О докторе: {doctor.bio}</h1>

            {/* Образование */}
            {doctor.education?.map((edu, i) => (
              <h1 key={`edu-${i}`}>Образование: {edu}</h1>
            ))}

            {/* Сертификаты */}
            {doctor.certifications?.map((cert, i) => (
              <h1 key={`cert-${i}`}>Сертификат: {cert}</h1>
            ))}

            {/* Награды */}
            {doctor.awards?.map((award, i) => (
              <h1 key={`award-${i}`}>Награда: {award}</h1>
            ))}

            <h1>Рейтинг успешности: {doctor.patient_success_rate}%</h1>
            <h1>
              Телемедицина: {doctor.telehealth_available ? "Доступна" : "Нет"}
            </h1>

            {/* Языки */}
            {doctor.languages_spoken?.map((lang, i) => (
              <h1 key={`lang-${i}`}>Язык: {lang}</h1>
            ))}

            <h1>Клиника: {doctor.clinic_affiliation}</h1>
            <h1>Национальность: {doctor.nationality}</h1>

            {/* Клиенты */}
            {doctor.customers?.map((cust, i) => (
              <div key={`cust-${i}`} className="mt-4">
                <h1>
                  Пациент: {cust.first_name} {cust.last_name}
                </h1>
                <h1>Дата рождения: {cust.date_of_birth}</h1>
                <h1>Пол: {cust.gender}</h1>
                <h1>Телефон: {cust.contact.phone}</h1>
                <h1>Email: {cust.contact.email}</h1>
              </div>
            ))}
          </div>
        )}
      </div>
      {isRecordsDialogOpen && recordsDoctor && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-lg w-full transform transition-all duration-300 scale-100 opacity-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Записавшиеся к {recordsDoctor.first_name} {recordsDoctor.last_name}
            </h3>
            {Array.isArray(recordsDoctor.customers) && recordsDoctor.customers.length > 0 ? (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {recordsDoctor.customers.map((cust, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 border rounded-lg shadow-sm">
                    <img
                      src={cust.avatar || 'https://i.pinimg.com/736x/87/22/ec/8722ec261ddc86a44e7feb3b46836c10.jpg'}
                      alt={cust.first_name}
                      className="w-16 h-16 rounded-full object-cover border"
                    />
                    <div>
                      <div className="font-bold text-lg">{cust.first_name} {cust.last_name}</div>
                      <div className="text-gray-600 text-sm">Email: {cust.contact?.email || 'Не указан'}</div>
                      <div className="text-gray-600 text-sm">Телефон: {cust.contact?.phone || 'Не указан'}</div>
                      <div className="text-gray-600 text-sm">Дата рождения: {cust.date_of_birth || 'Не указана'}</div>
                      <div className="text-gray-600 text-sm">Пол: {cust.gender || 'Не указан'}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500">Нет записавшихся пользователей.</div>
            )}
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setIsRecordsDialogOpen(false)}
                className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 font-medium shadow-md"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Doctors;
