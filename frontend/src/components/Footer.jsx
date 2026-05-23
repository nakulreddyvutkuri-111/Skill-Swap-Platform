const Footer = () => {
  return (
    <footer className="bg-white dark:bg-dark-paper border-t border-gray-200 dark:border-gray-800 py-8 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            SkillSwap
          </span>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Share knowledge. Learn together. Grow endlessly.
          </p>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} SkillSwap Platform. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
