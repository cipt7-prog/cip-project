import React from 'react';

const SongList = ({ songs }) => {
  return (
    <div className="song-list mt-8">
      {songs.map((song) => (
        <div
          key={song.id}
          className="flex items-center justify-between p-4 bg-white bg-opacity-10 rounded-md mb-4 shadow-md"
        >
          <div>
            <p className="font-semibold">{song.name}</p>
            <p className="text-sm text-gray-300">
              {song.artists.map((artist) => artist.name).join(', ')}
            </p>
          </div>
          <a
            href={song.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-green-500"
          >
            Play
          </a>
        </div>
      ))}
    </div>
  );
};

export default SongList;
