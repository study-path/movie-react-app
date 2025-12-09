import { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import { FaFacebook, FaInstagram } from "react-icons/fa";

import "./App.css";
import Search from "./components/Search.jsx";
import Category from "./components/Category.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import { updateSearchCount } from "./appwrite.js";

const spanFooter = {
  display: "flex",
  columnGap: "20px",
};
const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [genre, setGenre] = useState("");

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      if (data.response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }
      console.log("Data results:", data.results);
      setMovieList(data.results || []);

      // if (query && data.result.length > 0) {
      //   updateSearchCount(query, data.results[0]);
      // }
    } catch (error) {
      console.log(`Error fetching movies :${error}`);
      setErrorMessage("Error fetching movies.Please try again later");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <main>
      <div className="pattern"></div>

      <div className="wrapper">
        <header>
          <Category genre={genre} setGenre={setGenre} />
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hussle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-movies">
          <h2>All Movies </h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}

          {/* {errorMessage && <p className="text-red-500">{errorMessage}</p>} */}
        </section>
      </div>
      <div className="footer">
        <div className="containerFooter">
          <div style={spanFooter}>
            <a href="https://facebook.com" rel="noopener" target="_blank">
              <FaFacebook size={48} />
            </a>
            <a href="https://instagram.com" rel="noopener" target="_blank">
              <FaInstagram size={48} />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};
export default App;
