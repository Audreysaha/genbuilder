import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';


const navigation = [
  {
    name: 'Features',
    href: '#features',
  },
  {
    name: 'Testimonials',
    href: '#testimonials',
  },
  {
    name: 'Pricing',
    href: '#pricing',
  },
];

const company = [
  {
    name: 'About',
    href: '/Docs',
  },
  {
    name: 'Careers',
    href: '#',
  },
  {
    name: 'Contact',
    href: '#',
  },
];

const social = [
  {
    name: 'Facebook',
    href: '#',
    icon: FaFacebook,
  },
  {
    name: 'Twitter',
    href: '#',
    icon: FaTwitter,
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: FaLinkedinIn,
  },
  {
    name: 'GitHub',
    href: '#',
    icon: FaGithub,
  },
];

export default function Footer() {
  return (
    <footer className="bg-black" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link to="/" className="text-2xl font-bold gradient-text">
              GenBuilder
            </Link>
            <p className="text-gray-500 text-base">
              Empowering everyone to build software without writing code.
            </p>
            <div className="flex space-x-6">
              {social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  Product
                </h3>
                <ul className="mt-4 space-y-4">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-gray-500 hover:text-indigo-500"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  Company
                </h3>
                <ul className="mt-4 space-y-4">
                  {company.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-gray-500 hover:text-indigo-500"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  Resources
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href="/Docs"
                      className="text-base text-gray-500 hover:text-indigo-500"
                    >
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="/Docs"
                      className="text-base text-gray-500 hover:text-indigo-500"
                    >
                      Guides
                    </a>
                  </li>
                  <li>
                    <a
                      href="Docs"
                      className="text-base text-gray-500 hover:text-indigo-500"
                    >
                      Blog
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href="/Docs"
                      className="text-base text-gray-500 hover:text-indigo-500"
                    >
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a
                      href="/Docs"
                      className="text-base text-gray-500 hover:text-indigo-500"
                    >
                      Terms
                    </a>
                  </li>
                  <li>
                    <a
                      href="/Docs"
                      className="text-base text-gray-500 hover:text-indigo-500"
                    >
                      Cookie Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {new Date().getFullYear()} GenBuilder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}