import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const SkillMarketplace = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/skills?keyword=${keyword}&category=${category}`);
      setSkills(res.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchSkills();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Explore Skills</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Find mentors and experts to help you level up your skills. Browse by category or search directly.
        </p>
      </div>

      <div className="mb-10">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 justify-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search skills..." 
              className="input pl-10"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div className="relative w-full md:w-48">
            <Filter className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <select 
              className="input pl-10 appearance-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Programming">Programming</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Business">Business</option>
              <option value="Languages">Languages</option>
            </select>
          </div>
          <button type="submit" className="btn-primary">Search</button>
        </form>
      </div>

      {loading ? (
        <div className="text-center py-20">Loading skills...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <motion.div 
                key={skill._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card flex flex-col h-full"
              >
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                      {skill.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{skill.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {skill.description}
                  </p>
                  <div className="flex items-center mt-4">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden mr-3">
                      {skill.mentorId?.profilePhoto ? (
                        <img src={skill.mentorId.profilePhoto} alt="Mentor" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-primary flex items-center justify-center text-white text-xs">
                          {skill.mentorId?.name?.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{skill.mentorId?.name}</p>
                      <p className="text-xs text-gray-500">Mentor</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-100 dark:border-gray-800 mt-auto">
                  <Link to={`/book-session/${skill._id}`} className="block w-full text-center btn-primary">
                    Book Session
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-500">
              No skills found matching your criteria.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillMarketplace;
