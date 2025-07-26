import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaVideo, FaPhone, FaPaperPlane, FaUserCircle, FaMicrophone, 
  FaMicrophoneSlash, FaVideoSlash, FaAngleLeft, FaEllipsisV, 
  FaSearch, FaUserPlus, FaRegWindowClose, FaVolumeUp, FaVolumeMute,
  FaRegCopy, FaRegShareSquare, FaInfoCircle, FaRegSmile
} from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';
import { BsThreeDotsVertical, BsCameraVideoOff, BsCameraVideo } from 'react-icons/bs';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Simulated data with more realistic medical contacts
const currentUser = { 
  id: 'user1', 
  name: 'Dr. Johnson', 
  avatar: 'https://i.pravatar.cc/150?img=5',
  role: 'Cardiologist',
  status: 'Online'
};

const contacts = [
  { 
    id: 'contact1', 
    name: 'Dr. Smith', 
    avatar: 'https://i.pravatar.cc/150?img=11',
    role: 'Neurologist',
    status: 'Available',
    lastSeen: '2 min ago'
  },
  { 
    id: 'contact2', 
    name: 'Nurse Alice', 
    avatar: 'https://i.pravatar.cc/150?img=3',
    role: 'Head Nurse',
    status: 'In surgery',
    lastSeen: '30 min ago'
  },
  { 
    id: 'contact3', 
    name: 'Patient John', 
    avatar: 'https://i.pravatar.cc/150?img=8',
    role: 'Patient',
    status: 'Recovering',
    lastSeen: 'Today'
  },
  { 
    id: 'contact4', 
    name: 'Admin Jane', 
    avatar: 'https://i.pravatar.cc/150?img=9',
    role: 'Hospital Admin',
    status: 'Available',
    lastSeen: '5 min ago'
  },
];

const initialMessages = {
  'contact1': [
    { id: 1, sender: 'Dr. Smith', text: 'Hello Dr. Johnson, about the patient case we discussed...', timestamp: '10:00 AM', read: true },
    { id: 2, sender: 'You', text: 'Yes, I reviewed the MRI scans. There appears to be a small lesion.', timestamp: '10:02 AM', read: true },
    { id: 3, sender: 'Dr. Smith', text: 'Should we schedule a consultation with the patient tomorrow?', timestamp: '10:05 AM', read: true },
  ],
  'contact2': [
    { id: 4, sender: 'Nurse Alice', text: 'Medication for Room 302 needs authorization', timestamp: 'Yesterday', read: true },
    { id: 5, sender: 'You', text: 'Approved. Please administer 5mg every 6 hours.', timestamp: 'Yesterday', read: true },
  ],
  'contact3': [
    { id: 6, sender: 'Patient John', text: 'Doctor, I\'m experiencing some discomfort after the procedure', timestamp: '2 hours ago', read: false },
  ],
  'contact4': [
    { id: 7, sender: 'Admin Jane', text: 'The board meeting has been moved to 3pm', timestamp: '1 day ago', read: true },
  ],
};

function VideoCallPage() {
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const [callType, setCallType] = useState(null); // 'video' or 'audio'
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isRemoteVideoOff, setIsRemoteVideoOff] = useState(false);
  const [isRemoteMuted, setIsRemoteMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  
  // Refs for WebRTC video elements
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const messagesEndRef = useRef(null);
  const callTimerRef = useRef(null);

  const selectedContact = contacts.find(c => c.id === selectedContactId) || contacts[0];
  const currentChatMessages = messages[selectedContactId] || [];

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChatMessages]);

  // Simulate WebRTC connection
  useEffect(() => {
    if (isCalling) {
      // Simulate remote participant joining
      const timer = setTimeout(() => {
        setIsRemoteVideoOff(Math.random() > 0.7); // 30% chance remote video is off
        setIsRemoteMuted(Math.random() > 0.5); // 50% chance remote is muted
      }, 1500);

      // Start call timer
      callTimerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);

      return () => {
        clearTimeout(timer);
        clearInterval(callTimerRef.current);
      };
    } else {
      setCallDuration(0);
    }
  }, [isCalling]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: Date.now(),
        sender: currentUser.name,
        text: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false
      };
      
      setMessages(prev => ({
        ...prev,
        [selectedContactId]: [...(prev[selectedContactId] || []), newMsg],
      }));
      
      setNewMessage('');
      
      // Simulate reply after 1-3 seconds
      if (Math.random() > 0.3) { // 70% chance of reply
        const replyTime = 1000 + Math.random() * 2000;
        setTimeout(() => {
          const replies = [
            "Thanks for the update.",
            "I'll check and get back to you.",
            "Understood. Please proceed.",
            "Can we discuss this in our next meeting?",
            "I'm currently in surgery, will respond later."
          ];
          const replyMsg = {
            id: Date.now() + 1,
            sender: selectedContact.name,
            text: replies[Math.floor(Math.random() * replies.length)],
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            read: false
          };
          setMessages(prev => ({
            ...prev,
            [selectedContactId]: [...(prev[selectedContactId] || []), replyMsg],
          }));
        }, replyTime);
      }
    }
  };

  const startCall = (type) => {
    setCallType(type);
    setIsCalling(true);
    
    toast.info(`Connecting to ${selectedContact.name}...`, {
      position: 'top-center',
      autoClose: 2000,
    });
    
    // In a real app, this would initialize WebRTC connection
    // For demo, we'll simulate the connection
    if (type === 'video') {
      // Simulate getting local video stream
      setTimeout(() => {
        if (localVideoRef.current) {
          // In a real app: localVideoRef.current.srcObject = localStream;
          toast.success(`Video call connected with ${selectedContact.name}`);
        }
      }, 1000);
    } else {
      toast.success(`Audio call connected with ${selectedContact.name}`);
    }
  };

  const endCall = () => {
    setIsCalling(false);
    setCallType(null);
    
    // In a real app: peerConnection.close(), stop all tracks
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
    
    toast.info(`Call ended. Duration: ${formatCallDuration(callDuration)}`, {
      position: 'top-center',
    });
  };

  const formatCallDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // Framer Motion variants
  const sidebarVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: { x: '0%', opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 20 } },
  };

  const chatAreaVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 10 } },
  };

  const callControlsVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { delay: 0.3 } },
  };

  
    useEffect (()=> {
      window.scrollTo(0,0)
    }, [])

  return (
    <div className="flex h-screen bg-gray-50 font-sans antialiased relative overflow-hidden">
      <ToastContainer position="top-center" autoClose={3000} />
      
      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={toggleSidebar}
        className="md:hidden absolute top-4 left-4 z-20 bg-white p-2 rounded-full shadow-md"
      >
        <FaAngleLeft className={`text-xl transition-transform ${showSidebar ? 'rotate-0' : 'rotate-180'}`} />
      </button>

      {/* Sidebar - Contacts List */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            className="w-80 bg-white shadow-xl flex flex-col border-r border-gray-200 absolute md:relative z-10 h-full"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={sidebarVariants}
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-blue-600 text-white">
              <h2 className="text-2xl font-bold">Medlink Connect</h2>
              <button 
                className="text-white hover:text-blue-200 transition-colors"
                onClick={() => toast.info("Add contact feature would open here")}
              >
                <FaUserPlus className="text-xl" />
              </button>
            </div>
            
            <div className="p-4 border-b border-gray-100 bg-white">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search medical staff..."
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {contacts.map(contact => (
                <motion.div
                  key={contact.id}
                  className={`flex items-center p-4 cursor-pointer hover:bg-blue-50 transition-colors ${
                    selectedContactId === contact.id ? 'bg-blue-100 border-l-4 border-blue-500' : ''
                  }`}
                  onClick={() => {
                    setSelectedContactId(contact.id);
                    if (window.innerWidth < 768) setShowSidebar(false);
                  }}
                  whileHover={{ x: 5 }}
                >
                  <div className="relative">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div className={`absolute bottom-0 right-3 w-3 h-3 rounded-full border-2 border-white ${
                      contact.status === 'Available' ? 'bg-green-500' : 
                      contact.status === 'In surgery' ? 'bg-red-500' : 'bg-yellow-500'
                    }`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <p className="text-lg font-semibold text-gray-800 truncate">{contact.name}</p>
                      <span className="text-xs text-gray-500">{contact.lastSeen}</span>
                    </div>
                    <p className="text-sm text-gray-500">{contact.role}</p>
                    <p className="text-xs text-gray-400 truncate">
                      {messages[contact.id]?.[messages[contact.id]?.length - 1]?.text || 'No messages yet'}
                    </p>
                    {messages[contact.id]?.some(m => !m.read && m.sender !== currentUser.name) && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {messages[contact.id].filter(m => !m.read && m.sender !== currentUser.name).length}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Current User Profile */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full mr-3 object-cover"
              />
              <div>
                <p className="font-medium text-gray-800">{currentUser.name}</p>
                <p className="text-xs text-gray-500">{currentUser.role}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat/Call Area */}
      <motion.div
        className="flex-1 flex flex-col bg-gray-100 h-full"
        initial="hidden"
        animate="visible"
        variants={chatAreaVariants}
      >
        {/* Chat Header */}
        <div className="bg-white p-4 shadow-sm flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center">
            <div className="relative mr-3">
              <img
                src={selectedContact.avatar}
                alt={selectedContact.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                selectedContact.status === 'Available' ? 'bg-green-500' : 
                selectedContact.status === 'In surgery' ? 'bg-red-500' : 'bg-yellow-500'
              }`}></div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{selectedContact.name}</h3>
              <p className="text-sm text-gray-500">
                {selectedContact.role} • {selectedContact.status}
              </p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <motion.button
              className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
              onClick={() => startCall('audio')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Voice Call"
            >
              <FaPhone className="text-lg" />
            </motion.button>
            <motion.button
              className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
              onClick={() => startCall('video')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Video Call"
            >
              <FaVideo className="text-lg" />
            </motion.button>
          </div>
        </div>

        {/* Call UI */}
        <AnimatePresence>
          {isCalling && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900 text-white flex flex-col items-center justify-center relative overflow-hidden"
              style={{ minHeight: '300px' }}
            >
              {/* Remote Video */}
              <div className="absolute inset-0 bg-black flex items-center justify-center">
                {isRemoteVideoOff ? (
                  <div className="text-center">
                    <FaUserCircle className="text-gray-500 text-6xl mx-auto mb-2" />
                    <p className="text-gray-400">{selectedContact.name}</p>
                    {isRemoteMuted && <p className="text-sm text-gray-500 mt-1">Audio muted</p>}
                  </div>
                ) : (
                  <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    className="h-full w-full object-cover"
                    poster={selectedContact.avatar}
                  />
                )}
              </div>
              
              {/* Local Video (Picture-in-Picture) */}
              {callType === 'video' && !isVideoOff && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute bottom-4 right-4 w-32 h-48 rounded-lg overflow-hidden shadow-xl border-2 border-white bg-black"
                >
                  <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              )}
              
              {/* Call Info */}
              <div className="absolute top-4 left-4 bg-black bg-opacity-50 px-3 py-1 rounded-full z-10">
                <p className="text-sm font-medium">
                  {callType === 'video' ? 'Video Call' : 'Voice Call'} • {formatCallDuration(callDuration)}
                </p>
              </div>
              
              {/* Call Controls */}
              <motion.div
                className="absolute bottom-6 left-0 right-0 flex justify-center space-x-4 z-10"
                variants={callControlsVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.button
                  className={`p-3 rounded-full ${isMuted ? 'bg-red-600' : 'bg-gray-700'} text-white hover:bg-opacity-80 transition-colors shadow-lg`}
                  onClick={() => setIsMuted(!isMuted)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <FaMicrophoneSlash className="text-xl" /> : <FaMicrophone className="text-xl" />}
                </motion.button>
                
                {callType === 'video' && (
                  <motion.button
                    className={`p-3 rounded-full ${isVideoOff ? 'bg-red-600' : 'bg-gray-700'} text-white hover:bg-opacity-80 transition-colors shadow-lg`}
                    onClick={() => setIsVideoOff(!isVideoOff)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={isVideoOff ? "Turn Camera On" : "Turn Camera Off"}
                  >
                    {isVideoOff ? <BsCameraVideoOff className="text-xl" /> : <BsCameraVideo className="text-xl" />}
                  </motion.button>
                )}
                
                <motion.button
                  className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg"
                  onClick={endCall}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="End Call"
                >
                  <FaPhone className="text-xl rotate-135" />
                </motion.button>
                
                <motion.button
                  className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors shadow-lg"
                  onClick={() => toast.info("Screen sharing would start here")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Share Screen"
                >
                  <FaRegShareSquare className="text-xl" />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Messages Area */}
        <div className={`flex-1 p-4 overflow-y-auto custom-scrollbar flex flex-col space-y-3 ${isCalling ? 'hidden' : ''}`}>
          {currentChatMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <FaPaperPlane className="text-4xl mb-4 opacity-30" />
              <p className="text-lg">No messages yet</p>
              <p className="text-sm">Start a conversation with {selectedContact.name}</p>
            </div>
          ) : (
            currentChatMessages.map((message) => (
              <motion.div
                key={message.id}
                className={`flex ${message.sender === currentUser.name ? 'justify-end' : 'justify-start'}`}
                variants={messageVariants}
                initial="hidden"
                animate="visible"
              >
                <div
                  className={`max-w-xs sm:max-w-sm lg:max-w-md p-3 rounded-2xl relative ${
                    message.sender === currentUser.name
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  {message.sender !== currentUser.name && (
                    <p className="font-medium text-sm mb-1">{message.sender}</p>
                  )}
                  <p className="text-sm">{message.text}</p>
                  <div className={`flex items-center justify-end mt-1 space-x-1 ${
                    message.sender === currentUser.name ? 'text-blue-100' : 'text-gray-400'
                  }`}>
                    <span className="text-xs">
                      {message.timestamp}
                    </span>
                    {message.sender === currentUser.name && (
                      <span className="text-xs">
                        {message.read ? '✓✓' : '✓'}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        {!isCalling && (
          <div className="bg-white p-3 border-t border-gray-200 flex items-center">
            <button className="p-2 text-gray-500 hover:text-blue-500 transition-colors">
              <FaRegSmile className="text-xl" />
            </button>
            <input
              type="text"
              placeholder={`Message ${selectedContact.name}...`}
              className="flex-1 mx-2 p-2 px-4 rounded-full bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <motion.button
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              onClick={handleSendMessage}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={!newMessage.trim()}
            >
              <IoMdSend className="text-xl" />
            </motion.button>
          </div>
        )}
      </motion.div>

    </div>
  );
}

export default VideoCallPage;