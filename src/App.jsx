import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
// eslint-disable-next-line no-unused-vars
import React from "react";
import Home from "./pages/Home";
import Callback from "./pages/Callback";
import Player from "./pages/Player.jsx"; // Import the new Player page

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/player" element={<Player />} /> {/* New route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
