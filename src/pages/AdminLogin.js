import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import API from '../utils/AAPI';

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
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    const api = new API();

    try {
      const response = await api.postData(
        `${api.apiUrl}/api/auth/login`,
        formData
      );

      if (response.success) {
        localStorage.setItem('token', response.user.token);

        localStorage.setItem('user', JSON.stringify(response.user));

        let token = localStorage.getItem('token');
        console.log(token)
        navigate('/Admin_dashboard');
      } else {
        setErrors({ general: response.error || 'Login failed' });
      }
    } catch (error) {
      setErrors({ general: error.message || 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-black flex flex-col justify-center py-12 sm:px-8 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-indigo-600">
          Login as Admin
        </h2>
      </div>

      <div className="mt-4 sm:mx-auto w-full max-w-2xl flex justify-center">
        <div className="bg-gray-1000 py-10 px-10 shadow-[0_0_20px_rgba(255,255,255,0.3)] sm:rounded-lg sm:px-8 border border-gray-700">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-m font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`bg-black block w-[105%] pl-10 pr-3 py-1 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="admin@example.com"
                />
              </div>
              {errors.email && <p className="mt-2 text-m text-red-400">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-m font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  minLength="6"
                  value={formData.password}
                  onChange={handleChange}
                  className={`bg-black block w-[105%] pl-10 pr-3 py-1 border ${errors.password ? 'border-red-500' : 'border-gray-600'} rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="securePassword123"
                />
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-400">{errors.password}</p>}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-[105%] flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-m font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
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
                <p className="mt-2 text-sm text-red-400 text-center">{errors.general}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;