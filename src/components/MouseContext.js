import React, { createContext, useContext, useRef, useEffect, useState } from 'react';

const MouseContext = createContext();

export const MouseProvider = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <MouseContext.Provider value={mousePosition}>
      {children}
    </MouseContext.Provider>
  );
};

export const useMouse = () => useContext(MouseContext);
