// src/pages/Player.jsx

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { getUserProfile, getSongs } from "../utils/spotifyApi"; // Helper functions for API calls
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
} from "lucide-react";
import user from '../assets/user.png'

const Player = () => {
  const [profile, setProfile] = useState(null);
  const [songs, setSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Fetch user profile and song list on component mount
    const fetchData = async () => {
      const userProfile = await getUserProfile();
      setProfile(userProfile);

      const recommendedSongs = await getSongs();
      setSongs(recommendedSongs);
    };

    fetchData();
  }, []);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="flex flex-col bg-black text-white min-h-screen w-screen overflow-hidden">
  {/* Header */}
  <div className="flex justify-between items-center p-4">
    <h1 className="text-2xl font-semibold">Emotify</h1>
    {profile && (
      <div className="flex flex-col items-center">
        <img
          src={profile.images?.[0]?.url || user}
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
        <span>{profile.display_name}</span>
      </div>
    )}
  </div>

  {/* Main Content */}
  <div className="flex gap-4 p-2 flex-grow overflow-hidden">
    {/* Webcam Preview */}
    <div className="flex-1 flex justify-center items-center bg-gray-800 rounded-lg">
      <Webcam
        audio={false}
        className="rounded-lg"
        videoConstraints={{ width: 640, height: 480 }}
      />
    </div>

    {/* Song List */}
    <div className="w-1/3 bg-gray-900 rounded-lg p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Your Songs</h2>
      {songs.map((song, index) => (
        <div
          key={index}
          className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded-lg cursor-pointer"
        >
          <img
            src={song.album.images[0]?.url}
            alt={song.name}
            className="w-12 h-12 rounded-lg"
          />
          <div className="flex flex-col">
            <span className="font-semibold">{song.name}</span>
            <span className="text-sm text-gray-400">
              {song.artists[0].name}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Footer Music Controls */}
  <div className="bg-gray-900 py-4 px-6 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <img
        src={songs[0]?.album.images[0]?.url || "/default-song.png"}
        alt="Current Song"
        className="w-14 h-14 rounded-lg"
      />
      <div>
        <p className="font-semibold">
          {songs[0]?.name || "No Song Playing"}
        </p>
        <p className="text-sm text-gray-400">
          {songs[0]?.artists[0]?.name || "Unknown Artist"}
        </p>
      </div>
    </div>

    {/* Controls */}
    <div className="flex items-center gap-6">
      <Shuffle size={24} className="cursor-pointer hover:text-green-500" />
      <SkipBack size={24} className="cursor-pointer hover:text-green-500" />
      {isPlaying ? (
        <Pause
          size={32}
          className="cursor-pointer hover:text-green-500"
          onClick={togglePlayPause}
        />
      ) : (
        <Play
          size={32}
          className="cursor-pointer hover:text-green-500"
          onClick={togglePlayPause}
        />
      )}
      <SkipForward
        size={24}
        className="cursor-pointer hover:text-green-500"
      />
      <Repeat size={24} className="cursor-pointer hover:text-green-500" />
    </div>
  </div>
</div>

  );
};

export default Player;
