import React, { useContext, useState, useEffect, useRef } from 'react';
import { User, Mail, Phone, Lock, Edit2, Check, X, Camera } from 'lucide-react';
import Sidebar from "./Sidebar";
import { ProfileContext } from './ProfileContext';

// Custom Card Components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white shadow-lg rounded-xl overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const Profile = () => {
  const { profile, updateProfile, setProfile } = useContext(ProfileContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({...profile});
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const inputRefs = {
    username: useRef(),
    email: useRef(),
    phone: useRef(),
    password: useRef()
  };

  useEffect(() => {
    setEditedProfile({...profile});
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const currentFocusedElement = document.activeElement;
    setEditedProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
    if (currentFocusedElement && inputRefs[name]?.current) {
      requestAnimationFrame(() => {
        inputRefs[name].current.focus();
        const length = value.length;
        currentFocusedElement.setSelectionRange(length, length);
      });
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleSave = async () => {
  //   setIsLoading(true);
  //   setMessage('');
  //   setIsError(false);

  //   try {
  //     const userId = sessionStorage.getItem('user');
  //     // const responseMessage = await updateProfile(userId, editedProfile);
  //     const fullProfileUpdate = {
  //       ...profile,
  //       ...editedProfile

  //     };
  //     console.log('Saving profile:', fullProfileUpdate);
  //     const responseMessage = await updateProfile(userId, fullProfileUpdate);
  //     console.log('Profile update response:', responseMessage);
  //     setMessage(responseMessage);
  //     setIsEditing(false);
  //   } catch (error) {
  //     console.error('Error updating profile:', error);
  //     setIsError(true);
  //     setMessage('Failed to update profile. Please try again.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSave = async () => {
    setIsLoading(true);
    setMessage('');
    setIsError(false);
  
    try {
      const userId = sessionStorage.getItem('user');
      const fullProfileUpdate = {
        ...profile, // Ensures merging with existing profile data
        ...editedProfile
      };
  
      const responseMessage = await updateProfile(userId, fullProfileUpdate);
  
      // Update the global profile state with the new data
      setProfile(fullProfileUpdate);
      setMessage(responseMessage);
  
      // Sync editedProfile with the updated profile
      setEditedProfile(fullProfileUpdate);
  
      setIsEditing(false);
      setTimeout(()=>{
        setMessage('');
      },3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setIsError(true);
      setMessage('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const InputField = ({ icon: Icon, label, name, type = "text", value, onChange, disabled = false }) => (
    <div className="relative">
      <label className="text-sm font-medium text-gray-700 mb-1 block">
        {label}
      </label>
      <div className="relative mt-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          ref={inputRefs[name]}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="block w-full pl-10 py-2.5 sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b0f] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
          placeholder={`Enter your ${label.toLowerCase()}`}
        />
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="mt-2 text-gray-600">Manage your account settings and preferences</p>
          </div>

          <Card>
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    {(isEditing ? editedProfile.image : profile?.image) ? (
                      <img 
                        src={isEditing ? editedProfile.image : profile.image} 
                        alt="Profile" 
                        className="h-20 w-20 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-20 w-20 rounded-full bg-[#304443] flex items-center justify-center text-[#C29A6B] text-2xl font-bold">
                        {profile?.username?.charAt(0)}
                      </div>
                    )}
                    {isEditing && (
                      <>
                        <input
                          type="file"
                          accept="image/*"
                          id="profileImageInput"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                        {/* <button
                          onClick={() => document.getElementById('profileImageInput').click()}
                          className="absolute bottom-0 right-0 p-1.5 bg-[#f26b0f] rounded-full text-white hover:bg-[#f26b0f]/90 transition-colors"
                        >
                          <Camera className="h-4 w-4" />
                        </button> */}
                      </>
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{profile?.username}</h2>
                    <p className="text-gray-500">{profile?.role}</p>
                    <p className="text-sm text-gray-500">{profile?.location}</p>
                  </div>
                </div>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-[#304443] text-[#C29A6B] rounded-lg hover:bg-[#304443]/90 transition-colors shadow-sm"
                  >
                    <Edit2 className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <div className="flex space-x-3">
                    <button
                      onClick={handleCancel}
                      className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 px-4 py-2 bg-[#304443] text-white rounded-lg hover:bg-[#304443]/90 transition-colors shadow-sm"
                      disabled={isLoading}
                    >
                      <Check className="h-4 w-4" />
                      <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  icon={User}
                  label="Full Name"
                  name="username"
                  value={editedProfile.username || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <InputField
                  icon={Mail}
                  label="Email Address"
                  name="email"
                  type="email"
                  value={editedProfile.email || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <InputField
                  icon={Phone}
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={editedProfile.phone || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <InputField
                  icon={Lock}
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={editedProfile.password || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>
          {message && (
            <p className={`mt-4 text-center ${isError ? 'text-red-500' : 'text-green-500'}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;