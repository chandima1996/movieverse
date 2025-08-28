import React from "react";
import Header from "./component/Header";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MovieDetailPage from "./pages/MovieDetailPage";
import BackgroundAnimation from "./component/BackgroundAnimation";
import Footer from "./component/Footer";
import GenrePage from "./pages/GenrePage";
import TopRatedPage from "./pages/TopRatedPage";

function App() {
  return (
    <div className=" relative text-white min-h-screen flex flex-col">
      <div className="absolute inset-0 z-[-1]">
        <BackgroundAnimation />
      </div>
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/genre/:genreName" element={<GenrePage />} />
          <Route path="/top-rated" element={<TopRatedPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
