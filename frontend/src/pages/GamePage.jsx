import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchGameDetails,
  fetchGameScreenshots,
  fetchDevelopers,
  fetchCreators,
  fetchStores,
  fetchGameVideos,
} from "../services/rawgService";
import { Col, Row } from "react-bootstrap";

const GamePage = () => {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [creators, setCreators] = useState([]);
  const [stores, setStores] = useState([]);
  const [videos, setVideos] = useState([]); 

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Fetch game details
        const data = await fetchGameDetails(id);
        setGameDetails(data);

        // Fetch game screenshots
        const screenshotData = await fetchGameScreenshots(id);
        setScreenshots(screenshotData.results || []);

        // Fetch developers
        const developersData = await fetchDevelopers();
        setDevelopers(developersData.results || []);

        // Fetch creators
        const creatorsData = await fetchCreators();
        setCreators(creatorsData.results || []);

        // Fetch stores
        const storesData = await fetchStores();
        setStores(storesData.results || []);

        // Fetch game videos
        const videoData = await fetchGameVideos(id);
        setVideos(videoData.results || []);
      } catch (error) {
        console.error("Erreur lors du chargement des données du jeu", error);
      }
    };

    fetchDetails();
  }, [id]);

  if (!gameDetails)
    return <div className="game-page-container">Chargement...</div>;

  return (
    <div className="game-page-container">
      <div
        className="game-header"
        style={{
          backgroundImage: `url(${gameDetails.background_image})`,
        }}
      >
        <div className="game-title">
          <h1>{gameDetails.name}</h1>
          <p>{gameDetails.released || "Non spécifié"}</p>
        </div>
      </div>

      <div className="game-content">
        <div className="game-info">
          {/* Description */}
          <section className="my-4">
            <h2>Description</h2>
            <p>{gameDetails.description_raw || "Non spécifié"}</p>
          </section>

          {/* Genres */}
          <section className="my-4">
            <h2>Genres</h2>
            {gameDetails.genres && gameDetails.genres.length > 0 ? (
              <div className="genres">
                {gameDetails.genres.map((genre) => (
                  <span key={genre.id} className="genre">
                    {genre.name}
                  </span>
                ))}
              </div>
            ) : (
              <p>Non spécifié</p>
            )}
          </section>

          {/* Tags */}
          <section className="my-4">
            <h2>Tags</h2>
            {gameDetails.tags && gameDetails.tags.length > 0 ? (
              <div className="tags">
                {gameDetails.tags.map((tag) => (
                  <span key={tag.id} className="tag">
                    {tag.name}
                  </span>
                ))}
              </div>
            ) : (
              <p>Non spécifié</p>
            )}
          </section>

          {/* Développeurs, Créateurs et Magasins - Affichage sur une ligne */}
          <section className="d-flex justify-content-around my-4">
            {/* Développeurs */}
            <div className="developers">
              <h2>Développeurs</h2>
              {developers.length > 0 ? (
                <ul>
                  {developers.map((dev) => (
                    <li key={dev.id}>{dev.name}</li>
                  ))}
                </ul>
              ) : (
                <p>Non spécifié</p>
              )}
            </div>

            {/* Créateurs */}
            <div className="creators">
              <h2>Créateurs</h2>
              {creators.length > 0 ? (
                <ul>
                  {creators.map((creator) => (
                    <li key={creator.id}>{creator.name}</li>
                  ))}
                </ul>
              ) : (
                <p>Non spécifié</p>
              )}
            </div>

            {/* Magasins */}
            <div className="stores">
              <h2>Magasins</h2>
              {stores.length > 0 ? (
                <ul>
                  {stores.map((store) => (
                    <li key={store.id}>
                      <a
                        href={store.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {store.name}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Non spécifié</p>
              )}
            </div>
          </section>

          {/* Exigences système */}
          <section className="my-4">
            <h2>Exigences système</h2>
            {gameDetails.platforms &&
            gameDetails.platforms[0]?.requirements_en ? (
              <div className="requirements">
                <div>
                  <h4>Minimum</h4>
                  <pre>
                    {gameDetails.platforms[0]?.requirements_en?.minimum ||
                      "Non spécifié"}
                  </pre>
                </div>
                <div>
                  <h4>Recommandé</h4>
                  <pre>
                    {gameDetails.platforms[0]?.requirements_en?.recommended ||
                      "Non spécifié"}
                  </pre>
                </div>
              </div>
            ) : (
              <p>Non spécifié</p>
            )}
          </section>

          {/* Captures d'écran */}
          <section>
            <h2>Captures d'écran</h2>
            {screenshots.length > 0 ? (
              <div className="game-screenshots">
                <div className="screenshots-container">
                  {screenshots.map((screenshot, index) => (
                    <img
                      key={index}
                      src={screenshot.image}
                      alt={`Screenshot ${index + 1}`}
                      className="screenshot"
                    />
                  ))}
                </div>
              </div>
            ) : (
              <p>Non spécifié</p>
            )}
          </section>

          {/* Vidéos */}
          <section>
          <h2>Vidéos</h2>
  {videos.length > 0 ? (
    <div className="game-videos">
   
      <Row className="videos-container">
        {videos.map((video, index) => {
        
          const videoUrl = video.data.max || video.data['480']; 

          return (
            <Col key={index} xs={12} sm={6} md={4} lg={3} xl={3} className="mb-4">
              {videoUrl ? (
                <div className="video">
                  <h3>{video.name}</h3>
                  <video width="100%" height="auto" controls>
                    <source src={videoUrl} type="video/mp4" />
                    Votre navigateur ne supporte pas la lecture de cette vidéo.
                  </video>
                </div>
              ) : (
                <p>La vidéo n'est pas disponible.</p>
              )}
            </Col>
          );
        })}
      </Row>
    </div>
  ) : (
    <p>Aucune vidéo disponible.</p>
  )}
</section>


        </div>
      </div>
    </div>
  );
};

export default GamePage;
