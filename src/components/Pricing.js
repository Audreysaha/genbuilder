import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

const tiers = [
  {
    name: 'Starter',
    price: 29,
    description: 'Perfect for individuals and small teams getting started.',
    features: [
      'Up to 5 applications',
      'Basic components',
      'Community support',
      '1GB storage',
      'Email support',
    ],
    cta: 'Get started',
    featured: false,
  },
  {
    name: 'Professional',
    price: 99,
    description: 'For growing businesses with more advanced needs.',
    features: [
      'Up to 20 applications',
      'All components',
      'Priority support',
      '10GB storage',
      'API access',
      'Webhooks',
    ],
    cta: 'Get started',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For organizations with complex requirements.',
    features: [
      'Unlimited applications',
      'All components + custom',
      '24/7 dedicated support',
      'Unlimited storage',
      'Advanced security',
      'Single sign-on',
      'Custom integrations',
    ],
    cta: 'Contact sales',
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-12 bg-gradient-to-b from-indigo-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Pricing
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Simple, transparent pricing
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Choose the perfect plan for your needs. No hidden fees.
          </p>
        </div>

        <div className="mt-10 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative p-8 bg-black border rounded-2xl shadow-sm ${
                tier.featured ? 'border-indigo-500 ring-2 ring-indigo-500' : 'border-gray-200'
              }`}
            >
              {tier.featured && (
                <div className="absolute top-0 py-1.5 px-4 bg-indigo-500 rounded-full text-xs font-semibold uppercase tracking-wide text-white transform -translate-y-1/2">
                  Most popular
                </div>
              )}
              <h3 className="text-lg font-medium text-white">{tier.name}</h3>
              {typeof tier.price === 'number' ? (
                <p className="mt-4 flex items-baseline text-white">
                  <span className="text-5xl font-extrabold tracking-tight">${tier.price}</span>
                  <span className="ml-1 text-xl font-semibold">/month</span>
                </p>
              ) : (
                <p className="mt-4 flex items-baseline text-white">
                  <span className="text-5xl font-extrabold tracking-tight">{tier.price}</span>
                </p>
              )}
              <p className="mt-4 text-gray-500">{tier.description}</p>
              <ul className="mt-6 space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex">
                    <AdjustmentsHorizontalIcon className="flex-shrink-0 h-5 w-5 text-indigo-500" aria-hidden="true" />
                    <span className="ml-3 text-gray-500">{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${
                  tier.featured
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}