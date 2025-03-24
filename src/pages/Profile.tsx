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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // This is just an example query - adjust according to your actual Supabase schema
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .single();
        
        if (error && error.code !== 'PGRST116') {
          throw error;
        }
        
        if (data) {
          setProfile(data as UserProfile);
        } else {
          // If no profile exists, use sample data
          setProfile({
            id: '1',
            name: 'John Appleseed',
            email: 'john.appleseed@example.com',
            phone: '+1 (555) 123-4567',
            location: 'Cupertino, CA',
            avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          });
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
            <h3 className="text-xl font-medium">{profile.name}</h3>
            <p className="text-[var(--ios-gray)] mt-1">{profile.location}</p>
            <button className="ios-button mt-4">Edit Profile</button>
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
                  <p>{profile.name}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Mail size={20} color="var(--ios-blue)" />
                </div>
                <div>
                  <p className="text-sm text-[var(--ios-gray)]">Email</p>
                  <p>{profile.email}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Phone size={20} color="var(--ios-blue)" />
                </div>
                <div>
                  <p className="text-sm text-[var(--ios-gray)]">Phone</p>
                  <p>{profile.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <MapPin size={20} color="var(--ios-blue)" />
                </div>
                <div>
                  <p className="text-sm text-[var(--ios-gray)]">Location</p>
                  <p>{profile.location}</p>
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
