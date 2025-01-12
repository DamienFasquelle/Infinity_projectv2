import axios from 'axios';

const BASE_URL = 'https://api.rawg.io/api';
const API_KEY = "a0e550277d1841dab5d608822e10c522";


/**
 * Fetch des jeux sur plusieurs pages.
 * @param {number} totalPages - Nombre de pages à charger.
 * @returns {Promise<Array>} Les données des jeux provenant de plusieurs pages.
 */
export const fetchGames = async (totalPages = 10) => {
    let allGames = [];
  
    
    for (let page = 1; page <= totalPages; page++) {
      const url = `${BASE_URL}/games?key=${API_KEY}&page=${page}`;
      try {
        const response = await axios.get(url);
  
       
        if (response.data && response.data.results) {
          allGames = [...allGames, ...response.data.results];
        } else {
          console.warn(`Aucun jeu trouvé à la page ${page}`);
        }
      } catch (error) {
        console.error(`Erreur lors de la récupération des jeux à la page ${page}:`, error);
      }
    } 
    return allGames;
  };
  
/**
 * Fetch des jeux populaires.
 * @param {string} dates - Plage de dates au format YYYY-MM-DD,YYYY-MM-DD.
 * @param {string} platforms - Identifiants des plateformes séparés par des virgules.
 * @returns {Promise<Object>} Les données des jeux populaires.
 */
export const fetchPopularGames = async (dates = '2000-01-01,2023-01-01', platforms = '18,1,7') => {
    const url = `${BASE_URL}/games?key=${API_KEY}&dates=${dates}&platforms=${platforms}`;
    const response = await axios.get(url);
    return response.data;
  };
  
  /**
   * Fetch des plateformes disponibles.
   * @returns {Promise<Object>} Les données des plateformes.
   */
  export const fetchPlatforms = async () => {
    const url = `${BASE_URL}/platforms?key=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
  };
  
  /**
   * Fetch des détails d'un jeu spécifique.
   * @param {number|string} gameId - Identifiant du jeu.
   * @returns {Promise<Object>} Les détails du jeu.
   */
  export const fetchGameDetails = async (gameId) => {
    const url = `${BASE_URL}/games/${gameId}?key=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
  };
  
  /**
   * Fetch des screenshots d'un jeu spécifique.
   * @param {number|string} gameId - Identifiant du jeu.
   * @returns {Promise<Object>} Les screenshots du jeu.
   */
  export const fetchGameScreenshots = async (gameId) => {
    const url = `${BASE_URL}/games/${gameId}/screenshots?key=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
  };
  
  /**
   * Fetch des genres disponibles.
   * @returns {Promise<Object>} Les genres de jeux.
   */
  export const fetchGenres = async () => {
    const url = `${BASE_URL}/genres?key=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
  };

   /**
   * Fetch des tags disponibles.
   * @returns {Promise<Object>} Les genres de jeux.
   */
   export const fetchTags = async () => {
    const url = `${BASE_URL}/tags?key=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
  };

   /**
   * Fetch des développeurs disponibles.
   * @returns {Promise<Object>} Les genres de jeux.
   */
   export const fetchDevelopers = async () => {
    const url = `${BASE_URL}/developers?key=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
  };
  
  /**
   * Fetch des créateurs de contenu (exemple : développeurs, éditeurs).
   * @returns {Promise<Object>} Les créateurs de contenu.
   */
  export const fetchCreators = async () => {
    const url = `${BASE_URL}/creators?key=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
  };
  
  /**
   * Recherche de jeux par nom.
   * @param {string} query - Terme de recherche.
   * @returns {Promise<Object>} Les résultats de recherche.
   */
  export const searchGames = async (query) => {
    const url = `${BASE_URL}/games?key=${API_KEY}&search=${query}`;
    const response = await axios.get(url);
    return response.data;
  };
  
  /**
   * Fetch des stores (magasins où les jeux sont vendus).
   * @returns {Promise<Object>} Les données des stores.
   */
  export const fetchStores = async () => {
    const url = `${BASE_URL}/stores?key=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
  };
