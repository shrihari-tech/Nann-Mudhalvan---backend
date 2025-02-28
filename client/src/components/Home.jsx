// import React, { useState, useEffect } from 'react';
// import { Calendar, Clock, User, AlertCircle, Filter, X } from 'lucide-react';

// const Home = () => {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState('all');
//   const [sortBy, setSortBy] = useState('priority');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/task/getTask');
//       const data = await response.json();
//       setTasks(data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//       setLoading(false);
//     }
//   };

//   const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-GB', { 
//       hour: '2-digit', 
//       minute: '2-digit',
//       second: '2-digit',
//       year:'numeric',
//       month:'2-digit',
//       day:'2-digit', 
//     }));

//   const getPriorityColor = (priority) => {
//     switch (priority.toLowerCase()) {
//       case 'high':
//         return 'bg-red-100 text-red-800';
//       case 'medium':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'low':
//         return 'bg-green-100 text-green-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case 'completed':
//         return 'bg-green-100 text-green-800';
//       case 'in progress':
//         return 'bg-blue-100 text-blue-800';
//       case 'pending':
//         return 'bg-yellow-100 text-yellow-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const filteredTasks = tasks.filter(task => {
//     if (filter !== 'all' && task.status.toLowerCase() !== filter) {
//       return false;
//     }
//     if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
//         !task.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
//         !task.assigned_to.some(user => user.toLowerCase().includes(searchQuery.toLowerCase()))) {
//       return false;
//     }
//     return true;
//   }).sort((a, b) => {
//     switch (sortBy) {
//       case 'priority':
//         return a.priority.localeCompare(b.priority);
//       case 'dueDate':
//         return new Date(a.end_date) - new Date(b.end_date);
//       default:
//         return 0;
//     }
//   });

//   const handleTaskClick = (task) => {
//     setSelectedTask(task);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedTask(null);
//   };

//   const clearFilters = () => {
//     setFilter('all');
//     setSearchQuery('');
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="bg-[#304443] rounded-xl p-6 md:p-8 mb-2 text-white shadow-lg">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//             <div>
//               <img src="/logo.png" alt="NannMudhalvan" className="bg-white w-44 h-36 mx-auto" />
//             </div>
//             <div className="flex items-center justify-end font-bold gap-2 text-[#C29A6B] text-3xl">{currentTime}</div>
//           </div>
//         </div>
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">Scheduled Tasks</h1>
        
//         <div className="flex flex-wrap gap-4 items-center mb-6">
//           <div className="flex items-center space-x-2">
//             <Filter className="h-5 w-5 text-gray-500" />
//             <select 
//               className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//             >
//               <option value="all">All Status</option>
//               <option value="pending">Pending</option>
//               <option value="in progress">In Progress</option>
//               <option value="completed">Completed</option>
//             </select>
//           </div>
//           <div className="flex items-center space-x-2">
//             <input
//               type="text"
//               className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button
//               onClick={clearFilters}
//               className="px-4 py-2 bg-[#304443] text-[#C29A6B] rounded-lg hover:bg-[#304443]/90 transition-colors"
//             >
//               Clear Filters
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredTasks.map((task) => (
//           <div 
//             key={task._id} 
//             className="bg-[#304443] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
//             onClick={() => handleTaskClick(task)}
//           >
//             <div className="p-6">
//               <div className="flex justify-between items-start mb-4">
//                 <h2 className="text-xl font-semibold text-[#C29A6B] mb-2">{task.title}</h2>
//               </div>
              
//               <p className="text-[#C29A6B] mb-4 line-clamp-2">{task.description}</p>
              
//               <div className="space-y-3">
//                 <div className="flex items-center text-[#C29A6B]">
//                   <Calendar className="h-5 w-5 mr-2" />
//                   <span className="text-sm">
//                     {new Date(task.start_date).toLocaleDateString()} - {new Date(task.end_date).toLocaleDateString()}
//                   </span>
//                 </div>

//                 {task.time && (
//                   <div className="flex items-center text-[#C29A6B]">
//                     <Clock className="h-5 w-5 mr-2" />
//                     <span className="text-sm">{task.time}</span>
//                   </div>
//                 )}

//                 <div className="flex items-center text-[#C29A6B]">
//                   <User className="h-5 w-5 mr-2" />
//                   <div className="flex flex-wrap gap-1">
//                     {task.assigned_to.map((user, index) => (
//                       <span key={index} className="text-sm px-2 py-1 rounded">
//                         {user}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="flex items-center text-[#C29A6B]">
//                   <AlertCircle className="h-5 w-5 mr-2" />
//                   <span className={`text-sm px-2 py-1 rounded ${getStatusColor(task.status)}`}>
//                     {task.status}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {isModalOpen && selectedTask && (
//         <div className="fixed inset-0 backdrop-brightness-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold text-gray-800">{selectedTask.title}</h2>
//               <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
//                 <X className="h-6 w-6" />
//               </button>
//             </div>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                 <p className="p-2 bg-gray-50 rounded-lg">{selectedTask.description}</p>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
//                   <p className="p-2 bg-gray-50 rounded-lg">{new Date(selectedTask.start_date).toLocaleDateString()}</p>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
//                   <p className="p-2 bg-gray-50 rounded-lg">{new Date(selectedTask.end_date).toLocaleDateString()}</p>
//                 </div>
//               </div>
//               {selectedTask.time && (
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
//                   <p className="p-2 bg-gray-50 rounded-lg">{selectedTask.time}</p>
//                 </div>
//               )}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
//                 <div className="p-2 bg-gray-50 rounded-lg">
//                   {selectedTask.assigned_to.map((user, index) => (
//                     <span key={index} className="text-sm px-2 py-1 rounded block">
//                       {user}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//                 <p className={`p-2 rounded-lg ${getStatusColor(selectedTask.status)}`}>
//                   {selectedTask.status}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

// import React, { useState, useEffect } from 'react';
// import { Calendar, Clock, User, AlertCircle, Filter, X, ChevronLeft, ChevronRight } from 'lucide-react';

// const Home = () => {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState('all');
//   const [sortBy, setSortBy] = useState('priority');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const tasksPerPage = 5;

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/task/getTask');
//       const data = await response.json();
//       setTasks(data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//       setLoading(false);
//     }
//   };

//   const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-GB', { 
//       hour: '2-digit', 
//       minute: '2-digit',
//       second: '2-digit',
//       year:'numeric',
//       month:'2-digit',
//       day:'2-digit', 
//     }));

//   const getPriorityColor = (priority) => {
//     switch (priority.toLowerCase()) {
//       case 'high':
//         return 'bg-red-100 text-red-800';
//       case 'medium':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'low':
//         return 'bg-green-100 text-green-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case 'completed':
//         return 'bg-green-100 text-green-800';
//       case 'in progress':
//         return 'bg-blue-100 text-blue-800';
//       case 'pending':
//         return 'bg-yellow-100 text-yellow-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const filteredTasks = tasks.filter(task => {
//     if (filter !== 'all' && task.status.toLowerCase() !== filter) {
//       return false;
//     }
//     if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
//         !task.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
//         !task.assigned_to.some(user => user.toLowerCase().includes(searchQuery.toLowerCase()))) {
//       return false;
//     }
//     return true;
//   }).sort((a, b) => {
//     switch (sortBy) {
//       case 'priority':
//         return a.priority.localeCompare(b.priority);
//       case 'dueDate':
//         return new Date(a.end_date) - new Date(b.end_date);
//       default:
//         return 0;
//     }
//   });

//   const indexOfLastTask = currentPage * tasksPerPage;
//   const indexOfFirstTask = indexOfLastTask - tasksPerPage;
//   const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
//   const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const renderPaginationButtons = () => {
//     const buttons = [];
//     for (let i = 1; i <= totalPages; i++) {
//       buttons.push(
//         <button
//           key={i}
//           onClick={() => handlePageChange(i)}
//           className={`px-3 py-1 rounded-md ${
//             currentPage === i
//               ? "bg-[#304443] text-[#C29A6B]"
//               : "bg-white text-gray-700 hover:bg-gray-100"
//           }`}
//         >
//           {i}
//         </button>
//       );
//     }
//     return buttons;
//   };

//   const handleTaskClick = (task) => {
//     setSelectedTask(task);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedTask(null);
//   };

//   const clearFilters = () => {
//     setFilter('all');
//     setSearchQuery('');
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="bg-[#304443] rounded-xl p-6 md:p-8 mb-2 text-white shadow-lg">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//             <div>
//               <img src="/logo.png" alt="NannMudhalvan" className="bg-white w-44 h-36 mx-auto" />
//             </div>
//             <div className="flex items-center justify-end font-bold gap-2 text-[#C29A6B] text-3xl">{currentTime}</div>
//           </div>
//         </div>
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">Scheduled Tasks</h1>
        
//         <div className="flex flex-wrap gap-4 items-center mb-6">
//           <div className="flex items-center space-x-2">
//             <Filter className="h-5 w-5 text-gray-500" />
//             <select 
//               className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//             >
//               <option value="all">All Status</option>
//               <option value="pending">Pending</option>
//               <option value="in progress">In Progress</option>
//               <option value="completed">Completed</option>
//             </select>
//           </div>
//           <div className="flex items-center space-x-2">
//             <input
//               type="text"
//               className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button
//               onClick={clearFilters}
//               className="px-4 py-2 bg-[#304443] text-[#C29A6B] rounded-lg hover:bg-[#304443]/90 transition-colors"
//             >
//               Clear Filters
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto max-h-[calc(100vh-300px)]">
//         {currentTasks.map((task) => (
//           <div 
//             key={task._id} 
//             className="bg-[#304443] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
//             onClick={() => handleTaskClick(task)}
//           >
//             <div className="p-6">
//               <div className="flex justify-between items-start mb-4">
//                 <h2 className="text-xl font-semibold text-[#C29A6B] mb-2">{task.title}</h2>
//               </div>
              
//               <p className="text-[#C29A6B] mb-4 line-clamp-2">{task.description}</p>
              
//               <div className="space-y-3">
//                 <div className="flex items-center text-[#C29A6B]">
//                   <Calendar className="h-5 w-5 mr-2" />
//                   <span className="text-sm">
//                     {new Date(task.start_date).toLocaleDateString()} - {new Date(task.end_date).toLocaleDateString()}
//                   </span>
//                 </div>

//                 {task.time && (
//                   <div className="flex items-center text-[#C29A6B]">
//                     <Clock className="h-5 w-5 mr-2" />
//                     <span className="text-sm">{task.time}</span>
//                   </div>
//                 )}

//                 <div className="flex items-center text-[#C29A6B]">
//                   <User className="h-5 w-5 mr-2" />
//                   <div className="flex flex-wrap gap-1">
//                     {task.assigned_to.map((user, index) => (
//                       <span key={index} className="text-sm px-2 py-1 rounded">
//                         {user}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="flex items-center text-[#C29A6B]">
//                   <AlertCircle className="h-5 w-5 mr-2" />
//                   <span className={`text-sm px-2 py-1 rounded ${getStatusColor(task.status)}`}>
//                     {task.status}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination Controls */}
//       {filteredTasks.length > 0 && (
//         <div className="mt-6 flex justify-center items-center gap-2">
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="p-2 rounded-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <ChevronLeft className="h-5 w-5" />
//           </button>
          
//           {renderPaginationButtons()}
          
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="p-2 rounded-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <ChevronRight className="h-5 w-5" />
//           </button>
//         </div>
//       )}

//       {isModalOpen && selectedTask && (
//         <div className="fixed inset-0 backdrop-brightness-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold text-gray-800">{selectedTask.title}</h2>
//               <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
//                 <X className="h-6 w-6" />
//               </button>
//             </div>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                 <p className="p-2 bg-gray-50 rounded-lg">{selectedTask.description}</p>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
//                   <p className="p-2 bg-gray-50 rounded-lg">{new Date(selectedTask.start_date).toLocaleDateString()}</p>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
//                   <p className="p-2 bg-gray-50 rounded-lg">{new Date(selectedTask.end_date).toLocaleDateString()}</p>
//                 </div>
//               </div>
//               {selectedTask.time && (
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
//                   <p className="p-2 bg-gray-50 rounded-lg">{selectedTask.time}</p>
//                 </div>
//               )}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
//                 <div className="p-2 bg-gray-50 rounded-lg">
//                   {selectedTask.assigned_to.map((user, index) => (
//                     <span key={index} className="text-sm px-2 py-1 rounded block">
//                       {user}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//                 <p className={`p-2 rounded-lg ${getStatusColor(selectedTask.status)}`}>
//                   {selectedTask.status}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;


import React, { useState, useEffect, useId, useRef } from 'react';
import { Calendar, Clock, User, AlertCircle, Filter, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOutsideClick } from '../hooks/use-outside-click';
import axios from 'axios';
const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('priority');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-GB', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit',
    year:'numeric',
    month:'2-digit',
    day:'2-digit', 
  }));
  const tasksPerPage = 6;
  const id = useId();
  const ref = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        year:'numeric',
        month:'2-digit',
        day:'2-digit', 
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setSelectedTask(null);
      }
    }

    if (selectedTask) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedTask]);

  useOutsideClick(ref, () => setSelectedTask(null));

  const fetchTasks = async () => {
    try {
      // const response = await axios.get('https://nann-mudhalvan-cl4dmw64h-shriharitechs-projects.vercel.app/task/getTask', {
      //   headers: {
      //     'Authorization': 'Bearer YOUR_AUTH_TOKEN' // If your API requires token-based auth
      //   },
      //   withCredentials: true // If your API uses cookie-based auth
      // });
      // const data = await response.json();
      // setTasks(data);
      // setLoading(false);
      const response = await axios.get('https://nann-mudhalvan-kgm.vercel.app/task/getTask', {
        withCredentials: true
      });
      
      // Change this line from response.json() to response.data since axios already parses JSON
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter !== 'all' && task.status.toLowerCase() !== filter) {
      return false;
    }
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !task.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !task.assigned_to.some(user => user.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        return a.priority.localeCompare(b.priority);
      case 'dueDate':
        return new Date(a.end_date) - new Date(b.end_date);
      default:
        return 0;
    }
  });

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded-md ${
            currentPage === i
              ? "bg-[#304443] text-[#C29A6B]"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const clearFilters = () => {
    setFilter('all');
    setSearchQuery('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-[#304443] rounded-xl p-6 md:p-8 mb-2 text-white shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {/* <div className="flex items-center gap-4">
            <img src = "./kgm.webp" alt="NannMudhalvan" className="bg-white w-44 h-36 mx-auto" />
            <img src="/logo.png" alt="NannMudhalvan" className="bg-white w-44 h-36 mx-auto" />
          </div> */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-4">
            <img src="./kgm.webp" alt="NannMudhalvan" className="bg-white w-36 h-28 sm:w-44 sm:h-36 mx-auto" />
            <img src="/logo.png" alt="NannMudhalvan" className="bg-white w-36 h-28 sm:w-44 sm:h-36 mx-auto mt-4 sm:mt-0" />
          </div>
          <div className="flex items-center justify-end font-bold gap-2 text-[#C29A6B] text-3xl">
            {currentTime}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Scheduled Tasks</h1>
        
        <div className="flex flex-wrap gap-4 items-center mb-6">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <select 
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="ongoing">OnGoing</option>
              <option value="upcoming">UpComing</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-[#304443] text-[#C29A6B] rounded-lg hover:bg-[#304443]/90 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {currentTasks.map((task) => (
            <motion.div
              layoutId={`card-${task._id}-${id}`}
              key={task._id}
              onClick={() => handleTaskClick(task)}
              className="bg-[#304443] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6">
                <motion.div layoutId={`header-${task._id}-${id}`} className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-[#C29A6B] mb-2">{task.title}</h2>
                </motion.div>
                
                <motion.p layoutId={`desc-${task._id}-${id}`} className="text-[#C29A6B] mb-4 line-clamp-2">
                  {task.description}
                </motion.p>
                
                <motion.div layoutId={`details-${task._id}-${id}`} className="space-y-3">
                  <div className="flex items-center text-[#C29A6B]">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span className="text-sm">
                      {new Date(task.start_date).toLocaleDateString('en-GB')} - {new Date(task.end_date).toLocaleDateString('en-GB')}
                    </span>
                  </div>

                  {task.time && (
                    <div className="flex items-center text-[#C29A6B]">
                      <Clock className="h-5 w-5 mr-2" />
                      <span className="text-sm">{task.time}</span>
                    </div>
                  )}

                  <div className="flex items-center text-[#C29A6B]">
                    <User className="h-5 w-5 mr-2" />
                    <div className="flex flex-wrap gap-1">
                      {task.assigned_to.map((user, index) => (
                        <span key={index} className="text-sm px-2 py-1 rounded">
                          {user}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center text-[#C29A6B]">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span className={`text-sm px-2 py-1 rounded ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedTask && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            />
            <div className="fixed inset-0 grid place-items-center z-[60] p-4">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-4 right-4 bg-white rounded-full p-2"
                onClick={() => setSelectedTask(null)}
              >
                <X className="h-6 w-6" />
              </motion.button>
              
              <motion.div
                layoutId={`card-${selectedTask._id}-${id}`}
                ref={ref}
                className="w-full max-w-[500px] bg-white dark:bg-neutral-900 rounded-xl overflow-hidden shadow-xl"
              >
                <motion.div layoutId={`header-${selectedTask._id}-${id}`} className="p-6 bg-white border-b">
                  <h2 className="text-2xl font-semibold">{selectedTask.title}</h2>
                </motion.div>

                <motion.div layoutId={`desc-${selectedTask._id}-${id}`} className="p-6 bg-white">
                  <p className="text-gray-700 dark:text-gray-700">{selectedTask.description}</p>
                </motion.div>

                <motion.div layoutId={`details-${selectedTask._id}-${id}`} className="p-6 bg-white space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-700 mb-1">Start Date</label>
                      <p className="text-gray-600 dark:text-gray-700">
                        {new Date(selectedTask.start_date).toLocaleDateString('en-GB')}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-700 mb-1">End Date</label>
                      <p className="text-gray-600 dark:text-gray-700">
                        {new Date(selectedTask.end_date).toLocaleDateString('en-GB')}
                      </p>
                    </div>
                  </div>

                  {selectedTask.time && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-700 mb-1">Time</label>
                      <p className="text-gray-600 dark:text-gray-400">{selectedTask.time}</p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-700 mb-1">Status</label>
                    <span className={`inline-block px-3 py-1 rounded-full ${getStatusColor(selectedTask.status)}`}>
                      {selectedTask.status}
                    </span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-700 mb-1">Assigned To</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedTask.assigned_to.map((user, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-white rounded-full text-sm">
                          {user}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
      {filteredTasks.length > 0 && (
        <div className="mt-6 flex justify-center items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          {renderPaginationButtons()}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}

      {isModalOpen && selectedTask && (
        <div className="fixed inset-0 backdrop-brightness-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{selectedTask.title}</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <p className="p-2 bg-gray-50 rounded-lg">{selectedTask.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <p className="p-2 bg-gray-50 rounded-lg">{new Date(selectedTask.start_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <p className="p-2 bg-gray-50 rounded-lg">{new Date(selectedTask.end_date).toLocaleDateString()}</p>
                </div>
              </div>
              {selectedTask.time && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <p className="p-2 bg-gray-50 rounded-lg">{selectedTask.time}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                <div className="p-2 bg-gray-50 rounded-lg">
                  {selectedTask.assigned_to.map((user, index) => (
                    <span key={index} className="text-sm px-2 py-1 rounded block">
                      {user}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <p className={`p-2 rounded-lg ${getStatusColor(selectedTask.status)}`}>
                  {selectedTask.status}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;