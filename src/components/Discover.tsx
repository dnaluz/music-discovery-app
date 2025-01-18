import { useState, useEffect, FormEvent } from 'react';

import Album, { AlbumProps } from '@/components/Album';
import FavoriteButton from '@/components/FavoriteButton';
import FilterForm from '@/components/forms/FilterForm';
import Modal from '@/components/Modal';

import { fetchAlbums, fetchArtist } from '@/lib/api';
import { IAlbum } from '@/types/Album';
import SearchForm from '@/components/forms/SearchForm';

const Discover = () => {
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [artistAlbums, setArtistAlbums] = useState<IAlbum[]>([]);

  const [favorites, setFavorites] = useState<AlbumProps[]>([]);
  const [currentArtist, setCurrentArtist] = useState<{name: string, id: string} | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [favoriteModalOpen, setFavoriteModalOpen] = useState<boolean>(false);
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);

  const [query, setQuery] = useState<string>('');

  const [filters, setFilters] = useState({
    year: '2024',
    genre: '',
    country: 'Canada',
    query
  });


  const resetLists = () => {
    setAlbums([]);
    setCurrentPage(1);
    setCurrentArtist(null);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAlbums(filters, currentPage);
        setAlbums(prev => [...prev, ...data.albums]);

      } catch(error) {
        resetLists();
        console.error(error);
      }
    }

    fetchData();
   
  }, [filters, currentPage]);

  useEffect(() => { 
    document.body.classList.toggle('fixed'); 
  }, [modalOpen]);

  useEffect(() => { 
      document.body.classList.toggle('fixed'); 
  }, [favoriteModalOpen]);

  const viewArtist = async (id: number) => {
    try {
   
      const data = await fetchArtist(id);
      
      if(data.releases) {
        setArtistAlbums(prev => [...prev, ...data.releases]);
        setCurrentArtist({name: data.artist, id: data.id});
        setModalOpen(true);
      } else {
        setErrorModalOpen(true);
      }

    } catch(error) {
      
      setCurrentArtist(null);
      setErrorModalOpen(true);
      console.error('Error fetching artist information:', error);
    }
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    resetLists();
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleBookmark = (album: AlbumProps) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.id === album.id);

      if (isFavorite) {
        return prevFavorites.filter((fav) => fav.id !== album.id);
      } else {
        return [...prevFavorites, album];
      }
    });
  };

  const checkIsFavorite = (albumId: number) => {
    return favorites.some(favorite => favorite.id === albumId);
  }

  const search = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetLists();
    
    setFilters((prevFilters) => {
      return {...prevFilters, query}
    });
  }

  return (
    <>
      {modalOpen && <><Modal title={currentArtist ? `Albums by ${currentArtist.name}` : 'Could not retrieve artist information'} onClose={() => { setArtistAlbums([]); setModalOpen(false); }} ariaHidden={!modalOpen}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 justify-between">
          {artistAlbums?.map((album: IAlbum, index: number) => {
            return <Album id={album?.albumId} key={`modal-${album.id}-${index}`} title={album.title} coverImage={album.thumb ?? ''} viewArtist={viewArtist} isArtistView favorite={handleBookmark} isFavorite={checkIsFavorite(album.id)}/>
          })}
        </div>
      </Modal>
  
      </>}
      {favoriteModalOpen && <Modal title="Favorite Albums" onClose={() => setFavoriteModalOpen(false) } ariaHidden={!favoriteModalOpen}>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 justify-between">
          {favorites.map((album, index: number) => (
            <div key={album.id}>
              <Album id={album?.id} key={`modal-${album.id}-${index}`} title={album.title} coverImage={album.coverImage ?? ''} viewArtist={viewArtist} isArtistView favorite={handleBookmark} isFavorite={false} />
            </div>
          ))}
          {favorites.length === 0 && <div className="text-xl font-semibold w-full text-center col-span-4">No Favorites Selected</div>}
          </div>
        </Modal>}

      {errorModalOpen && <Modal title="An error has occurred" onClose={() => setErrorModalOpen(false) } ariaHidden={!favoriteModalOpen}>
          <div className="w-full text-center text-2xl text-red-500 font-semibold">
            Could not load artist information
          </div>
        </Modal>}

      <section className="w-full p-2">
        <div className="flex flex-row items-center">
          <SearchForm onSubmit={search} onChangeInput={(e) => setQuery(e.currentTarget.value)}/>
        </div>
        <div className="pt-5 pb-2">
          <div className="flex flex-col items-center justify-center lg:flex-row lg:flex-wrap">
            <FilterForm handleChange={handleFilterChange} filters={filters} />  
            <FavoriteButton openModal={() => setFavoriteModalOpen(true) } favorites={favorites.length} />
          </div>
        </div>
        <div className="w-full">
          <h2 className="text-2xl font-semibold">Albums</h2>
          {albums.length > 0 && <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 justify-between">
            {albums.map((album: IAlbum, index: number) => {
              return <Album id={album?.albumId} key={`album-list-${album.albumId}-${index}`} title={album.title} coverImage={album.coverImage} viewArtist={viewArtist} isArtistView={false} favorite={handleBookmark} isFavorite={checkIsFavorite(album.albumId)} />
            })}
          </div>}
          {albums.length === 0 && <div className="w-full text-center text-xl font-semibold">No Albums Found</div>}
          <div className="flex flex-row justify-center w-full mt-8">
            <button id="load-more" className="py-2 px-8 text-white text-base font-semibold rounded bg-slate-600 transition-colors duration-300 hover:bg-slate-400" onClick={() => { setCurrentPage(currentPage + 1); }}>Load More</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Discover;