import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [errorTimeouts, setErrorTimeouts] = useState({});
  const navigate = useNavigate();
  const validateField = (name, value) => {
    const newErrors = { ...errors };
    const usernameRegex = /^[a-zA-Z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    switch (name) {
      case 'username':
        if (!usernameRegex.test(value)) {
          newErrors.username = 'Username should contain only alphabets';
        } else {
          delete newErrors.username;
        }
        break;
      case 'email':
        if (!emailRegex.test(value)) {
          newErrors.email = 'Invalid Email address Format';
        } else {
          delete newErrors.email;
        }
        break;
      case 'password':
        if (!passwordRegex.test(value)) {
          newErrors.password = 'Password should contain at least 8 characters, one uppercase, one lowercase, one number, and one special character';
        } else {
          delete newErrors.password;
        }
        break;
      case 'confirmPassword':
        if (value !== formData.password) {
          newErrors.confirmPassword = 'Passwords do not match';
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);

    // Clear previous timeout if it exists
    if (errorTimeouts[name]) {
      clearTimeout(errorTimeouts[name]);
    }

    // Set a new timeout to clear the error after 3 seconds
    const timeout = setTimeout(() => {
      setErrors((prevErrors) => {
        const { [name]: _, ...rest } = prevErrors;
        return rest;
      });
    }, 3000);

    setErrorTimeouts((prevTimeouts) => ({
      ...prevTimeouts,
      [name]: timeout,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateForm = () => {
    const newErrors = {};
    const usernameRegex = /^[a-zA-Z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!usernameRegex.test(formData.username)) {
      newErrors.username = 'Username should contain only alphabets';
    }
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid Email address Format';
    }
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password should contain at least 8 characters, one uppercase, one lowercase, one number, and one special character';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('https://nann-mudhalvan-kgm.vercel.app/user/register', formData);
        console.log('User registered successfully:', response.data);
        navigate('/');
        // Handle successful registration (e.g., redirect to login page)
      } catch (error) {
        console.error('Error registering user:', error.response.data);
        // Handle registration error (e.g., display error message)
      }
    }
    navigate('/');
    // Add your form submission logic here
  };

  return (
    <div className="min-h-screen flex items-center  justify-center bg-gray-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-sm">
        <div className="text-center">
          <img src="/logo.png" alt="NaanMudhalvan" className="w-44 h-36 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-800">Create an Account</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5D4B] focus:border-transparent"
              placeholder="Enter your username"
              required
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="number"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5D4B] focus:border-transparent"
              placeholder="Enter your Phnoe Number"
              required
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5D4B] focus:border-transparent"
              placeholder="Enter your email"
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5D4B] focus:border-transparent"
              placeholder="Enter your password"
              required
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5D4B] focus:border-transparent"
              placeholder="Confirm your password"
              required
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-[#304443] text-[#C29A6B] py-2 px-4 rounded-lg shadow-md hover:bg-[#FF5D4B]/90 focus:outline-none focus:ring-2 focus:ring-[#CA3177] focus:ring-offset-2"
          >
            Sign up
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/" className="text-[#C29A6B] hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;