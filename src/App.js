import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Nav from "./components/Navigation/Nav";
import AnimeDetails from "./pages/AnimeDetails";
import FavouriteAnime from "./pages/FavouriteAnime";
import Home from "./pages/Home";
import MalAnimeDetails from "./pages/MalAnimeDetails";
import PopularAnime from "./pages/PopularAnime";
import PopularMovies from "./pages/PopularMovies";
import SearchResults from "./pages/SearchResults";
import Top100Anime from "./pages/Top100Anime";
import TrendingAnime from "./pages/TrendingAnime";
import WatchPage from "./pages/WatchPage";
import WatchAnimeV2 from "./pages/WatchAnimeV2";
import GlobalStyle from "./styles/globalStyles";

/*Comments
Mal Data is used in '/movies' and '/' only.

        <Route path="/category/:slug" element={<AnimeDetails />} />
        <Route path="/play/:slug/:episode" element={<WatchAnimeV2 />} />
        <Route path="/watch/:episode" element={<WatchAnime />} />
*/

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/popular/:page" element={<PopularAnime />} />
        <Route path="/trending/:page" element={<TrendingAnime />} />
        <Route path="/favourites/:page" element={<FavouriteAnime />} />
        <Route path="/top100/:page" element={<Top100Anime />} />
        <Route path="/movies/:page" element={<PopularMovies />} />
        <Route path="/search/:name" element={<SearchResults />} />
        <Route path="/id/:id" element={<MalAnimeDetails />} />
        <Route path="/watch/:id/:episode" element={<WatchPage />} />
      </Routes>
      <Toaster
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "#242235",
            border: "1px solid #393653",
            color: "#fff",
          },
        }}
      />
    </Router>
  );
}

export default App;
