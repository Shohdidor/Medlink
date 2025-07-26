import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaShieldAlt, FaChartLine, FaUserMd, FaRegCalendarCheck, FaMicroscope, FaClinicMedical, FaFilePrescription, FaProcedures } from 'react-icons/fa';
const ARI_URL = 'http://localhost:3000/reviews'

const PremiumPage = () => {

    const [ data , setData ] = useState ( [] )

    const user = JSON.parse ( localStorage.getItem ("loggedUser" ) )
    

    async function getApi() {
        try {
            const { data } = await axios . get ( ARI_URL )
            setData ( data )
            console.log(data);
        } catch (error) {
            console.error(error);
            
        }
    }
    
      useEffect (()=> {
        window.scrollTo(0,0)
        getApi ()
      }, [])
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Медицинский заголовок */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <FaClinicMedical className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-800">Medlink<span className="text-blue-600">Pro</span></h1>
          </div>
        </div>
      </header>

      {/* Главный баннер */}
      <div className="bg-gradient-to-r from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-left">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-6">
              <span className="block">Усовершенствуйте свою медицинскую практику</span>
              <span className="block text-blue-600 mt-3">с MedlinkPro Premium</span>
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 leading-relaxed">
              Получите доступ к профессиональным инструментам, разработанным специально для врачей и медицинских учреждений, чтобы улучшить качество обслуживания пациентов.
            </p>
            <div className="mt-8">
              <button 
              onClick={()=> {
                { user.premium = true }
                localStorage.setItem ( JSON.stringify ( user.premium ) )
                if ( user . premium == true ) {
                  alert ( "вы уже стали премиум-пользователем")
                }
              }}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 transform">
                Попробовать бесплатно 14 дней
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Преимущества */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">Почему выбирают Premium</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <FaShieldAlt className="h-8 w-8 text-blue-500" />,
              title: "100% Соответствие требованиям",
              description: "Полное соответствие законодательным требованиям и стандартам медицинской документации"
            },
            {
              icon: <FaFilePrescription className="h-8 w-8 text-blue-500" />,
              title: "Электронные рецепты",
              description: "Быстрое оформление и отправка рецептов прямо из системы"
            },
            {
              icon: <FaProcedures className="h-8 w-8 text-blue-500" />,
              title: "Управление пациентами",
              description: "Полная история болезней, анализов и назначений в одном месте"
            },
            {
              icon: <FaChartLine className="h-8 w-8 text-blue-500" />,
              title: "Аналитика и отчеты",
              description: "Детальная аналитика по пациентам, эффективности лечения и загруженности"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500">
              <div className="mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Тарифные планы */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-4">Выберите свой тариф</h2>
          <p className="text-xl text-center text-gray-600 mb-12">Гибкие условия для любых медицинских учреждений</p>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Базовый план */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-all duration-300">
              <div className="px-6 py-8">
                <h3 className="text-lg font-medium text-gray-900">Базовый</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold text-gray-900">0 ₽</span>
                  <span className="ml-1 text-lg font-medium text-gray-500">/месяц</span>
                </div>
                <p className="mt-2 text-sm text-gray-500">Для индивидуальных специалистов</p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Базовая электронная история болезней",
                    "Запись пациентов на прием",
                    "Простая статистика",
                    "До 100 пациентов в месяц"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-3 text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <button 
                onClick={()=> {
                if ( user . premium == false ) {
                  alert ( "вы уже используете этот план.")
                }
              }}

                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-100">
                  Текущий план
                </button>
              </div>
            </div>

            {/* Профессиональный план */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform scale-105 z-10 border-2 border-blue-500">
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                Самый популярный
              </div>
              <div className="px-6 py-8">
                <h3 className="text-lg font-medium text-gray-900">Профессиональный</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold text-gray-900">2 900 ₽</span>
                  <span className="ml-1 text-lg font-medium text-gray-500">/месяц</span>
                </div>
                <p className="mt-2 text-sm text-gray-500">Для клиник и частных практик</p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Все функции Базового плана",
                    "Расширенная аналитика",
                    "Телемедицина",
                    "Шаблоны документов",
                    "До 500 пациентов в месяц",
                    "Поддержка 24/7"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-3 text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-6 py-4 bg-blue-50 border-t border-blue-200">
                <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-md shadow hover:shadow-md transition-all">
                  Обновить сейчас
                </button>
              </div>
            </div>

            {/* Корпоративный план */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-all duration-300">
              <div className="px-6 py-8">
                <h3 className="text-lg font-medium text-gray-900">Корпоративный</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold text-gray-900">9 900 ₽</span>
                  <span className="ml-1 text-lg font-medium text-gray-500">/месяц</span>
                </div>
                <p className="mt-2 text-sm text-gray-500">Для больниц и сетей клиник</p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Все функции Профессионального плана",
                    "Мультифилиальность",
                    "Приоритетная поддержка",
                    "API интеграции",
                    "Персональный менеджер",
                    "Неограниченное число пациентов"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-3 text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <button className="w-full px-4 py-2 bg-gray-700 text-white font-medium rounded-md hover:bg-gray-800 transition-colors">
                  Связаться с отделом продаж
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Отзывы */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">Почему выбирают Premium</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((elem) => (
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500">
              <div className="mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-around gap-[15px]">
                    <img src={elem.avatar} alt="avatar" className='rounded-4xl' />
                </div>
                    <h1>
                        {elem.name}
                    </h1>
                    <p className='text-gray-500'>
                  {elem.service_type}
                    </p>
              </div>
              <p className="text-gray-600">{elem.comment}</p>
            </div>
          ))}
        </div>
      </div>
      </div>

      <div className="bg-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-8 lg:mb-0">
              <h2 className="text-3xl font-extrabold mb-6">Посмотрите как работает Medlink Premium</h2>
              <p className="text-xl text-blue-100 mb-6">
                Узнайте, как наше решение может преобразовать вашу медицинскую практику всего за несколько минут.
              </p>
              <ul className="space-y-3 text-blue-100">
                {[
                  "Полная демонстрация функционала",
                  "Примеры реального использования",
                  "Ответы на частые вопросы"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="h-6 w-6 text-blue-300 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative pt-[56.25%] rounded-xl overflow-hidden shadow-2xl bg-gray-800">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-400 transition-colors">
                <iframe className='lg:block hidden' width="577" height="333" src="https://www.youtube.com/embed/6fsNfg1YlnM" title="Perioperative Services at The Royal Melbourne Hospital" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                <iframe className='lg:hidden block' width="390" height="233" src="https://www.youtube.com/embed/6fsNfg1YlnM" title="Perioperative Services at The Royal Melbourne Hospital" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-6">
            Готовы улучшить свою медицинскую практику?
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-blue-100 mx-auto">
            Присоединяйтесь к тысячам врачей, которые уже используют Medlink Premium.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 bg-white text-blue-700 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 transform text-lg">
              Начать бесплатный период
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-blue-700 transition-colors text-lg">
              Запросить демонстрацию
            </button>
          </div>
          <p className="mt-4 text-sm text-blue-200">
            Бесплатная пробная версия на 14 дней. Никакой кредитной карты не требуется.
          </p>
        </div>
      </div>

    </div>
  );
};

export default PremiumPage;