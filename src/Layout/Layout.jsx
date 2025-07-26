import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { User, Home, HelpCircle, LogOut } from "lucide-react";
import { FaHeartbeat, FaBrain, FaPills, FaUserMd, FaHeart } from 'react-icons/fa';
import { FaBars, FaTimes } from "react-icons/fa";

function Layout() {
  const [showNav, setShowNav] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [avatarImage, setAvatarImage] = useState(JSON.parse(localStorage.getItem("loggedUser")) || 'https://i.pinimg.com/736x/aa/0b/a0/aa0ba04d7b5c534acbcf55de2dd51b85.jpg');
  
  const isGuest = localStorage.getItem('guestMode') === 'guest';

  useEffect(() => {
    const FooterScroll = () => {
      const offset = window.innerHeight + window.scrollY;
      const height = document.body.offsetHeight;
      setIsAtBottom(offset >= height - 10);
    };

    window.addEventListener("scroll", FooterScroll);
    return () => window.removeEventListener("scroll", FooterScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      setShowNav(!scrollBottom);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("guestMode");
    navigate(isGuest ? "/registration" : "/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-sky-50 to-slate-100 text-gray-800 font-sans relative">

      {/* Desktop Navigation */}
      <nav
        className={`hidden lg:flex fixed bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-t from-blue-500 to-white backdrop-blur-md shadow-xl border border-gray-900 rounded-full px-20 py-3 items-center gap-8 z-50 transition-all duration-500 ease-in-out ${showNav ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
        {[
          { to: "/menu", label: "Home", icon: Home }, 
          { to: "/profile", label: "Profile", icon: User },
          { to: isGuest ? "/registration" : "/login", label: "Log Out", icon: LogOut }
        ].map(({ to, label, icon: Icon }) => (
          <Link
            key={label}
            onClick={() => {
              if (label === "Log Out") {
                handleLogout();
                return;
              }
              if (label === "Profile" && isGuest) {
                alert("Эта функция недоступна для гостей. Пожалуйста, зарегистрируйтесь, чтобы открыть профиль.");
                return;
              }
            }}
            to={label === "Profile" && isGuest ? "#" : to}
            className="group flex flex-col items-center text-sm text-gray-800 hover:text-blue-500 transition relative"
          >
            <Icon className="w-6 h-6 group-hover:scale-125 group-hover:-translate-y-1 transition-all duration-300" />
            <span className="mt-1 group-hover:scale-110 group-hover:text-cyan-900 transition-all duration-300">{label}</span>
            <span className="absolute bottom-[-6px] h-[2px] w-0 group-hover:w-full bg-cyan-200 transition-all duration-300"></span>
          </Link>
        ))}
      </nav>

      {/* Mobile Navigation */}
      <nav className="bg-blue-600 text-white p-4 lg:hidden md:hidden shadow-md fixed top-0 left-0 w-full z-50">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">HealthApp</div>
          <button
            onClick={toggleMenu}
            className="text-white text-2xl focus:outline-none"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div
          className={`fixed top-0 left-0 h-full w-72 bg-gray-900 text-white z-40 transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-2xl`}
        >
          {/* Menu Header */}
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Navigation
            </h2>
          </div>

          {/* Menu Items */}
          <div className="p-4 mt-4 flex flex-col space-y-3">
            <button 
              className="flex items-center p-4 rounded-lg hover:bg-gray-800 transition-all duration-200 group hover:shadow-[0_4px_12px_rgba(59,130,246,0.2)]"
              onClick={() => navigate("/menu")}
            >
              <div className="w-8 h-8 rounded-md bg-blue-500/10 flex items-center justify-center mr-3 group-hover:bg-blue-500/20 transition-colors">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <span className="font-medium text-gray-200 group-hover:text-white">Menu</span>
            </button>

            <button 
              className="flex items-center p-4 rounded-lg hover:bg-gray-800 transition-all duration-200 group hover:shadow-[0_4px_12px_rgba(168,85,247,0.2)]"
              onClick={() => {
                if (isGuest) {
                  alert("Эта функция недоступна для гостей. Пожалуйста, зарегистрируйтесь, чтобы открыть профиль.");
                  return;
                }
                navigate("/profile");
              }}
            >
              <div className="w-8 h-8 rounded-md bg-purple-500/10 flex items-center justify-center mr-3 group-hover:bg-purple-500/20 transition-colors">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="font-medium text-gray-200 group-hover:text-white">Profile</span>
            </button>

            <div className="border-t border-gray-700 my-2"></div>

            <button 
              className="flex items-center p-4 rounded-lg hover:bg-gray-800 transition-all duration-200 group hover:shadow-[0_4px_12px_rgba(239,68,68,0.2)]"
              onClick={handleLogout}
            >
              <div className="w-8 h-8 rounded-md bg-red-500/10 flex items-center justify-center mr-3 group-hover:bg-red-500/20 transition-colors">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <span className="font-medium text-gray-200 group-hover:text-white">Log out</span>
            </button>

            <button 
              onClick={()=> navigate("/menu/premium")}
              className="group relative flex items-center w-full p-4 rounded-lg bg-gradient-to-r from-amber-500/10 to-yellow-500/10 hover:from-amber-500/20 hover:to-yellow-500/20 transition-all duration-200 hover:shadow-[0_4px_12px_rgba(234,179,8,0.3)] border border-amber-500/30 hover:border-amber-500/50"
            >
              <div className="relative w-8 h-8 rounded-md bg-gradient-to-br from-amber-400/20 to-yellow-600/20 flex items-center justify-center mr-3 group-hover:from-amber-400/30 group-hover:to-yellow-600/30 transition-all">
                <svg className="w-5 h-5 text-amber-400 group-hover:text-yellow-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-300">
                Become Premium
              </span>
            </button>
          </div>

          {/* User Profile Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 bg-gray-800/50 backdrop-blur-sm">
            <div className="flex items-center">
              <div className="relative w-12 h-12">
                <img
                  className="w-full h-full object-cover rounded-full border border-white shadow-md"
                  src={avatarImage.avatar}
                  alt="Avatar"
                  onError={(e) => (e.currentTarget.src = "/default-avatar.png")}
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></span>
              </div>
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium text-white truncate">
                  {avatarImage.first_name} {avatarImage.last_name}
                </p>
                <p className="text-xs text-gray-400">Premium Member</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Backdrop */}
        {menuOpen && (
          <div
            onClick={toggleMenu}
            className="fixed top-0 left-0 w-full h-full bg-black opacity-40 z-30"
          />
        )}
      </nav>

      <button
        className="fixed bottom-24 right-6 bg-cyan-700 text-white p-4 rounded-full shadow-lg hover:bg-cyan-800 transition z-40"
        onClick={() => alert("How can we help you?")}
      >
        <HelpCircle className="w-6 h-6" />
      </button>

      <div>
        <Outlet />
      </div>

      <footer className="bg-gray-900 z-10 text-white pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="mt-8 text-center text-white/80 text-sm">
              <h1 className="text-[50px] font-bold -mt-10">
                <span className="relative">
                  <span className="absolute right-20 -top-2 h-2 w-2 rounded-full bg-red-500 animate-ping opacity-75"></span>
                  <FaHeart className="text-red-400"/>
                </span>
                Medlink
              </h1>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Продукт</h4>
              <ul className="space-y-2">
                {['Возможности', 'Тарифы', 'Обновления', 'Демо'].map((item) => (
                  <li key={item}>
                    <a className="text-gray-400 hover:text-white text-sm transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Поддержка</h4>
              <ul className="space-y-2">
                {['Документация', 'Гид по началу работы', 'API', 'Сообщество'].map((item) => (
                  <li key={item}>
                    <a className="text-gray-400 hover:text-white text-sm transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Контакты</h4>
              <address className="text-gray-400 text-sm not-italic">
                Москва, ул. Медицинская, 42<br />
                info@medlink.ru<br />
                +7 (495) 123-45-67
              </address>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>© 2023 Medlink. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;