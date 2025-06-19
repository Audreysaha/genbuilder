import { Link } from 'react-router-dom';
import { 
  ArrowLeftIcon, 
  BookOpenIcon, 
 ArrowDownOnSquareIcon, 
  ArrowPathIcon, 
 BellAlertIcon,
 
} from '@heroicons/react/24/outline';

const documentationSections = [
  {
    title: "Getting Started",
    icon: <BookOpenIcon className="h-5 w-5 mr-2" />,
    content: "Learn how to set up and configure your first project with our platform.",
    subsections: [
      "Installation Guide",
      "Configuration Options",
      "First Project Setup"
    ]
  },
  {
    title: "API Reference",
    icon: <ArrowDownOnSquareIcon className="h-5 w-5 mr-2" />,
    content: "Complete documentation for all available API endpoints and methods.",
    subsections: [
      "Authentication",
      "User Management",
      "Data Operations"
    ]
  },
  {
    title: "CLI Tools",
    icon: <ArrowPathIcon className="h-5 w-5 mr-2" />,
    content: "Documentation for our command-line interface tools and utilities.",
    subsections: [
      "Installation",
      "Common Commands",
      "Advanced Usage"
    ]
  },
  {
    title: "Database Guide",
    icon: <BellAlertIcon className="h-5 w-5 mr-2" />,
    content: "How to work with databases and data models in our platform.",
    subsections: [
      "Schema Design",
      "Query Builder",
      "Migrations"
    ]
  }
];

export default function Docs() {
  return (
    <div className="bg-gradient-to-br from-[#0B0B2E] via-[#1A1447] to-[#060012] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-indigo-400 hover:text-indigo-300">
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-gray-700 p-6 rounded-lg sticky top-4">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <BookOpenIcon className="h-6 w-6 mr-2" />
                Documentation
              </h2>
              <nav className="space-y-3">
                {documentationSections.map((section, index) => (
                  <a 
                    key={index}
                    href={`#${section.title.toLowerCase().replace(' ', '-')}`}
                    className="block text-gray-300 hover:text-indigo-400"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {documentationSections.map((section, index) => (
              <section 
                key={index}
                id={section.title.toLowerCase().replace(' ', '-')}
                className="bg-gray-700 p-8 rounded-lg mb-6"
              >
                <div className="flex items-center mb-4">
                  {section.icon}
                  <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                </div>
                <p className="text-gray-300 mb-6">{section.content}</p>
                
                <div className="space-y-4">
                  {section.subsections.map((subsection, subIndex) => (
                    <div key={subIndex} className="bg-gray-600 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-white mb-2">{subsection}</h3>
                      <p className="text-gray-300">Detailed documentation coming soon...</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}