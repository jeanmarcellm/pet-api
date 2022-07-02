import axios from 'axios';

class LocationService {
  async getPlaces({ query }) {
    try {
      const result = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${process.env.GOOGLE_API_KEY}&language=pt-BR`
      );

      return result.data;
    } catch (e) {
      return null;
    }
  }
}

export default new LocationService();
