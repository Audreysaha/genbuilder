import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Palette, Zap, Database, Rocket } from 'lucide-react';

export function HowItWorks() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const steps = [
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Visual Design",
      description: "Drag and drop components to create your interface visually",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Project Managament",
      description: "Create and Manage your projects",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Code Preview",
      description: "Live Preview is available for testing UI designs",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Instant Deploy",
      description: "Deploy your application with one click",
      color: "from-orange-500 to-red-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

return (
  <section className="py-1 bg-gradient-to-b from-black to-indigo-900 relative overflow-hidden">
    <motion.div
      className="absolute top-7 left-1/4 w-96 h-76 bg-purple-500/20 rounded-full mix-blend-overlay filter blur-3xl"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.2, 0.1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />

    <div className="container mx-auto px-4 sm:px-4 lg:px-8">
      {/* MOVED VIDEO TO TOP */}
      <div className="mb-16 relative">
        <div className="aspect-video rounded-xl overflow-hidden bg-gray-900/80 backdrop-blur-xl border border-white/10">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source
              src="https://cdn.vev.design/a/DQ96cU5bx/p/XoYKo6hk0m/v/fEPIwYD6DS/hd-h264.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
      </div>

      {/* HEADINGS */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          How <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">GenBuilder</span> Works
        </motion.h2>
        <motion.p
          className="text-xl text-gray-400"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Build powerful applications in the following steps
        </motion.p>
      </div>

      {/* FEATURE STEPS */}
      <div ref={ref} className="relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              <div className="relative z-10 bg-gray-900 backdrop-blur-xl rounded-xl p-6 border border-white/10 h-full transform transition-transform duration-300 group-hover:-translate-y-2">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${step.color} mb-4`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
              <div className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300 blur-xl`} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);
}