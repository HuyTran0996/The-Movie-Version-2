import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import "./App.scss";
import ExplorePage from "./pages/ExplorePage/ExplorePage";
import DetailsPage from "./pages/DetailsPage/DetailsPage";
import SearchPage from "./pages/SearchPage/SearchPage";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/:explore" element={<ExplorePage />} />
        <Route path="/:explore/:id" element={<DetailsPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
