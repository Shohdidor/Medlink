import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:3000/patients";

function Registration() {
  const navigate = useNavigate();

  const [patientData, setPatientData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    contact: {
      phone: '',
      email: ''
    },
    avatar : null,
    premium : false,
    password: '',        
    confirmPassword: ''  
  });

  async function getPatientsFromApi() {
    try {
      const { data } = await axios.get(API_URL);
      console.log("Existing patients from API:", data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setPatientData(prevData => ({
      ...prevData,
      contact: {
        ...prevData.contact,
        [name]: value
      }
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (patientData.password !== patientData.confirmPassword) {
      alert('Пароли не совпадают! Пожалуйста, проверьте.');
      return;
    }
    if (patientData.password.length < 6) {
        alert('Пароль должен содержать не менее 6 символов.');
        return;
    }

    const patientToSend = {
      first_name: patientData.firstName,
      last_name: patientData.lastName,
      date_of_birth: patientData.dateOfBirth,
      gender: patientData.gender,
      contact: patientData.contact,
      address: patientData.address,
      avatar : patientData.avatar,
      password: patientData.password,
      premium: patientData.premium
    };

    console.log('Attempting to send:', patientToSend);

    try {
      const response = await axios.post(API_URL, patientToSend);

      console.log('Registration successful:', response.data);
      alert('Регистрация прошла успешно!'); 

      setPatientData({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        contact: {
          phone: '',
          email: ''
        },
        avatar : null,
        password: '',
        premium : false ,
        confirmPassword: ''
      });

      navigate("/login");

    } catch (error) {
      console.error('Ошибка регистрации:', error.response ? error.response.data : error.message);
      alert(`Ошибка регистрации: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
    }
  };

  useEffect(() => {
    getPatientsFromApi();
  }, []);

  return (
    <div className="registration-container">
      <form className="registration-form" onSubmit={handleSubmit}>
        <h1 className="form-title">Регистрация Пациента</h1>

        <div className="form-section">
          <h2 className="section-title">Личная Информация</h2>
            <div className="form-group">
              <label htmlFor="firstName">Фото профиля</label>
              <input
                type="text"
                id='avatar'
                name='avatar'
                value={patientData.avatar}
                onChange={handleChange}
                placeholder="URL фото"
                required
              />
            </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">Имя:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={patientData.firstName}
                onChange={handleChange}
                placeholder="Введите ваше имя"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Фамилия:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={patientData.lastName}
                onChange={handleChange}
                placeholder="Введите вашу фамилию"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dateOfBirth">Дата рождения:</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={patientData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Пол:</label>
              <select
                id="gender"
                name="gender"
                value={patientData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Выберите пол</option>
                <option value="Мужской">Мужской</option>
                <option value="Женский">Женский</option>
              </select>
            </div>
          </div>
        </div>

        {/* --- Account Credentials Section (NEW) --- */}
        <div className="form-section">
          <h2 className="section-title">Учетные данные</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Пароль:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={patientData.password}
                onChange={handleChange}
                placeholder="Введите пароль"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Подтвердите пароль:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={patientData.confirmPassword}
                onChange={handleChange}
                placeholder="Повторите пароль"
                required
              />
            </div>
          </div>
        </div>

        {/* --- Contact Information Section --- */}
        <div className="form-section">
          <h2 className="section-title">Контактная Информация</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Телефон:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={patientData.contact.phone}
                onChange={handleContactChange}
                placeholder="+7 (XXX) XXX-XX-XX"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={patientData.contact.email}
                onChange={handleContactChange}
                placeholder="ваша.почта@example.com"
              />
            </div>
          </div>
        </div>

        <button type="submit" className="submit-button">Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default Registration;