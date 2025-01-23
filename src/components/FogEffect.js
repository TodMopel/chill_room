import React from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const FogEffect = ({ color = 'white', near = 15, far = 35 }) => {
  const { scene } = useThree();
  
  React.useEffect(() => {
    scene.fog = new THREE.Fog(color, near, far);
    
    return () => {
      scene.fog = null;
    };
  }, [color, near, far, scene]);

  return null;
};

export default FogEffect;
