import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

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
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        console.log('Login submitted:', formData);
        setIsLoading(false);
        // Redirect or handle successful login
        navigate('/interface', { state: { formData }});
      }, 1500);
    }
  };

  return (
    <div className="h-screen bg-black flex flex-col justify-center py-12 sm:px-8 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex items-center text-indigo-400 hover:text-indigo-300 mb-6">
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Back to home
        </Link>
        
        <h2 className="mt-6 text-center text-3xl font-extrabold text-indigo-600">
          Login to Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
        </p>
      </div>

      <div className="mt-4 sm:mx-auto w-full max-w-2xl flex justify-center">
      <div className="bg-gray-1000 py-10 px-10 shadow-[0_0_20px_rgba(255,255,255,0.3)] sm:rounded-lg sm:px-8 border border-gray-700">
          <form className="space-y-4" onSubmit={handleSubmit}>
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
                  value={formData.email}
                  onChange={handleChange}
                 className={`bg-black block w-[105%] pl-10 pr-3 py-1 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="Email"
                />
              </div>
              {errors.email && <p className="mt-2 text-m text-red-400">{errors.email}</p>}
            </div>

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
                  value={formData.password}
                  onChange={handleChange}
                  className={`bg-black block w-[105%] pl-10 pr-3 py-1 border ${errors.password ? 'border-red-500' : 'border-gray-600'} rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
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
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm mb-8">
                <Link to="/forgot-password" className="font-medium text-indigo-400 hover:text-indigo-300 ">
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
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
            </div>
            {/* Sign up prompt */}
           <div className="mt-4 text-sm text-center text-gray-300">
           Don’t have an account?{' '}
           <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">
          Sign up
          </Link>
          </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-sm font-medium text-white hover:bg-gray-600"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0110 4.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>

              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-sm font-medium text-white hover:bg-gray-600"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 533.5 544.3"  xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
   <path
    d="M533.5 278.4c0-17.8-1.6-35-4.7-51.7H272v97.9h146.8c-6.3 33.9-25.6 62.7-54.8 81.9v67h88.7c52-47.9 82-118.3 82-195.1z"
    fill="#4285f4"
  />
  <path
    d="M272 544.3c73.4 0 135.2-24.3 180.3-66.2l-88.7-67c-24.7 16.6-56.5 26.3-91.6 26.3-70.4 0-130-47.6-151.5-111.4h-89v69.9c45.1 89.6 137.6 148.4 240.5 148.4z"
    fill="#34a853"
  />
  <path
    d="M120.5 321.1c-10.3-30.4-10.3-63.1 0-93.5v-69.9h-89c-37.6 73-37.6 160.6 0 233.6l89-70.2z"
    fill="#fbbc04"
  />
  <path
    d="M272 107.7c38.8-.6 76.2 14.1 104.6 40.7l78.5-78.5C402.7 24.7 340.9 0 272 0 169.1 0 76.6 58.8 31.5 148.4l89 69.9c21.5-63.8 81.1-111.4 151.5-111.4z"
    fill="#ea4335"
  />                  
  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;