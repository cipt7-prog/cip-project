// src/utils/spotifyApi.js

const API_BASE_URL = "https://api.spotify.com/v1";

// Get stored token
const getAccessToken = () => localStorage.getItem("accessToken");

// Fetch User Profile
export const getUserProfile = async () => {
  const token = getAccessToken();

  const response = await fetch(`${API_BASE_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }
  return await response.json();
};

// Fetch Recommended Songs
export const getSongs = async () => {
  const token = getAccessToken();

  const response = await fetch(`${API_BASE_URL}/me/top/tracks?limit=10`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch songs");
  }
  return await response.json().then((data) => data.items);
};
