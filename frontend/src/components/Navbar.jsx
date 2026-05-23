import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BookOpen, LogOut, User as UserIcon, LogIn, UserPlus, Home, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="glass sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              SkillSwap
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/skills" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
              Marketplace
            </Link>
            
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors flex items-center">
                  <LayoutDashboard className="h-5 w-5 mr-1" />
                  Dashboard
                </Link>
                <Link to="/profile" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors flex items-center">
                  <UserIcon className="h-5 w-5 mr-1" />
                  Profile
                </Link>
                <button onClick={handleLogout} className="btn-outline flex items-center !py-1.5 !px-3 text-sm">
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-outline flex items-center !py-1.5 !px-3 text-sm">
                  <LogIn className="h-4 w-4 mr-1" />
                  Login
                </Link>
                <Link to="/register" className="btn-primary flex items-center !py-1.5 !px-3 text-sm">
                  <UserPlus className="h-4 w-4 mr-1" />
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
