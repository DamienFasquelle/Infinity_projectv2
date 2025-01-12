import axios from 'axios';

// URL de base de l'API RAWG
const BASE_URL = 'https://api.rawg.io/api';
const API_KEY = API_KEY;

// Exemple : récupérer les jeux populaires
export const fetchPopularGames = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/games`, {
      params: {
        key: API_KEY,
        ordering: '-rating',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des jeux populaires :', error);
    throw error;
  }
};

// Exemple : rechercher un jeu par son nom
export const searchGames = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/games`, {
      params: {
        key: API_KEY,
        search: query,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la recherche de jeux :', error);
    throw error;
  }
};
