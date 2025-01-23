import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import LoadingScreen from './components/LoadingScreen';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const loadingTime = 1500;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      const removeLoadingScreen = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(removeLoadingScreen);
    }, loadingTime);

    return () => clearTimeout(timer);
  }, [loadingTime]);

  return (
    <div className="App">
      {isLoading && <LoadingScreen isFadingOut={isFadingOut} />}
      <Home />
    </div>
  );
}

export default App;
