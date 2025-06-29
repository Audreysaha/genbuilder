import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon,EnvelopeIcon,UserIcon} from '@heroicons/react/24/outline';
import API from '../utils/API';

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const api = new API();

    try {
      const res = await api.postData(api.apiUrl + "/api/admin/auth/register", formData, false);
      alert(res.message);
      navigate('/AdminLogin');
    } catch (err) {
      console.error(err);
      alert("Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-black flex flex-col justify-center py-12 px-4 sm:px-8 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex items-center text-indigo-400 hover:text-indigo-300 mb-6">
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Back to home
        </Link>

        <h2 className="mt-6 text-center text-3xl font-extrabold text-indigo-600">
          Create your Account
        </h2>
      </div>

       <div className="mt-4 sm:mx-auto w-[25%] max-w-2xl justify-center">
        <div className="bg-black py-6 px-10 shadow-[0_0_20px_rgba(255,255,255,0.3)] sm:rounded-lg sm:px-8 border border-gray-700">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-m font-medium text-gray-300">
                Full Name
              </label>
              <div className="relative mt-2">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-black block w-full pl-9 pr-2 py-2 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Name"
                />
              </div>
            </div>

            <div>
            <label htmlFor="Email" className="block text-m font-medium text-gray-300">
            Email
            </label>
            <div className="relative mt-2">
            <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
            id="Email"
            name="Email"
            type="Email"
            autoComplete="Email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="block w-full pl-10 pr-3 py-2 bg-black border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Email"
          />
          </div>
          </div>


            <div>
              <label htmlFor="password" className="block text-m font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength="8"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="mt-2 block w-full px-3 py-2 bg-black border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="********"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                  isLoading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
