import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // This is just an example query - adjust according to your actual Supabase schema
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        if (data) {
          setPosts(data as Post[]);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        // If there's an error or no data, show some sample data
        setPosts([
          { 
            id: 1, 
            title: 'Welcome to iOS PWA', 
            content: 'This is a sample post. Connect your Supabase database to see real data.',
            created_at: new Date().toISOString()
          },
          { 
            id: 2, 
            title: 'Getting Started', 
            content: 'Explore the app using the menu in the header or the navigation tabs in the footer.',
            created_at: new Date().toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="pb-4">
      <h2 className="text-2xl font-semibold mb-4">Home</h2>
      
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-pulse text-[var(--ios-blue)]">Loading...</div>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="ios-card">
              <h3 className="text-lg font-medium mb-2">{post.title}</h3>
              <p className="text-[var(--ios-gray)]">{post.content}</p>
              <div className="text-xs text-[var(--ios-gray)] mt-2">
                {new Date(post.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="ios-card bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <h3 className="text-lg font-medium mb-2">Welcome to iOS PWA</h3>
        <p>This is a responsive Progressive Web App with iOS-inspired design.</p>
      </div>
      
      <div className="ios-card">
        <img 
          src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
          alt="iOS devices" 
          className="w-full h-48 object-cover rounded-lg mb-3"
        />
        <h3 className="text-lg font-medium">iOS Design System</h3>
        <p className="text-[var(--ios-gray)]">Clean, minimal, and functional design inspired by iOS.</p>
      </div>
    </div>
  );
};

export default Home;
