import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar_url: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          console.error('No user logged in');
          return;
        }

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error && error.code !== 'PGRST116') {
          throw error;
        }
        
        if (data) {
          setProfile(data as UserProfile);
          setUpdatedProfile(data as UserProfile);
        } else {
          // If no profile exists, create a default one
          const defaultProfile: UserProfile = {
            id: user.id,
            name: 'Your Name',
            email: user.email || 'your.email@example.com',
            phone: '+1 (555) 123-4567',
            location: 'Your Location',
            avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          };
          setProfile(defaultProfile);
          setUpdatedProfile(defaultProfile);

          // Optionally, save the default profile to the database
          await supabase.from('profiles').insert([defaultProfile]);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        // Use sample data on error
        setProfile({
          id: '1',
          name: 'John Appleseed',
          email: 'john.appleseed@example.com',
          phone: '+1 (555) 123-4567',
          location: 'Cupertino, CA',
          avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        console.error('No user logged in');
        return;
      }

      if (!updatedProfile) {
        console.error('No profile data to save');
        return;
      }

      // Update the profiles table with the remaining data
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          name: updatedProfile.name,
          email: updatedProfile.email,
          phone: updatedProfile.phone,
          location: updatedProfile.location,
        })
        .eq('id', user.id);

      if (profileError) {
        throw profileError;
      }

      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-pulse text-[var(--ios-blue)]">Loading profile...</div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      
      {profile && (
        <>
          <div className="ios-card flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-[var(--ios-blue)]">
              <img 
                src={profile.avatar_url} 
                alt={profile.name} 
                className="w-full h-full object-cover"
              />
            </div>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={updatedProfile?.name || ''}
                onChange={handleInputChange}
                className="text-xl font-medium text-center"
              />
            ) : (
              <h3 className="text-xl font-medium">{profile.name}</h3>
            )}
            {isEditing ? (
              <input
                type="text"
                name="location"
                value={updatedProfile?.location || ''}
                onChange={handleInputChange}
                className="text-[var(--ios-gray)] mt-1 text-center"
              />
            ) : (
              <p className="text-[var(--ios-gray)] mt-1">{profile.location}</p>
            )}
            {isEditing ? (
              <div className="flex space-x-4 mt-4">
                <button className="ios-button" onClick={handleSaveProfile}>Save</button>
                <button className="ios-button" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            ) : (
              <button className="ios-button mt-4" onClick={handleEditProfile}>Edit Profile</button>
            )}
          </div>
          
          <div className="ios-card">
            <h3 className="text-lg font-medium mb-3">Contact Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <User size={20} color="var(--ios-blue)" />
                </div>
                <div>
                  <p className="text-sm text-[var(--ios-gray)]">Name</p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={updatedProfile?.name || ''}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  ) : (
                    <p>{profile.name}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Mail size={20} color="var(--ios-blue)" />
                </div>
                <div>
                  <p className="text-sm text-[var(--ios-gray)]">Email</p>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={updatedProfile?.email || ''}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  ) : (
                    <p>{profile.email}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Phone size={20} color="var(--ios-blue)" />
                </div>
                <div>
                  <p className="text-sm text-[var(--ios-gray)]">Phone</p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      value={updatedProfile?.phone || ''}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  ) : (
                    <p>{profile.phone}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <MapPin size={20} color="var(--ios-blue)" />
                </div>
                <div>
                  <p className="text-sm text-[var(--ios-gray)]">Location</p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={updatedProfile?.location || ''}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  ) : (
                    <p>{profile.location}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
