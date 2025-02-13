export const getAccessToken = async () => {
    const expiresIn = localStorage.getItem('expiresIn');
    if (Date.now() >= expiresIn) {
      return await refreshToken();
    }
    return localStorage.getItem('accessToken');
  };
  
  export const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return null;
  
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(
            `${import.meta.env.REACT_APP_SPOTIFY_CLIENT_ID}:${import.meta.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`
          )}`,
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }),
      });
  
      const data = await response.json();
      localStorage.setItem('accessToken', data.access_token);
      localStorage.setItem('expiresIn', Date.now() + data.expires_in * 1000);
      return data.access_token;
    } catch (err) {
      console.error('Error refreshing token:', err);
      return null;
    }
  };
  
  export const fetchRecommendations = async (emotion) => {
    const token = await getAccessToken();
    const genresMap = {
      happy: 'pop',
      sad: 'acoustic',
      angry: 'rock',
      calm: 'chill',
    };
  
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/recommendations?seed_genres=${genresMap[emotion]}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const data = await response.json();
      return data.tracks; // Return track recommendations
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      return [];
    }
};
  

// export const detectEmotion = async (image) => {
//     // Replace with actual emotion detection logic
//     const emotions = ['happy', 'sad', 'angry', 'calm'];
//     const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
//     return randomEmotion;
//   };
  