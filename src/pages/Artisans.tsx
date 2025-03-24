import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Search, Briefcase } from 'lucide-react';

interface Artisan {
  id: number;
  nom: string;
  prenom: string;
  photo: string;
  corps_de_metier: string;
}

const Artisans = () => {
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        setLoading(true);
        console.log('Fetching data from Supabase...');
        
        const { data, error } = await supabase
          .from('metier')
          .select('*')
          .order('nom');
        
        if (error) {
          console.error('Supabase error:', error);
          setError(error.message);
          throw error;
        }
        
        console.log('Supabase data received:', data);
        
        if (data && data.length > 0) {
          setArtisans(data as Artisan[]);
        } else {
          console.log('No data found in Supabase, using fallback data');
          // Fallback data if no records found
          setArtisans([
            { 
              id: 1, 
              nom: 'Dupont', 
              prenom: 'Jean',
              photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
              corps_de_metier: 'Menuisier'
            },
            { 
              id: 2, 
              nom: 'Martin', 
              prenom: 'Sophie',
              photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
              corps_de_metier: 'Ébéniste'
            },
            { 
              id: 3, 
              nom: 'Petit', 
              prenom: 'Michel',
              photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
              corps_de_metier: 'Plombier'
            },
            { 
              id: 4, 
              nom: 'Dubois', 
              prenom: 'Marie',
              photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
              corps_de_metier: 'Électricienne'
            },
            { 
              id: 5, 
              nom: 'Leroy', 
              prenom: 'Thomas',
              photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
              corps_de_metier: 'Maçon'
            }
          ]);
        }
      } catch (err) {
        console.error('Error fetching artisans:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        
        // Use fallback data on error
        setArtisans([
          { 
            id: 1, 
            nom: 'Dupont', 
            prenom: 'Jean',
            photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
            corps_de_metier: 'Menuisier'
          },
          { 
            id: 2, 
            nom: 'Martin', 
            prenom: 'Sophie',
            photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
            corps_de_metier: 'Ébéniste'
          },
          { 
            id: 3, 
            nom: 'Petit', 
            prenom: 'Michel',
            photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
            corps_de_metier: 'Plombier'
          },
          { 
            id: 4, 
            nom: 'Dubois', 
            prenom: 'Marie',
            photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
            corps_de_metier: 'Électricienne'
          },
          { 
            id: 5, 
            nom: 'Leroy', 
            prenom: 'Thomas',
            photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
            corps_de_metier: 'Maçon'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchArtisans();
  }, []);

  const filteredArtisans = artisans.filter(
    (artisan) =>
      artisan.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artisan.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artisan.corps_de_metier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pb-4">
      <h2 className="text-2xl font-semibold mb-4">Artisans</h2>
      
      <div className="ios-card mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-[var(--ios-gray)]" />
          </div>
          <input
            type="text"
            className="ios-input pl-10"
            placeholder="Rechercher un artisan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {error && (
        <div className="ios-card mb-4 bg-red-50 text-red-600 p-3">
          <p>Erreur: {error}</p>
          <p className="text-sm mt-1">Affichage des données d'exemple</p>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-pulse text-[var(--ios-blue)]">Chargement des artisans...</div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredArtisans.length === 0 ? (
            <div className="ios-card text-center py-8">
              <Briefcase size={48} className="mx-auto text-[var(--ios-gray)] mb-2" />
              <p className="text-[var(--ios-gray)]">Aucun artisan trouvé</p>
            </div>
          ) : (
            filteredArtisans.map((artisan) => (
              <div key={artisan.id} className="ios-card flex items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
                  <img 
                    src={artisan.photo} 
                    alt={`${artisan.prenom} ${artisan.nom}`} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback image if the photo URL is invalid
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80';
                    }}
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-medium">{artisan.prenom} {artisan.nom}</h3>
                  <p className="text-[var(--ios-gray)]">{artisan.corps_de_metier}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[var(--ios-light-gray)] flex items-center justify-center">
                  <Briefcase size={16} className="text-[var(--ios-blue)]" />
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Artisans;
