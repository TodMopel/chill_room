import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

import CameraController from './CameraController';
import RaycasterController from './RaycasterController';
import SelectedObjectEffect from './SelectedObjectEffect';
import FogEffect from './FogEffect';

import { Perf } from 'r3f-perf';

const Room3D = ({ cameraConfig, onProjectSelect, disableRaycaster }) => {
  const roomRef = useRef();
  const [hoveredObject, setHoveredObject] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);

  const { scene } = useGLTF('/assets/model/ChillRoom.glb');
  
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  const handleClick = (object) => {
    setSelectedObject(object);
    onProjectSelect(object.name);
  };

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </Canvas>

    // <Canvas
    //   className="room-canvas"
    //   shadows
    // >
    //   <ambientLight intensity={0.5} />
    //   <pointLight
    //     position={[0, 4, 0]}
    //     intensity={10}
    //     castShadow={true}
    //     shadow-mapSize-width={2048*2}
    //     shadow-mapSize-height={2048*2}
    //     shadow-radius={5}
    //   />
    //   <primitive
    //     object={scene}
    //     ref={roomRef}
    //     castShadow={true}
    //   />

    //   <mesh position={[0, 1.5, 0]}>
    //     <sphereGeometry args={[64, 32, 32]} />
        
    //     <meshStandardMaterial color="#444" side={THREE.BackSide} />
    //   </mesh>

    //   {!disableRaycaster && (
    //     <RaycasterController 
    //       handleObjectClick={handleClick} 
    //       setHoveredObject={setHoveredObject}
    //       hoveredObject={hoveredObject}
    //     />
    //   )}
    //   {/* <FogEffect color="#fff" /> */}
    //   <SelectedObjectEffect hoveredObject={hoveredObject} selectedObject={selectedObject} />
    //   {cameraConfig && <CameraController cameraConfig={cameraConfig} roomRef={roomRef} />}
    //   {window.location.hash === '#debug' && <Perf />}
    // </Canvas>
  );
};

export default Room3D;
