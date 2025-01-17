import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Get a list of albums based on the filters from Discogs API.
 * 
 * @param filters
 * @param page 
 * 
 */
const getAlbums = async (filters: { country: string; year: number; genre?: string, query?: string }, page: number = 1) => {
  const { country, year, genre, query } = filters;

  const q = new URLSearchParams({
    'key': process.env.DISCOGS_CONSUMER_KEY ?? '',
    'secret': process.env.DISCOGS_CONSUMER_SECRET ?? '',
    'country': country,
    'year': `${year}`,
    'genre': genre ?? '',
    'type': 'release',
    'per_page': '8', 
    'query': `${query}`
  });

  try {
    const response = await fetch(`${process.env.API_URL}/database/search?${q}&page=${page}`);
    const data = await response.json();
  
    const albums = await Promise.all(
      data.results.map(async (release: { resource_url: string; id: number; title: string;  year: number; cover_image: string; }) => {
        return {
          albumId: release.id,
          title: release.title,
          year: release.year,
          coverImage: release.cover_image,
        };
      })
    );
  
    return albums;
  } catch(error) {
    throw error;
  }
};


/**
 * Request Handler.
 * 
 * @param req 
 * @param res 
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { country = 'Canada', year = 2024, genre, page = 1, query } = req.query;

    try {
      const albums = await getAlbums({ country: String(country), year: Number(year), genre: String(genre), query: String(query) }, Number(page));
      res.status(200).json({ albums });
    } catch (error) {
      console.error('Error fetching albums:', error);
      res.status(500).json({ error: 'Failed to fetch albums from Discogs' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}