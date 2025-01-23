import React, { useEffect } from 'react';

const LoadingScreen = ({ isFadingOut }) => {
  const loadingGif = process.env.PUBLIC_URL + '/assets/loading.gif';

  const styles = {
    loadingScreen: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#333',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      transition: 'transform 0.5s ease-out',
      transform: isFadingOut ? 'translateY(100%)' : 'translateY(0)'
    },
    loadingGif: {
      width: 'auto',
      height: '10vh'
    },
    loadingBar: {
      width: '20vw',
      height: '2.5px',
      backgroundColor: '#494949',
      borderRadius: '5px',
      marginTop: '20px',
      position: 'relative'
    },
    loadingProgress: {
      height: '100%',
      width: '100%',
      backgroundColor: '#f5f5f5',
      borderRadius: '5px',
      animation: `progress 1.1s ease-in-out`
    }
  };

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerHTML = `
      @keyframes progress {
        from { width: 0%; }
        to { width: 100%; }
      }
    `;
    document.head.appendChild(styleSheet);
    
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div style={styles.loadingScreen}>
      <img src={loadingGif} alt="Loading..." style={styles.loadingGif} />
      <div style={styles.loadingBar}>
        <div style={styles.loadingProgress}></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
