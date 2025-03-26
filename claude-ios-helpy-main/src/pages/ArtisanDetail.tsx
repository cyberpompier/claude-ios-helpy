import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Phone, Mail, MapPin, Briefcase, Star } from 'lucide-react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface Artisan {
  id: number;
  nom: string;
  prenom: string;
  photo: string;
  corps_de_metier: string;
  telephone?: string;
  email?: string;
  adresse?: string;
  description?: string;
  note?: number;
  latitude?: number;
  longitude?: number;
}

// Google Maps API key
const GOOGLE_MAPS_API_KEY = 'AIzaSyDVq7VuNZYM5XXhlH9Kl0n5h2YN1oK74u8';

// Map container style
const mapContainerStyle = {
  width: '100%',
  height: '200px',
  borderRadius: '8px'
};

const ArtisanDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [artisan, setArtisan] = useState<Artisan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>({ lat: 48.8566, lng: 2.3522 }); // Default to Paris

  // Geocode address to get coordinates
  const geocodeAddress = useCallback(async (address: string) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      
      if (data.status === 'OK' && data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
      }
      return null;
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  }, []);

  useEffect(() => {
    const fetchArtisanDetail = async () => {
      try {
        setLoading(true);
        
        // Try to fetch from Supabase first
        const { data, error } = await supabase
          .from('metier')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }
        
        let artisanData: Artisan | null = null;
        
        if (data) {
          artisanData = data as Artisan;
        } else {
          // Fallback data if no record found
          const fallbackArtisans = [
            { 
              id: 1, 
              nom: 'Dupont', 
              prenom: 'Jean',
              photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
              corps_de_metier: 'Menuisier',
              telephone: '06 12 34 56 78',
              email: 'jean.dupont@example.com',
              adresse: '15 rue des Artisans, 75001 Paris',
              description: 'Menuisier expérimenté avec plus de 15 ans d\'expérience dans la fabrication de meubles sur mesure et la rénovation.',
              note: 4.8,
              latitude: 48.8584, 
              longitude: 2.3536
            },
            { 
              id: 2, 
              nom: 'Martin', 
              prenom: 'Sophie',
              photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
              corps_de_metier: 'Ébéniste',
              telephone: '06 23 45 67 89',
              email: 'sophie.martin@example.com',
              adresse: '27 avenue du Bois, 75016 Paris',
              description: 'Ébéniste passionnée spécialisée dans la restauration de meubles anciens et la création de pièces uniques.',
              note: 4.9,
              latitude: 48.8637, 
              longitude: 2.2771
            },
            { 
              id: 3, 
              nom: 'Petit', 
              prenom: 'Michel',
              photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
              corps_de_metier: 'Plombier',
              telephone: '06 34 56 78 90',
              email: 'michel.petit@example.com',
              adresse: '8 rue des Tuyaux, 75011 Paris',
              description: 'Plombier qualifié proposant des services d\'installation, de réparation et de dépannage pour tous vos problèmes de plomberie.',
              note: 4.5,
              latitude: 48.8592, 
              longitude: 2.3781
            },
            { 
              id: 4, 
              nom: 'Dubois', 
              prenom: 'Marie',
              photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
              corps_de_metier: 'Électricienne',
              telephone: '06 45 67 89 01',
              email: 'marie.dubois@example.com',
              adresse: '42 boulevard Voltaire, 75012 Paris',
              description: 'Électricienne certifiée spécialisée dans les installations électriques résidentielles et les systèmes domotiques.',
              note: 4.7,
              latitude: 48.8502, 
              longitude: 2.3798
            },
            { 
              id: 5, 
              nom: 'Leroy', 
              prenom: 'Thomas',
              photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
              corps_de_metier: 'Maçon',
              telephone: '06 56 78 90 12',
              email: 'thomas.leroy@example.com',
              adresse: '3 rue des Bâtisseurs, 75020 Paris',
              description: 'Maçon expérimenté spécialisé dans la construction et la rénovation de maisons individuelles et de petits immeubles.',
              note: 4.6,
              latitude: 48.8651, 
              longitude: 2.4017
            }
          ];
          
          artisanData = fallbackArtisans.find(a => a.id === parseInt(id || '0')) || null;
          
          if (!artisanData) {
            setError('Artisan non trouvé');
          }
        }
        
        if (artisanData) {
          setArtisan(artisanData);
          
          // Set map center if coordinates are available
          if (artisanData.latitude && artisanData.longitude) {
            setMapCenter({ lat: artisanData.latitude, lng: artisanData.longitude });
          } 
          // Otherwise try to geocode the address
          else if (artisanData.adresse) {
            const coordinates = await geocodeAddress(artisanData.adresse);
            if (coordinates) {
              setMapCenter(coordinates);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching artisan details:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        
        // Use fallback data on error
        const fallbackArtisan = {
          id: parseInt(id || '0'),
          nom: 'Nom',
          prenom: 'Prénom',
          photo: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
          corps_de_metier: 'Métier',
          telephone: 'Non disponible',
          email: 'Non disponible',
          adresse: 'Non disponible',
          description: 'Information non disponible',
          note: 0
        };
        setArtisan(fallbackArtisan);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArtisanDetail();
    }
  }, [id, geocodeAddress]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index} 
        size={16} 
        className={index < Math.round(rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} 
      />
    ));
  };

  return (
    <div className="pb-4">
      
      {error && (
        <div className="ios-card mb-4 bg-red-50 text-red-600 p-3">
          <p>Erreur: {error}</p>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-pulse text-[var(--ios-blue)]">Chargement des détails...</div>
        </div>
      ) : artisan ? (
        <div className="space-y-4">
          <div className="ios-card">
            <div className="flex items-center mb-4">
              <div className="w-20 h-20 rounded-full overflow-hidden mr-4">
                <img 
                  src={artisan.photo} 
                  alt={`${artisan.prenom} ${artisan.nom}`} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80';
                  }}
                />
              </div>
              <div>
                <h3 className="text-xl font-medium">{artisan.prenom} {artisan.nom}</h3>
                <div className="flex items-center">
                  <Briefcase size={16} className="text-[var(--ios-gray)] mr-1" />
                  <p className="text-[var(--ios-gray)]">{artisan.corps_de_metier}</p>
                </div>
                {artisan.note && (
                  <div className="flex items-center mt-1">
                    {renderStars(artisan.note)}
                    <span className="ml-2 text-sm text-[var(--ios-gray)]">{artisan.note.toFixed(1)}</span>
                  </div>
                )}
              </div>
            </div>
            
            {artisan.description && (
              <div className="mb-4">
                <h4 className="font-medium mb-1">À propos</h4>
                <p className="text-[var(--ios-gray)]">{artisan.description}</p>
              </div>
            )}
            
            <div className="space-y-3">
              {artisan.telephone && (
                <div className="flex items-center">
                  <Phone size={18} className="text-[var(--ios-blue)] mr-3" />
                  <div>
                    <p className="text-sm text-[var(--ios-gray)]">Téléphone</p>
                    <p>{artisan.telephone}</p>
                  </div>
                </div>
              )}
              
              {artisan.email && (
                <div className="flex items-center">
                  <Mail size={18} className="text-[var(--ios-blue)] mr-3" />
                  <div>
                    <p className="text-sm text-[var(--ios-gray)]">Email</p>
                    <p>{artisan.email}</p>
                  </div>
                </div>
              )}
              
              {artisan.adresse && (
                <div className="flex items-center">
                  <MapPin size={18} className="text-[var(--ios-blue)] mr-3" />
                  <div>
                    <p className="text-sm text-[var(--ios-gray)]">Adresse</p>
                    <p>{artisan.adresse}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Google Maps */}
          <div className="ios-card p-0 overflow-hidden">
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={mapCenter}
                zoom={15}
              >
                <Marker position={mapCenter} />
              </GoogleMap>
            </LoadScript>
          </div>
          
          <div className="ios-card">
            <button className="w-full py-2 bg-[var(--ios-blue)] text-white rounded-md">
              Contacter
            </button>
          </div>
        </div>
      ) : (
        <div className="ios-card text-center py-8">
          <Briefcase size={48} className="mx-auto text-[var(--ios-gray)] mb-2" />
          <p className="text-[var(--ios-gray)]">Artisan non trouvé</p>
        </div>
      )}
    </div>
  );
};

export default ArtisanDetail;
