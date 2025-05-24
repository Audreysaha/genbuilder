import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'Acme Inc.',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=height=80&fit=facearea&facepad=2&w=256&h=256&q=80',
    quote:
      'We built our entire customer portal in just 2 weeks with LowCodePro. It would have taken months with traditional development.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    company: 'StartupXYZ',
    image:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=height=80&fit=facearea&facepad=2&w=256&h=256&q=80',
    quote:
      'As a technical founder, I appreciate how LowCodePro lets me prototype ideas quickly without getting bogged down in implementation details.',
    rating: 5,
  },
  {
    name: 'Emma Rodriguez',
    role: 'Product Manager',
    company: 'Global Corp',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=height=80&fit=facearea&facepad=2&w=256&h=256&q=80',
    quote:
      'Our internal tools team has reduced development time by 70% since switching to LowCodePro. The business loves how quickly we can respond to their needs.',
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-12 bg-gradient-to-b from-black to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-purple sm:text-4xl">
            Trusted by businesses worldwide
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-gray-700 p-6 rounded-lg shadow"
              >
                <div className="flex items-center">
                  <img
                    className="h-12 w-12 rounded-full"
                    src={testimonial.image}
                    alt={testimonial.name}
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-500">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-white italic">"{testimonial.quote}"</p>
                  <div className="mt-3 flex">
                    {[...Array(5)].map((_, i) => (
                      <AdjustmentsHorizontalIcon
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}