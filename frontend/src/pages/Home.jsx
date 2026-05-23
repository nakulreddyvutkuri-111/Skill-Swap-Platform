import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 bg-gradient-to-br from-indigo-50 via-white to-pink-50 dark:from-gray-900 dark:via-dark dark:to-gray-900 transition-colors">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
            >
              Exchange Skills, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Empower Your Future
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-10"
            >
              Join the premier peer-to-peer micro-learning platform. Teach what you know, learn what you need, and grow together.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center space-x-4"
            >
              <Link to="/register" className="btn-primary text-lg px-8 py-3 flex items-center group">
                Get Started
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/skills" className="btn-outline text-lg px-8 py-3">
                Explore Skills
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-dark-paper transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose SkillSwap?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We provide the tools you need to connect, learn, and share your expertise seamlessly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Users className="w-10 h-10 text-primary" />}
              title="Community Driven"
              description="Connect with passionate learners and experts across various fields globally."
            />
            <FeatureCard 
              icon={<Zap className="w-10 h-10 text-yellow-500" />}
              title="Micro-Learning"
              description="Focus on targeted, bite-sized sessions that deliver immediate value."
            />
            <FeatureCard 
              icon={<Star className="w-10 h-10 text-secondary" />}
              title="Quality Assured"
              description="Read and write reviews to ensure high-quality learning experiences."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="card p-8 text-center"
  >
    <div className="mx-auto bg-indigo-50 dark:bg-gray-800 w-20 h-20 rounded-full flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </motion.div>
);

export default Home;
