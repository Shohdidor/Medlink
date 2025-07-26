import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// Animation for bubbles
const bubble = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
  }
`;

// Styled components
const MedicalContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 50%, #80deea 100%);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
`;

const Bubbles = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  top: 0;
  left: 0;
`;

const Bubble = styled.span`
  position: absolute;
  bottom: -100px;
  background: #8FB3E2;
  border-radius: 50%;
  animation: ${bubble} 15s linear infinite;
  
  &:nth-child(1) {
    width: 40px;
    height: 40px;
    left: 10%;
    animation-duration: 8s;
  }
  
  &:nth-child(2) {
    width: 20px;
    height: 20px;
    left: 20%;
    animation-duration: 5s;
    animation-delay: 1s;
  }
  
  &:nth-child(3) {
    width: 50px;
    height: 50px;
    left: 35%;
    animation-duration: 7s;
    animation-delay: 2s;
  }
  
  &:nth-child(4) {
    width: 80px;
    height: 80px;
    left: 50%;
    animation-duration: 11s;
    animation-delay: 0s;
  }
  
  &:nth-child(5) {
    width: 35px;
    height: 35px;
    left: 55%;
    animation-duration: 6s;
    animation-delay: 1s;
  }
  
  &:nth-child(6) {
    width: 45px;
    height: 45px;
    left: 65%;
    animation-duration: 8s;
    animation-delay: 3s;
  }
  
  &:nth-child(7) {
    width: 25px;
    height: 25px;
    left: 75%;
    animation-duration: 7s;
    animation-delay: 2s;
  }
  
  &:nth-child(8) {
    width: 80px;
    height: 80px;
    left: 80%;
    animation-duration: 6s;
    animation-delay: 1s;
  }
  
  &:nth-child(9) {
    width: 15px;
    height: 15px;
    left: 70%;
    animation-duration: 9s;
    animation-delay: 0s;
  }
  
  &:nth-child(10) {
    width: 50px;
    height: 50px;
    left: 85%;
    animation-duration: 5s;
    animation-delay: 3s;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #006064;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
  z-index: 1;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ChoiceButton = styled.button`
  padding: 1.5rem 3rem;
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 20px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(-2px);
  }
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: 0.5s;
  }
  
  &:hover:before {
    left: 100%;
  }
`;

const DoctorButton = styled(ChoiceButton)`
  background: linear-gradient(45deg, #00796b, #00bcd4);
  color: white;
`;

const UserButton = styled(ChoiceButton)`
  background: linear-gradient(45deg, #00838f, #4fb3bf);
  color: white;
`;

const UserButton2 = styled(ChoiceButton)`
  background: linear-gradient(45deg, #4a5c6a, #9ba8ab);
  color: white;
`;

const MedicalSymbol = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 2rem;
  color: #006064;
  z-index: 1;
`;

function Choice() {

   const navigate = useNavigate();

    const handleGuestLogin = () => {
        localStorage.setItem('guestMode', 'guest');
        navigate("/menu");
    };

  return (
    <MedicalContainer>
            <MedicalSymbol>⚕</MedicalSymbol>
            <Bubbles>
                {[...Array(10)].map((_, i) => (
                    <Bubble key={i} />
                ))}
            </Bubbles>
            
            <Title>Кто вы?</Title>
            
            <ButtonContainer>
                <DoctorButton onClick={() => navigate("/doclogin")}>
                    Я Доктор
                </DoctorButton>
                <UserButton onClick={() => navigate("/login")}>
                    Я Пользователь
                </UserButton>
                <UserButton2 onClick={handleGuestLogin}>
                    Зайти как гость
                </UserButton2>
            </ButtonContainer>
        </MedicalContainer>
  );
}

export default Choice;