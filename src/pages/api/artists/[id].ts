import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Get artist information from Discogs based on the release ID
 * 
 * @param id Release ID
 * 
 */
const getArtistInformation = async (id: number) => {

  const q = new URLSearchParams({
    'key': process.env.DISCOGS_CONSUMER_KEY ?? '',
    'secret': process.env.DISCOGS_CONSUMER_SECRET ?? '',
  });

  const response = await fetch(`${process.env.API_URL}/releases/${id}?${q}`);
  const data = await response.json();

  if(Array.isArray(data.artists)) {
    const artistId = data.artists[0].id;
    const artistName = data.artists[0].name;

    // Get the albums based on the Artist ID
    if(artistId) {
      try {
        const releaseResponse = await fetch(`${process.env.API_URL}/artists/${artistId}/releases?${q}&per_page=100`);
        const artistReleases = await releaseResponse.json();

        return { releases: artistReleases.releases, artist: artistName };
      } catch(error) {
        throw error;
      }
    }
  }

  return {releases: [], artist: ''};
}

/**
 * Request Handler
 * 
 * @param req 
 * @param res 
 * 
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query;
    try {
      if(id) {    
        const artistReleases = await getArtistInformation(Number(id));
        return res.status(200).json(artistReleases);
      } else {
        return res.status(400).json({error: 'Invalid ID'});
      }

    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Failed to fetch albums from Discogs' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}