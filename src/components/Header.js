import { Link } from 'react-router-dom';
import { ArrowRightOnRectangleIcon, UserPlusIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const mainLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Docs', href: '/docs', type: 'route' },
  ];

  const authLinks = [
    {
      name: 'Login',
      href: '/login',
      icon: <ArrowRightOnRectangleIcon className="h-5 w-5" />,
      className: 'text-white hover:text-white hover:bg-indigo-900 rounded-lg',
    },
    {
      name: 'Register',
      href: '/register',
      icon: <UserPlusIcon className="h-5 w-5" />,
      className: 'bg-indigo-600 text-white hover:bg-indigo-900 rounded-lg shadow-lg shadow-indigo-900',
    },
  ];

  return (
    <header className="bg-gradient-to-b from-black to-indigo-900 bg-no-repeat bg-center sticky top-0 z-50 backdrop-blur-sm">
      <nav className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-32">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 hover:from-indigo-300 hover:to-purple-300 transition-all duration-300"
            >
              Codeless Pro
            </Link>
          </div>

          {/* Center Navigation Links */}
          <div className="hidden lg:flex flex-2 justify-center">
            <div className="flex space-x-5">
              {mainLinks.map((link) =>
                link.type === 'route' ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-white hover:text-white px-5 py-3 text-[17px] font-medium transition-all duration-300 hover:bg-indigo-900/30 rounded-lg"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-white hover:text-white px-5 py-3 text-[17px] font-medium transition-all duration-300 hover:bg-indigo-900/30 rounded-lg"
                  >
                    {link.name}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Right-aligned Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {authLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`flex items-center space-x-2 px-4 py-2 text-[16px] font-medium transition-all duration-300 rounded-full ${link.className}`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
