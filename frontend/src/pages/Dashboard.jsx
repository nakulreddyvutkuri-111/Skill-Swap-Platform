import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { Calendar, CheckCircle, Clock, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await api.get('/api/sessions');
        setSessions(res.data);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await api.put(`/api/sessions/${id}/status`, { status });
      setSessions(sessions.map(s => s._id === id ? res.data : s));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) return <div className="text-center py-20">Loading dashboard...</div>;

  const upcomingSessions = sessions.filter(s => s.status === 'accepted');
  const pendingRequests = sessions.filter(s => s.status === 'pending');
  const completedSessions = sessions.filter(s => s.status === 'completed');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, {user?.name}</h1>
        <p className="text-gray-600 dark:text-gray-400">Here's what's happening with your sessions today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Upcoming Sessions" count={upcomingSessions.length} icon={<Calendar className="text-primary" />} />
        <StatCard title="Pending Requests" count={pendingRequests.length} icon={<Clock className="text-yellow-500" />} />
        <StatCard title="Completed" count={completedSessions.length} icon={<CheckCircle className="text-green-500" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Requests */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Pending Requests</h2>
          {pendingRequests.length === 0 ? (
            <p className="text-gray-500 italic">No pending requests.</p>
          ) : (
            <div className="space-y-4">
              {pendingRequests.map(session => (
                <SessionItem key={session._id} session={session} user={user} onUpdate={handleUpdateStatus} />
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Sessions */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Sessions</h2>
          {upcomingSessions.length === 0 ? (
            <p className="text-gray-500 italic">No upcoming sessions.</p>
          ) : (
            <div className="space-y-4">
              {upcomingSessions.map(session => (
                <SessionItem key={session._id} session={session} user={user} onUpdate={handleUpdateStatus} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, count, icon }) => (
  <motion.div whileHover={{ y: -5 }} className="card p-6 flex items-center">
    <div className="p-4 bg-indigo-50 dark:bg-gray-800 rounded-lg mr-4">
      {icon}
    </div>
    <div>
      <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  </motion.div>
);

const SessionItem = ({ session, user, onUpdate }) => {
  const isMentor = session.mentorId?._id === user._id;
  const otherUser = isMentor ? session.requesterId : session.mentorId;
  const skill = session.skillId;

  return (
    <div className="border border-gray-100 dark:border-gray-800 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-medium text-lg">{skill?.name}</h4>
          <p className="text-sm text-gray-500">
            {isMentor ? 'Requested by' : 'Mentor'}: {otherUser?.name}
          </p>
        </div>
        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
          {new Date(session.date).toLocaleDateString()}
        </span>
      </div>
      
      {session.notes && (
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 italic">"{session.notes}"</p>
      )}

      {session.status === 'pending' && isMentor && (
        <div className="flex space-x-2 mt-4">
          <button onClick={() => onUpdate(session._id, 'accepted')} className="btn-primary py-1 px-3 text-sm">Accept</button>
          <button onClick={() => onUpdate(session._id, 'rejected')} className="btn-outline text-red-500 border-red-500 hover:bg-red-500 py-1 px-3 text-sm">Reject</button>
        </div>
      )}
      
      {session.status === 'accepted' && (
        <div className="mt-4">
          <button onClick={() => onUpdate(session._id, 'completed')} className="btn-outline border-green-500 text-green-500 hover:bg-green-500 py-1 px-3 text-sm">Mark Completed</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
