const fetchAlbums = async (filters: {country: string, genre: string, year: string, query: string}, page: number = 1) => {
  try {
    const params = new URLSearchParams({'country': filters.country, 'genre': filters.genre, 'year': `${filters.year}`, 'query': `${filters.query}`});
    const response = await fetch(`/api/albums?${params}&page=${page}`);
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching albums:', error);
  }
};

const fetchArtist = async (id: number) => {
  try {
    const response = await fetch(`/api/artists/${id}`);
    const data = await response.json();
    return data;
    
  } catch(error) {
    console.error('Error fetching artist information:', error);
  }

}

export { fetchAlbums, fetchArtist };