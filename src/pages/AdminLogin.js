import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import API from '../utils/API';
import { LocalStorageManager } from '../utils/LocalStorageManager';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    const api = new API();
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);

      api.postData(api.apiUrl + "/api/admin/auth/login", formData, false)
        .then((res) => {
          if (res.token) {
            LocalStorageManager.setItem("token", res.token)
            navigate('/Admin_dashboard', { state: { formData } });
          } else {
            setErrors({ general: "Invalid credentials" });
            setIsLoading(false);
          }
        }).catch((err) => {
          setIsLoading(false);
          const message = err?.response?.data?.message || "Login failed. Please try again.";
          setErrors({ general: message });
        })
    }
  };

  return (
    <div className="h-screen bg-indigo-200 flex flex-col justify-center py-12 sm:px-8 lg:px-8">
      

      <div className="mt-4 sm:mx-auto w-[3100px] h-[500px] max-w-4xl flex justify-center">
        <div className="bg-white py-1 px-10 shadow-[0_0_20px_rgba(255,255,255,0.3)]  sm:px-8 border border-white">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-indigo-600">
          Login as Admin
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
        </p>
      </div>
            <div>
              <label htmlFor="email" className="block text-m font-medium text-gray-600 mb-4">
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none hover:Outline-indigo-700">
                  <EnvelopeIcon className="h-5 w-5 text-gray-600" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`bg-white block w-[105%] pl-10 pr-3 py-1 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-md text-black placeholder-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="Email"
                />
              </div>
              {errors.email && <p className="mt-2 text-m text-red-400">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-m font-medium text-gray-600 mb-2">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm hover:indigo-700">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-600" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`bg-white block w-[105%] pl-10 pr-3 py-1 border ${errors.password ? 'border-red-500' : 'border-gray-600'} rounded-md text-black placeholder-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="Password"
                />
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-400">{errors.password}</p>}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
              <div className="flex items-center mb-8">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 rounded bg-gray-700"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                  Remember me
                </label>
              </div>

              <div className="text-sm mb-8">
                <Link to="/forgot-password" className="font-medium text-indigo-400 hover:text-indigo-700 ">
                  Forgot password?
                </Link>
              </div>
            </div>

            <div className= "mb-8">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-[105%] flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-m font-medium text-white bg-indigo-600 hover:bg-indigo-700 indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : 'Login'}
              </button>
              {errors.general && (
                <p className="text-red-400 text-sm text-center">{errors.general}</p>
              )}
            </div>
           
          </form>


            

             
            </div>
          </div>
        </div>
  );
}

export default Login;