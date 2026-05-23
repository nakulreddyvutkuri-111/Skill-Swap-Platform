import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { User, Camera } from 'lucide-react';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    skillsOffered: '',
    skillsWanted: '',
    experienceLevel: 'Beginner'
  });
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/api/users/profile');
        const data = res.data;
        setFormData({
          name: data.name || '',
          bio: data.bio || '',
          skillsOffered: data.skillsOffered?.join(', ') || '',
          skillsWanted: data.skillsWanted?.join(', ') || '',
          experienceLevel: data.experienceLevel || 'Beginner'
        });
      } catch (error) {
        console.error('Failed to fetch profile', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('bio', formData.bio);
      data.append('experienceLevel', formData.experienceLevel);
      
      // Convert comma separated strings to arrays
      if (formData.skillsOffered) {
        formData.skillsOffered.split(',').forEach(skill => data.append('skillsOffered[]', skill.trim()));
      }
      if (formData.skillsWanted) {
        formData.skillsWanted.split(',').forEach(skill => data.append('skillsWanted[]', skill.trim()));
      }

      if (photo) {
        data.append('profilePhoto', photo);
      }

      const res = await api.put('/api/users/profile', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setUser({ ...user, name: res.data.name });
      localStorage.setItem('user', JSON.stringify({ ...user, name: res.data.name }));
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Error updating profile.');
    }
  };

  if (loading) return <div className="text-center py-20">Loading profile...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="card p-8">
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
        
        {message && (
          <div className={`p-4 mb-6 rounded ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-6">
            <div className="relative w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden border-2 border-primary">
              {user?.profilePhoto ? (
                <img src={user.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-12 h-12 text-gray-400" />
              )}
            </div>
            <div>
              <label className="btn-outline cursor-pointer flex items-center">
                <Camera className="w-4 h-4 mr-2" />
                Upload Photo
                <input type="file" className="hidden" onChange={(e) => setPhoto(e.target.files[0])} accept="image/*" />
              </label>
              <p className="text-xs text-gray-500 mt-2">JPG, GIF or PNG. Max size of 2MB.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="input" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Experience Level</label>
              <select name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} className="input">
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea name="bio" value={formData.bio} onChange={handleChange} rows="4" className="input" placeholder="Tell us about yourself..."></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Skills Offered (comma separated)</label>
              <input type="text" name="skillsOffered" value={formData.skillsOffered} onChange={handleChange} className="input" placeholder="React, Node.js, Design" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Skills Wanted (comma separated)</label>
              <input type="text" name="skillsWanted" value={formData.skillsWanted} onChange={handleChange} className="input" placeholder="Python, Marketing" />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" className="btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
