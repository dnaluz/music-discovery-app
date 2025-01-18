import Image from "next/image";

export type AlbumProps = {
  id: number;
  title: string;
  viewArtist: (id: number) => void;
  favorite: (album: AlbumProps) => void;
  coverImage: string;
  isArtistView: boolean;
  isFavorite: boolean;
};

const Album = (album: AlbumProps) => {

  const [artist, albumTitle] = album?.title?.split('-');
  const { id, viewArtist, favorite, isArtistView, isFavorite } = album;

  return (
    <div className="w-full album">
      <div className="aspect-square">
        <div className="relative w-full h-full">
          {album.coverImage ? <a onClick={() => favorite(album) }><Image src={album.coverImage} alt={album.title} fill className="grayscale hover:grayscale-0 transition-all duration-300 hover:cursor-pointer" priority sizes="(max-width: 768px) 100vw, 100hw" /></a> : <div>No Image</div>}
        </div>
      </div>
      <div className="mt-1">
        <div className="w-full flex flex-row items-center">
          <div className="font-semibold text-xl">Album: <span className="album__title">{isArtistView ? artist : albumTitle}</span></div>
          {isFavorite && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 107.39" width="16px" height="16px" className="mr-0 ml-auto">
            <title>Favorite</title>
            <path fill="red" stroke="red" d="M60.83,17.18c8-8.35,13.62-15.57,26-17C110-2.46,131.27,21.26,119.57,44.61c-3.33,6.65-10.11,14.56-17.61,22.32-8.23,8.52-17.34,16.87-23.72,23.2l-17.4,17.26L46.46,93.55C29.16,76.89,1,55.92,0,29.94-.63,11.74,13.73.08,30.25.29c14.76.2,21,7.54,30.58,16.89Z"/>
          </svg>}
        </div>
        {!isArtistView && <div className="text-xl">Artist: <button onClick={() => { viewArtist(id); }} className="text-blue-900 font-semibold hover:text-blue-400 transition-colors duration-300">{artist.length > 50 ? `${artist.substring(0, 30)}...` : artist }</button></div>}
      </div>
    </div>
  );
}

export default Album