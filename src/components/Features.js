import { ArchiveBoxIcon, DeviceTabletIcon, ArrowDownIcon, ArrowRightCircleIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Drag & Drop Builder',
    description:
      'Intuitive interface that lets you build applications by simply dragging and dropping components.',
    icon: ArrowDownIcon,
  },
  {
    name: 'Pre-built Templates',
    description:
      'Jumpstart your project with professionally designed templates for common use cases.',
    icon: DeviceTabletIcon,
  },
  {
    name: 'Real-time Collaboration',
    description:
      'Work together with your team in real-time, seeing changes as they happen.',
    icon: ArchiveBoxIcon,
  },
  {
    name: 'Database Integration',
    description:
      'Connect to any database or API with just a few clicks, no coding required.',
    icon: ArrowRightCircleIcon,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-12 bg-gradient-to-b from-indigo-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Features
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Everything you need to build amazing apps
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our platform provides all the tools you need to create professional applications without writing a single line of code.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-white">
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}