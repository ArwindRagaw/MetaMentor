import { useState, useEffect } from 'react';

export default function YouTubeVideo({ searchQuery }) {
  const [videoId, setVideoId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      if (!searchQuery) {
        setLoading(false);
        return;
      }

      // Fallback video IDs for common programming topics
      const fallbackVideos = {
        'javascript': 'W6NZfCO5SIk',  // JavaScript Tutorial for Beginners by Mosh
        'python': 'rfscVS0vtbw',      // Python Tutorial by freeCodeCamp
        'react': 'SqcY0GlETPk',       // React Tutorial by Mosh
        'web development': 'G3e-cpL7ofc', // HTML & CSS by SuperSimpleDev
        'programming': 'zOjov-2OZ0E',  // Programming Fundamentals by Mosh
        'default': 'PkZNo7MFNFg'      // JavaScript Tutorial as default
      };

      try {
        // Extract video ID if a full YouTube URL is provided
        if (searchQuery.includes('youtube.com') || searchQuery.includes('youtu.be')) {
          const url = new URL(searchQuery);
          if (searchQuery.includes('youtube.com')) {
            setVideoId(url.searchParams.get('v'));
          } else {
            setVideoId(url.pathname.slice(1));
          }
        } else {
          // Use fallback videos for topics
          const key = Object.keys(fallbackVideos).find(k => 
            searchQuery.toLowerCase().includes(k.toLowerCase())
          ) || 'default';
          setVideoId(fallbackVideos[key]);
        }
      } catch (error) {
        console.error('Error setting video:', error);
        setError('Failed to load video');
        // Use default video on error
        setVideoId(fallbackVideos['default']);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-50 rounded-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 bg-red-50 rounded-lg">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!videoId) {
    return (
      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-600">No video available for this topic.</p>
      </div>
    );
  }

  return (
    <div className="relative pb-[56.25%] h-0">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
      ></iframe>
    </div>
  );
}