import React, { useEffect } from 'react';
import { FaUserMd, FaPills, FaStethoscope, FaHeartbeat, FaSearch, FaPhone } from 'react-icons/fa';
import { FaClinicMedical, FaUserFriends, FaMobileAlt, FaShieldAlt } from 'react-icons/fa'; // Added FaMobileAlt
import { FaBrain, FaChild, FaMicroscope } from 'react-icons/fa';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useNavigate } from 'react-router-dom';


let userData = localStorage.getItem ("loggedUser")
console.log(userData);




function Menu() {
  const navigate = useNavigate ()
  const menuItems = [
    { title: 'Найти врача', icon: <FaUserMd />, description: 'Поиск специалистов по всему миру.' },
    { title: 'Заказать лекарства', icon: <FaPills />, description: 'Проверенные аптеки. Быстрая доставка.' },
    { title: 'Виртуальный осмотр', icon: <FaStethoscope />, description: 'Предварительная диагностика из дома.' },
    { title: 'Купить premium', icon: <FaHeartbeat />, description: 'Первый в очереди и когда нужен не просто врач, а лучший. Всегда. Только с Premium.' },
    { title: 'Умный поиск', icon: <FaSearch />, description: 'Фильтры по врачам, услугам и клиникам.' },
    { title: 'Экстренная связь', icon: <FaPhone />, description: 'Быстрое подключение в неотложных случаях.' },
  ];

  const chooseUsItems = [
    {
      icon: <FaUserFriends />,
      title: 'Команда Экспертов',
      description: 'Доступ к ведущим специалистам мира, готовым помочь 24/7.'
    },
    {
      icon: <FaMobileAlt />,
      title: 'Удобство и Доступность',
      description: 'Медицинские услуги всегда под рукой через наш интуитивный интерфейс.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Надежность и Безопасность',
      description: 'Строжайшие стандарты защиты данных и качества обслуживания.'
    }
  ];

  useEffect (()=> {
    window.scrollTo(0,0)
  }, [])

  const isGuest = localStorage.getItem('guestMode') === 'guest';

  return (
    <>
      <div className="relative">
        <video muted loop autoPlay className="lg:block hidden inset-0 w-full h-full object-cover z-[-1]">
          <source src='src/video/YouTube Saved My Medical Career _ A Cinematic Short Film.mp4' type='video/mp4'/>
        </video>

        <section className="lg:mt-[-800px] bg-gradient-to-t from-blue-400 to-white lg:mb-[100px] py-20 px-4">
          <div className="max-w-7xl mx-auto text-center mb-12">
            <h2 className="text-4xl lg:text-[100px] text-blue-400 font-extrabold mb-4">
              Medlink
            </h2>
            <p className="hidden lg:block text-white text-lg md:text-xl">
              Всё, что нужно для заботы о здоровье — в одном месте.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {menuItems.map((item , index ) => (
              <div key={index}
              onClick={()=> {
                if (isGuest && (item.title == "Найти врача" || item.title == "Виртуальный осмотр" || item.title == "Заказать лекарства")) {
                  alert('Эта функция недоступна для гостей. Пожалуйста, войдите в систему.');
                  return;
                }
                if (item.title == "Найти врача") {
                  navigate("/menu/doctors")
                }
                if ( item.title == "Виртуальный осмотр" ){
                  navigate ("/menu/videocall")
                }
                
                if ( item.title == "Купить premium" ){
                  navigate ("/menu/premium")
                }
                if ( item.title == "Заказать лекарства" ){
                  navigate ("/menu/orderdrugs")
                }
                if ( item.title == "Экстренная связь" ){
                  navigate ("/menu/call")
                }
                
              }}
                className="relative overflow-hidden group backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.15)] transition-all duration-500 cursor-pointer before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:via-white/5 before:to-transparent before:opacity-70 hover:before:opacity-100 hover:before:via-white/20 hover:before:transition-all hover:before:duration-500"
              >
                <div className="absolute top-0 right-0 w-32 h-32 -mr-10 -mt-10 bg-white/5 rounded-full filter blur-lg"></div>

                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full transition-all duration-700 opacity-0 group-hover:opacity-100">
                    <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-[shine_1.5s_infinite]"></div>
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="text-blue-400/90 text-4xl mb-4 drop-shadow-md">{item.icon}</div>
                  <h3 className="text-xl font-semibold lg:text-white mb-2">{item.title}</h3>
                  <p className="lg:text-gray-200/90">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="grid grid-cols-2 gap-6 w-full lg:w-1/2">
            <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                src="src/video/images/reckless _ winter hamilton.jpeg"
                alt="Doctor 1"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                src="src/video/images/Без названия (77).jpeg"
                alt="Doctor 2"
              />
            </div>
            <div className="col-span-2 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                src="src/video/images/Без названия (78).jpeg"
                alt="Doctor 3"
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Наши <span className="text-blue-500">специалисты</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Наша команда состоит из высококвалифицированных врачей с международным опытом работы.
              Мы объединяем лучших специалистов в различных областях медицины, чтобы обеспечить
              комплексный подход к вашему здоровью.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 p-2 rounded-lg">
                  <FaUserMd className="text-blue-500 text-xl" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-800">Индивидуальный подход</h4>
                  <p className="text-gray-600">Персональный врач для каждого пациента</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 p-2 rounded-lg">
                  <FaClinicMedical className="text-blue-500 text-xl" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-800">Современное оборудование</h4>
                  <p className="text-gray-600">Диагностика с использованием новейших технологий</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 p-2 rounded-lg">
                  <FaShieldAlt className="text-blue-500 text-xl" />
                </div>
                <div className="ml-4 mb-5">
                  <h4 className="text-lg font-semibold text-gray-800">Безопасность</h4>
                  <p className="text-gray-600">Строгие стандарты гигиены и стерильности</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                if (isGuest) {
                  alert('Эта функция недоступна для гостей. Пожалуйста, войдите в систему.');
                  return;
                }
                navigate("/menu/doctors")
              }}
              className="flex items-center bg-transparent text-blue-700 cursor-pointer font-sans font-bold text-base leading-normal no-underline uppercase outline-none border-0 p-4 before:content-[''] before:inline-block before:bg-blue-700 before:h-px before:mr-2.5 before:transition-all before:duration-300 before:ease-[cubic-bezier(0.25,0.8,0.25,1)] before:w-0 hover:before:w-12 hover:before:bg-blue-600"
            >
              Записаться на прием
            </button>
          </div>
        </div>
      </div>

      {/* --- */}

      <section className="bg-gradient-to-br from-blue-500 to-indigo-700 py-20 px-4 text-white relative overflow-hidden">
        {/* Background blobs for visual interest */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 drop-shadow-lg leading-tight">
            Почему выбирают <span className="text-teal-200">Medlink?</span>
          </h2>
          <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto opacity-90">
            Мы предлагаем инновационные решения для вашего здоровья, сочетая передовые технологии и индивидуальный подход.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {chooseUsItems.map((item, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-8 transform transition-all duration-500 hover:scale-105 hover:bg-white/20 shadow-xl border border-white/20 group animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }} // Staggered animation
              >
                <div className="text-5xl text-teal-300 mb-6 group-hover:text-teal-200 transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 leading-snug">{item.title}</h3>
                <p className="text-gray-200 opacity-90 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---  */}

<div className="mb-0 lg:mt-[100px] p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
  <div className="flex items-center mb-4">
    <img 
      src="https://i.pinimg.com/736x/68/f1/50/68f150cc42da8665512a9ec2f6b3781b.jpg" 
      alt="User avatar"
      className="w-14 h-14 rounded-full object-cover border-2 border-pink-200 shadow-sm"
    />
    <div className="ml-4">
      <div className="flex items-baseline">
        <h2 className="text-xl cursor-default font-bold text-gray-800">Katya</h2>
        <a
          className="ml-2 cursor-pointer text-pink-500 text-sm hover:underline"
        >
          @katyyaaa
        </a>
      </div>
      <span className="text-xs text-gray-500 cursor-default">Joined June 2023</span>
    </div>
  </div>

  <p className="text-gray-700 cursor-default mb-6 leading-relaxed">
    Today is my first day of <a className="cursor-pointer text-blue-500 hover:underline">@_buildspace</a> school 🎒 A place where you turn your ideas into reality and make friends along the way 😊 <a className="text-blue-500 cursor-pointer hover:underline">buildspace.so</a>
  </p>

  <div className="rounded-xl overflow-hidden bg-gray-50 p-4">

<Swiper
  modules={[Navigation, Pagination, Scrollbar, A11y]}
  spaceBetween={20}
  slidesPerView={1}
  breakpoints={{
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 1,
    }
  }}
  pagination={{ clickable: true }}
  className="rounded-lg"
>
  <SwiperSlide>
    <div className="h-72 rounded-lg flex items-center justify-center">
      <img 
        src="https://i.pinimg.com/736x/d1/8c/02/d18c020bba44a7715eb6656b6a76c0f6.jpg" 
        className="h-72 object-cover rounded-md"
        alt="Slide 1"
      />
    </div>
  </SwiperSlide>

  <SwiperSlide>
    <div className="h-72nded-lg flex items-center justify-center">
      <img 
        src="https://i.pinimg.com/736x/1c/ce/ae/1cceae04e3a199c2cff47d912897e26b.jpg" 
        className="h-72 object-cover rounded-md"
        alt="Slide 2"
      />
    </div>
  </SwiperSlide>

  <SwiperSlide>
    <div className="h-72unded-lg flex items-center justify-center">
      <img 
        src="https://i.pinimg.com/736x/3c/67/77/3c67773b34b232e87b348becd6cef8b8.jpg" 
        className="h-72 object-cover rounded-md"
        alt="Slide 3"
      />
    </div>
  </SwiperSlide>

  <SwiperSlide>
    <div className="h-72 rounded-lg flex items-center justify-center">
      <img 
        src="https://i.pinimg.com/736x/99/49/cb/9949cbd179be48f34511bdecfffc250b.jpg" 
        className="h-72 object-cover rounded-md"
        alt="Slide 4"
      />
    </div>
  </SwiperSlide>
</Swiper>

  </div>
  <div className="flex justify-between mt-6 pt-4 border-t border-gray-100 text-gray-500">
    <button className="flex items-center hover:text-pink-500">
      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      24
    </button>
    <button className="flex items-center hover:text-blue-500">
      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      8
    </button>
    <button className="flex items-center hover:text-green-500">
      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
      Share
    </button>
  </div>
</div>




<section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">

  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full opacity-20 mix-blend-multiply filter blur-3xl"></div>
  <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-100 rounded-full opacity-20 mix-blend-multiply filter blur-3xl"></div>
  
  <div className="max-w-7xl mx-auto relative z-10">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Мы всегда <span className="text-blue-500">готовы помочь</span>
      </h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        Свяжитесь с нами удобным для вас способом - мы доступны 24/7 для вашего здоровья
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-red-500">
        <div className="text-red-500 text-4xl mb-4">
          <FaPhone />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Экстренная помощь</h3>
        <p className="text-gray-600 mb-4">
          Немедленная связь с медицинским персоналом в критических ситуациях
        </p>
        <a
        onClick={()=> navigate("/menu/call")}
          className="inline-block cursor-pointer bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
        >
          Позвонить сейчас
        </a>
      </div>

      {/* Appointment */}
      <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-500">
        <div className="text-blue-500 text-4xl mb-4">
          <FaUserMd />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Запись на прием</h3>
        <p className="text-gray-600 mb-4">
          Запишитесь на консультацию к нашим специалистам в удобное время
        </p>
        <a
        onClick={()=>{
          if (isGuest) {
            alert('Эта функция недоступна для гостей. Пожалуйста, войдите в систему.');
            return;
          }
          navigate("/menu/doctors");
        }}
          className="inline-block cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
        >
          Записаться онлайн
        </a>
      </div>

      {/* Support */}
      <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-green-500">
        <div className="text-green-500 text-4xl mb-4">
          <FaUserFriends />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Поддержка пациентов</h3>
        <p className="text-gray-600 mb-4">
          Ответим на все ваши вопросы и поможем с организацией лечения
        </p>
        <a onClick={ ()=> {
           if (isGuest) {
            alert('Эта функция недоступна для гостей. Пожалуйста, войдите в систему.');
            return;
          }
        }}
          className="inline-block cursor-pointer bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
        >
          Написать в поддержку
        </a>
      </div>
    </div>

    <div className="mt-16 text-center">
      <div className="inline-flex flex-col sm:flex-row items-center justify-center bg-white rounded-full px-8 py-4 shadow-md">
        <div className="flex items-center mb-4 sm:mb-0 sm:mr-8">
          <FaShieldAlt className="text-blue-500 text-xl mr-2" />
          <span className="text-gray-700">100% конфиденциальность</span>
        </div>
        <div className="flex items-center">
          <FaClinicMedical className="text-blue-500 text-xl mr-2" />
          <span className="text-gray-700">Лицензированная медицинская организация</span>
        </div>
      </div>
    </div>
  </div>
</section>



    </>
  );
}

export default Menu;