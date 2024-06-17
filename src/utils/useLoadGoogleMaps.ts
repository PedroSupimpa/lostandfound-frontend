
import { useState, useEffect } from 'react';

const useLoadGoogleMaps = (apiKey: string, libraries: string[] = ['places']) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (window.google) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries.join(',')}`;
    script.async = true;
    script.onload = () => setIsLoaded(true);

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey, libraries]);

  return isLoaded;
};

export default useLoadGoogleMaps;
