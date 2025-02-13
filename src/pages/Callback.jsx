// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const navigate = useNavigate();

  const fetchSpotifyToken = async (code) => {
    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(
            `${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${import.meta.env.VITE_SPOTIFY_CLIENT_SECRET}`
          )}`,
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch access token");
      }

      const data = await response.json();

      // Store tokens in local storage
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);
      localStorage.setItem("expiresIn", Date.now() + data.expires_in * 1000);

      // Navigate to the new dashboard page
      navigate("/player");
    } catch (error) {
      console.error("Error during token exchange:", error);
      navigate("/"); // Redirect to home if something goes wrong
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (!code) {
      console.error("Authorization code not found in URL");
      navigate("/");
      return;
    }

    fetchSpotifyToken(code);
  }, [navigate]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#9fdcfd] text-white text-xl">
      <p>Processing your Spotify login...</p>
    </div>
  );
};

export default Callback;
