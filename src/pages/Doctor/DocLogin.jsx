import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
const API_DOCTORS = 'http://localhost:3000/doctors'


const gradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Стилизованные компоненты
const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(-45deg, #e0f7fa, #b2ebf2, #80deea, #4dd0e1);
  background-size: 400% 400%;
  animation: ${gradient} 15s ease infinite;
  font-family: 'Montserrat', sans-serif;
`;

const FormCard = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 96, 100, 0.2);
  width: 90%;
  max-width: 800px;
  margin: 2rem;
`;

const FormTitle = styled.h1`
  color: #006064;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 700;
  font-size: 2.2rem;
  position: relative;
  
  &:after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: #00bcd4;
    margin: 10px auto;
    border-radius: 2px;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #006064;
  font-weight: 600;
  font-size: 0.9rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid #b2ebf2;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s;
  
  &:focus {
    border-color: #00bcd4;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 188, 212, 0.2);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid #b2ebf2;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23006064' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
  
  &:focus {
    border-color: #00bcd4;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 188, 212, 0.2);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid #b2ebf2;
  border-radius: 10px;
  font-size: 1rem;
  min-height: 100px;
  transition: all 0.3s;
  
  &:focus {
    border-color: #00bcd4;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 188, 212, 0.2);
  }
`;

const FormCheckbox = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
  
  input {
    margin-right: 0.5rem;
    width: 18px;
    height: 18px;
    accent-color: #00bcd4;
  }
  
  label {
    color: #006064;
    font-weight: 500;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(45deg, #00796b, #00bcd4);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  display: block;
  width: 100%;
  margin-top: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 96, 100, 0.2);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

const ArrayInputContainer = styled.div`
  margin-bottom: 1rem;
`;

const ArrayInput = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
  
  input {
    flex: 1;
    margin-right: 0.5rem;
  }
  
  button {
    background: #f44336;
    color: white;
    border: none;
    border-radius: 5px;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

const AddButton = styled.button`
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.3rem 0.6rem;
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-top: 0.3rem;
  
  svg {
    margin-right: 0.3rem;
  }
`;

function DocLogin() {

  const navigate = useNavigate ()


  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    specialty: "",
    license_number: "",
    contact: {
      phone: "",
      email: ""
    },
    hospital_affiliation: "",
    years_of_experience: "",
    bio: "",
    education: [""],
    certifications: [""],
    awards: [""],
    patient_success_rate: "",
    telehealth_available: false,
    languages_spoken: [""],
    clinic_affiliation: "",
    avatar: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const addArrayField = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ""]
    }));
  };

  const removeArrayField = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  await registerDoctor(formData);
  navigate("/doctorlog")
};

  const specialties = [
    "Кардиология",
    "Дерматология",
    "Эндокринология",
    "Гастроэнтерология",
    "Неврология",
    "Онкология",
    "Педиатрия",
    "Психиатрия",
    "Радиология",
    "Хирургия"
  ];


  const [ doctors , setDoctors ] = useState ( [] )

  async function getApi() {
    try {
        const { data } = await axios.get ( API_DOCTORS ) 
        setDoctors ( data ) 
    } catch (error) {
        console.error(error);
          
    }
  }

  async function registerDoctor(doctorData) {
  try {
    const { data } = await axios.post(API_DOCTORS, doctorData);
    console.log('Doctor registered:', data);
  } catch (error) {
    console.error('Registration error:', error);
  }
}

  useEffect (( ) => {
    getApi ()
  }, [])
  return (
    <LoginContainer>
      <FormCard>
        <FormTitle>Регистрация врача</FormTitle>
        <form onSubmit={handleSubmit}>
          <FormGrid>
            <FormGroup>
              <FormLabel>Имя *</FormLabel>
              <FormInput
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Фамилия *</FormLabel>
              <FormInput
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Специализация *</FormLabel>
              <FormSelect
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                required
              >
                <option value="">Выберите специализацию</option>
                {specialties.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </FormSelect>
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Номер лицензии *</FormLabel>
              <FormInput
                type="text"
                name="license_number"
                value={formData.license_number}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Телефон *</FormLabel>
              <FormInput
                type="tel"
                name="contact.phone"
                value={formData.contact.phone}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Email *</FormLabel>
              <FormInput
                type="email"
                name="contact.email"
                value={formData.contact.email}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Больница/Учреждение</FormLabel>
              <FormInput
                type="text"
                name="hospital_affiliation"
                value={formData.hospital_affiliation}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Опыт работы (лет)</FormLabel>
              <FormInput
                type="number"
                name="years_of_experience"
                value={formData.years_of_experience}
                onChange={handleChange}
                min="0"
              />
            </FormGroup>
            
            <FormGroup style={{ gridColumn: '1 / -1' }}>
              <FormLabel>О себе</FormLabel>
              <FormTextarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
              />
            </FormGroup>
            
            <ArrayInputContainer style={{ gridColumn: '1 / -1' }}>
              <FormLabel>Образование</FormLabel>
              {formData.education.map((edu, index) => (
                <ArrayInput key={index}>
                  <FormInput
                    type="text"
                    value={edu}
                    onChange={(e) => handleArrayChange('education', index, e.target.value)}
                    placeholder={`Учебное заведение #${index + 1}`}
                  />
                  {formData.education.length > 1 && (
                    <button type="button" onClick={() => removeArrayField('education', index)}>
                      ×
                    </button>
                  )}
                </ArrayInput>
              ))}
              <AddButton type="button" onClick={() => addArrayField('education')}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Добавить образование
              </AddButton>
            </ArrayInputContainer>
            
            <ArrayInputContainer style={{ gridColumn: '1 / -1' }}>
              <FormLabel>Сертификаты</FormLabel>
              {formData.certifications.map((cert, index) => (
                <ArrayInput key={index}>
                  <FormInput
                    type="text"
                    value={cert}
                    onChange={(e) => handleArrayChange('certifications', index, e.target.value)}
                    placeholder={`Сертификат #${index + 1}`}
                  />
                  {formData.certifications.length > 1 && (
                    <button type="button" onClick={() => removeArrayField('certifications', index)}>
                      ×
                    </button>
                  )}
                </ArrayInput>
              ))}
              <AddButton type="button" onClick={() => addArrayField('certifications')}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Добавить сертификат
              </AddButton>
            </ArrayInputContainer>
            
            <ArrayInputContainer style={{ gridColumn: '1 / -1' }}>
              <FormLabel>Награды</FormLabel>
              {formData.awards.map((award, index) => (
                <ArrayInput key={index}>
                  <FormInput
                    type="text"
                    value={award}
                    onChange={(e) => handleArrayChange('awards', index, e.target.value)}
                    placeholder={`Награда #${index + 1}`}
                  />
                  {formData.awards.length > 1 && (
                    <button type="button" onClick={() => removeArrayField('awards', index)}>
                      ×
                    </button>
                  )}
                </ArrayInput>
              ))}
              <AddButton type="button" onClick={() => addArrayField('awards')}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Добавить награду
              </AddButton>
            </ArrayInputContainer>
            
            <FormGroup>
              <FormLabel>Успешность лечения (%)</FormLabel>
              <FormInput
                type="number"
                name="patient_success_rate"
                value={formData.patient_success_rate}
                onChange={handleChange}
                min="0"
                max="100"
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Клиника</FormLabel>
              <FormInput
                type="text"
                name="clinic_affiliation"
                value={formData.clinic_affiliation}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup style={{ gridColumn: '1 / -1' }}>
              <FormLabel>Аватар (URL)</FormLabel>
              <FormInput
                type="url"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                placeholder="https://example.com/avatar.jpg"
              />
            </FormGroup>
            
            <FormCheckbox style={{ gridColumn: '1 / -1' }}>
              <input
                type="checkbox"
                name="telehealth_available"
                checked={formData.telehealth_available}
                onChange={handleChange}
              />
              <label>Доступны телеконсультации</label>
            </FormCheckbox>
            
            <ArrayInputContainer style={{ gridColumn: '1 / -1' }}>
              <FormLabel>Владение языками</FormLabel>
              {formData.languages_spoken.map((lang, index) => (
                <ArrayInput key={index}>
                  <FormInput
                    type="text"
                    value={lang}
                    onChange={(e) => handleArrayChange('languages_spoken', index, e.target.value)}
                    placeholder={`Язык #${index + 1}`}
                  />
                  {formData.languages_spoken.length > 1 && (
                    <button type="button" onClick={() => removeArrayField('languages_spoken', index)}>
                      ×
                    </button>
                  )}
                </ArrayInput>
              ))}
              <AddButton type="button" onClick={() => addArrayField('languages_spoken')}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Добавить язык
              </AddButton>
            </ArrayInputContainer>
          </FormGrid>
          
          <SubmitButton type="submit">Завершить регистрацию</SubmitButton>

          <button type="button" className="btn btn-secondary mt-4 w-full" onClick={() => navigate('/doctorlog')}>
            У меня есть аккаунт
          </button>

</form>
      </FormCard>
    </LoginContainer>
  );
}
export default DocLogin;