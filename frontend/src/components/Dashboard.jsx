import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Plus, Calendar as CalendarIcon, Clock, User, Flag } from "lucide-react";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showNotification, setShowNotification] = useState(false);  
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-GB', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit',
    year:'numeric',
    month:'2-digit',
    day:'2-digit', 
  }));

  const [tasks, setTasks] = useState([]);
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    status: "",
    assigned_to: "",
    priority: "",
    time:"",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/task/getTask');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        year:'numeric',
        month:'2-digit',
        day:'2-digit'
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [fieldErrors, setFieldErrors] = useState({});

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails({ ...taskDetails, [name]: value });
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = ['title', 'description', 'start_date', 'end_date', 'assigned_to'];
    requiredFields.forEach(field => {
      if (!taskDetails[field]) {
        errors[field] = true;
      }
    });
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setTasks([...tasks, { ...taskDetails, id: tasks.length + 1 }]);
    setShowNotification(true);
    setIsModalOpen(false);
    setTaskDetails({
      title: "",
      description: "",
      start_date: "",
      end_date: "",
      status: "",
      assigned_to: "",
      priority: "",
      time: "",
    });
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  useEffect(() => {
    if (Object.keys(fieldErrors).length > 0) {
      const timer = setTimeout(() => {
        setFieldErrors({});
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [fieldErrors]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const motivationalQuotes = [
    "The only way to do great work is to love what you do.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Don't watch the clock; do what it does. Keep going.",
    "The future depends on what you do today.",
    "Your time is limited, don't waste it living someone else's life.",
  ];
  
  const [randomQuote, setRandomQuote] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setRandomQuote(motivationalQuotes[randomIndex]);
  }, []);

  const today = new Date().toISOString().split("T")[0];
  const todayTasks = tasks.filter(task => task.start_date <= today && task.end_date >= today);
  const filteredTasks = tasks.filter(task => task.status !== "completed");
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 overflow-hidden">
        {/* Header Section */}
        <div className="bg-[#304443] rounded-xl p-6 md:p-8 mb-2 text-white shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="mt-2 text-[#C29A6B] italic text-sm md:text-base">{randomQuote}</p>
            </div>
            {showNotification && (
              <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg">
                Task Created Successfully
              </div>
            )}
            <div className="flex items-center justify-end font-bold gap-2 text-[#C29A6B] text-3xl">{currentTime}</div>
          </div>
          {/* <div className="flex justify-end flex-col md:flex-row items-center gap-4 mt-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center px-4 py-2 bg-white text-[#c2560c] rounded-lg hover:bg-gray-50 transition-colors shadow-sm w-full md:w-auto justify-center"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Schedule
            </button>
          </div> */}
        </div>
        <div className="bg-white rounded-xl shadow-sm gap-24 mt-10 overflow-hidden flex flex-col md:grid md:grid-cols-1">
          <div className="flex-1 p-6">
            <h2 className="text-xl font-semibold text-[#C29A6B] mb-6">Created Schedules</h2>
            <div className="max-h-96 overflow-y-auto">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="mb-4 p-4 bg-[#304443] rounded-lg hover:bg-gray-100 transition-colors border border-gray-100"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex-1">
                      <h3 className="font-medium text-[#C29A6B]">{task.title}</h3>
                      <div className="flex items-center gap-2 mt-2 text-[#C29A6B] text-sm">
                        <Clock className="h-4 w-4" />
                        <span>{formatDate(task.start_date)} - {formatDate(task.end_date)}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-[#C29A6B] text-sm">
                        <User className="h-4 w-4" />
                        <span>Assigned To - {task.assigned_to}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {/* <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                        task.priority === "High" 
                          ? "bg-red-100 text-red-800"
                          : task.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}>
                        <Flag className="h-3 w-3" />
                        {task.priority}
                      </span> */}
                      <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                        task.status === "ongoing" 
                          ? "bg-blue-100 text-blue-800"
                          : task.status === "upcoming"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-green-100 text-green-800"
                      }`}>
                        <CalendarIcon className="h-3 w-3" />
                        {task.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Create New Task</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleFormSubmit} noValidate>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={taskDetails.title}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        ${fieldErrors.title ? 
                          'border-red-500 bg-red-50 animate-shake' : 
                          'border-gray-200'
                        }`}
                      placeholder="Enter task title"
                    />
                    {fieldErrors.title && (
                      <p className="error-message">Title is required</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      rows="3"
                      value={taskDetails.description}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        ${fieldErrors.description ? 
                          'border-red-500 bg-red-50 animate-shake' : 
                          'border-gray-200'
                        }`}
                      placeholder="Enter task description"
                    />
                    {fieldErrors.description && (
                      <p className="error-message">Description is required</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="start_date"
                        value={taskDetails.start_date}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${fieldErrors.start_date ? 
                            'border-red-500 bg-red-50 animate-shake' : 
                            'border-gray-200'
                          }`}
                      />
                      {fieldErrors.start_date && (
                        <p className="error-message">Start date is required</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="end_date"
                        value={taskDetails.end_date}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${fieldErrors.end_date ? 
                            'border-red-500 bg-red-50 animate-shake' : 
                            'border-gray-200'
                          }`}
                      />
                      {fieldErrors.end_date && (
                        <p className="error-message">
                          {fieldErrors.dateMessage || "End date is required"}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Assigned To <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="assigned_to"
                        value={taskDetails.assigned_to}
                        onChange={handleInputChange}
                        className={`w-full pl-9 p-2 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${fieldErrors.assigned_to ? 
                            'border-red-500 bg-red-50 animate-shake' : 
                            'border-gray-200'
                          }`}
                        placeholder="Enter assignee name"
                      />
                      {fieldErrors.assigned_to && (
                        <p className="error-message">Assignee is required</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                      <select
                        name="priority"
                        className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={taskDetails.priority}
                        onChange={handleInputChange}
                      >
                        <option value="">Select</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        name="status"
                        className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={taskDetails.status}
                        onChange={handleInputChange}
                      >
                        <option value="">Select</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setFieldErrors({});
                    }}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#304443] text-white rounded-lg hover:bg-[#304443]/90 transition-colors"
                  >
                    Create Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;