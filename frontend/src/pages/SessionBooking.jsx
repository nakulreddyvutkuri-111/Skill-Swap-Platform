import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const SessionBooking = () => {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    date: '',
    notes: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const res = await api.get(`/api/skills/${skillId}`);
        setSkill(res.data);
      } catch (err) {
        setError('Failed to load skill details');
      } finally {
        setLoading(false);
      }
    };
    fetchSkill();
  }, [skillId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/sessions', {
        mentorId: skill.mentorId._id,
        skillId: skill._id,
        date: formData.date,
        notes: formData.notes
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book session');
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!skill) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="card p-8">
        <h1 className="text-2xl font-bold mb-2">Book a Session</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Request a session for <span className="font-semibold">{skill.name}</span> with {skill.mentorId.name}.
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Select Date & Time</label>
            <input 
              type="datetime-local" 
              required
              className="input"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message to Mentor (Optional)</label>
            <textarea 
              rows="4" 
              className="input"
              placeholder="Briefly describe what you want to learn or discuss..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            ></textarea>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={() => navigate(-1)} className="btn-outline">Cancel</button>
            <button type="submit" className="btn-primary">Request Session</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SessionBooking;
