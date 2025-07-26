import React, { useEffect, useState } from 'react';
import { FiSearch, FiShoppingCart, FiChevronDown, FiX, FiPlus, FiMinus } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
const API_URL = 'http://localhost:3000/drugs'

import { FaStar, FaRegStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const OrderDrugs = () => {

  const [cart, setCart] = useState( JSON.parse(localStorage.getItem ("cart"))||[]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
   let [ drugs , setDrugs ] = useState ([])

  async function getApi() {
    try {
      const { data } = await axios . get ( API_URL )
      console.log(data);
      
      setDrugs ( data ) 
      
    } catch (error) {
      console.error(error);
    }
  }





  const addToCart = (drugs) => {
    console.log(7);
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === drugs.id);
      if (existingItem) {
        

        return prevCart.map(item =>
          item.id === drugs.id ? { ...item, quantity: item.quantity ++ } : item
        );
      }
      // localStorage.setItem("cart",JSON.stringify([...prevCart, { ...drugs, quantity: 1 }]))
      return [...prevCart, { ...drugs, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

const filteredProducts = drugs.filter(drug => {
  const name = drug.name?.toLowerCase().trim() || '';
  const description = drug.description?.toLowerCase().trim() || '';
  const query = searchQuery.toLowerCase().trim();

  return name.includes(query) || description.includes(query);
});

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);



  useEffect (()=>{
    window.scrollTo (0 , 0)
    getApi()
  }, [])



  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 font-sans">
      {/* **Стильный хедер с био-стеклом** */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center shadow-md">
              <span className="text-xl text-white">⚕️</span>
            </div>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Medlink
            </h1>
          </motion.div>

          {/* **Умный поиск с иконкой** */}
          
          <div className="flex-1 max-w-xl mx-8">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="relative"
            >
              <div className="absolute left-4 top-3.5 text-blue-400">
                <FiSearch className="text-lg" />
              </div>
              <input
                type="text"
                placeholder="Поиск инновационных препаратов..."
                className="w-full py-3 px-12 rounded-xl bg-white border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 text-gray-700 placeholder-blue-300 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-3.5 text-blue-300 hover:text-blue-500"
                >
                  <FiX />
                </button>
              )}
            </motion.div>
          </div>

          {/* **Корзина с индикатором** */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-3 rounded-xl bg-white border border-blue-100 hover:border-blue-300 shadow-sm transition-all"
            onClick={() => setIsCartOpen(true)}
          >
            <FiShoppingCart className="text-blue-500 text-xl" />
            {cartItemCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-cyan-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md"
              >
                {cartItemCount}
              </motion.span>
            )}
          </motion.button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(drugs => (
            <motion.div
              key={drugs.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className={`rounded-2xl overflow-hidden border border-blue-100 bg-white/80 backdrop-blur-sm hover:shadow-lg hover:border-blue-200 transition-all ${drugs.bg}`}
            >
              <div className="p-6" >
               
               <div className='flex gap-5 py-5 pb-8'>
                 <div className="w-30 h-20 rounded-xl bg-gradient-to-br from-blue-100 to-white flex items-center justify-center shadow-inner mb-4">
                  <img src={drugs.image} alt="image" />
                </div>
                <div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">{drugs.name}</h3>
                <div className="flex items-center text-yellow-500 mb-4">
                  {[...Array(5)].map((_, index) => (
                    index < Math.round(drugs.rating) ? (
                    <FaStar key={index} />) : ( <FaRegStar key={index} />) ))}
                    <span className="ml-2 text-gray-600">({drugs.rating})</span>
                    </div>  
                </div>
               </div>

                    <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">
                    {drugs.price.toLocaleString('ru-RU')} ₽
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(drugs)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:shadow-md transition-all"
                  >
                    + Добавить
                  </motion.button>
                  <Link to={`/menu/infodrugs/${drugs.id}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:shadow-md transition-all"
                    >
                    + Узнать больше
                  </motion.button>
                    </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 text-blue-200">🔍</div>
            <h3 className="text-2xl font-bold mb-2 text-gray-700">Товары не найдены</h3>
            <p className="text-blue-400">Попробуйте изменить запрос</p>
          </div>
        )}
      </main>

      {/* **Плавающая корзина** */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
              onClick={() => setIsCartOpen(false) }
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 2 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white/90 backdrop-blur-md border-l border-blue-100 shadow-2xl z-50 flex flex-col"
            >
              <div className="p-6 border-b border-blue-100 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  Ваша корзина
                </h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-lg hover:bg-blue-50 text-blue-400 transition"
                >
                  <FiX className="text-xl" 
                  onClick={()=>{
                    localStorage.clear()
                  }}/>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-10">
                    <div className="text-6xl mb-4 text-blue-100">🛒</div>
                    <h3 className="text-xl font-bold mb-2 text-gray-700">Корзина пуста</h3>
                    <p className="text-blue-400">Добавьте товары!</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-start space-x-4 p-4 rounded-xl bg-white border border-blue-100 shadow-sm"
                    >
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-white flex items-center justify-center shadow-inner">
                        <span className="text-2xl">{item.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">{cart.name}</h3>
                        <p className="text-sm text-blue-500">{cart.price} ₽</p>
                        <div className="flex items-center mt-2">
                          <button 
                            onClick={() => updateQuantity(cart.id, item.quantity - 1)}
                            className="p-1 rounded-lg hover:bg-blue-50 text-blue-400"
                          >
                            <FiMinus />
                          </button>
                          <span className="mx-3 w-8 text-center text-gray-700">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(cart.id, item.quantity + 1)}
                            className="p-1 rounded-lg hover:bg-blue-50 text-blue-400"
                          >
                            <FiPlus />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-blue-300 hover:text-red-400"
                      >
                        <FiX />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-blue-100">
                  <div className="flex justify-between text-lg mb-4">
                    <span className="text-gray-600">Итого</span>
                    <span className="font-bold text-blue-600">{cartTotal.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold hover:shadow-lg transition-all"
                  >
                    Оформить заказ
                  </motion.button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderDrugs;