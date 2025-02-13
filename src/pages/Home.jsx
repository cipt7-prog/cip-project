// eslint-disable-next-line no-unused-vars
import React from "react";
import { motion } from "framer-motion";
import bg from "../assets/bg.png";
import arrow from "../assets/right-arrow.svg";

const Home = () => {
  const redirectToSpotifyLogin = () => {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

    const scopes = [
      "user-read-private",
      "user-read-email",
      "user-top-read",
    ];

    const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${scopes.join("%20")}&show_dialog=true`;

    window.location.href = spotifyAuthUrl;
  };

  return (
    <div
      className="bg-[#9fdcfd] h-[100vh] w-[100vw] text-white flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <motion.div
        className="text-6xl text-center"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        Welcome to the Magical World of Music
      </motion.div>
      <motion.div
        className="mt-10 flex items-center gap-4 cursor-pointer"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <button
          onClick={redirectToSpotifyLogin}
          className="px-8 py-4 bg-green-500 text-lg font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform"
        >
          <span>Login to Spotify</span>
          <img src={arrow} alt="arrow" className="w-5 h-5 ml-2" />
        </button>
      </motion.div>
    </div>
  );
};

export default Home;
