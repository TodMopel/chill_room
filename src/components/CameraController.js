import React, { useState, useEffect, useRef } from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';

const lerp = (start, end, t) => start + (end - start) * t;
const t = 5 / 10000;
const threshold = 0.05;

const CameraController = ({ cameraConfig, roomRef, cameraRef }) => {
  const { camera } = useThree();
  const [cameraState, setCameraState] = useState({
    position: camera.position.toArray(),
    fov: camera.fov,
    targetPosition: [0, 0, 0],
  });
  const [animationInProgress, setAnimationInProgress] = useState(false);
  const controlsRef = useRef();

  const maxZoom = 20;
  const minZoom = .25;

  useEffect(() => {
    const updateCameraState = () => {
      const currentPosition = camera.position.toArray();
      const currentTargetPosition = cameraState.targetPosition;

      const newPosition = currentPosition.map((pos, index) =>
        lerp(pos, cameraConfig.position[index], t)
      );
      const newTargetPosition = cameraState.targetPosition.map((pos, index) =>
        lerp(pos, cameraConfig.targetPosition[index], t)
      );
      const newFov = lerp(camera.fov, cameraConfig.fov, t);

      if (
        Math.abs(currentPosition[0] - cameraConfig.position[0]) > threshold ||
        Math.abs(currentPosition[1] - cameraConfig.position[1]) > threshold ||
        Math.abs(currentPosition[2] - cameraConfig.position[2]) > threshold ||
        Math.abs(currentTargetPosition[0] - cameraConfig.targetPosition[0]) > threshold ||
        Math.abs(currentTargetPosition[1] - cameraConfig.targetPosition[1]) > threshold ||
        Math.abs(currentTargetPosition[2] - cameraConfig.targetPosition[2]) > threshold ||
        Math.abs(camera.fov - cameraConfig.fov) > threshold
      ) {
        setAnimationInProgress(true);
        setCameraState({
          position: newPosition,
          fov: newFov,
          targetPosition: newTargetPosition,
        });
      } else {
        setAnimationInProgress(false);
      }
    };

    updateCameraState();
  }, [cameraConfig, camera, roomRef, cameraState.targetPosition]);

  useFrame(() => {
    if (animationInProgress) {
      camera.position.set(...cameraState.position);
      camera.fov = cameraState.fov;
      camera.updateProjectionMatrix();
    }
    const distanceToTarget = camera.position.distanceTo(controlsRef.current.target);

    if (distanceToTarget < minZoom) {
      const direction = camera.position.clone().sub(controlsRef.current.target).normalize();
      camera.position.copy(controlsRef.current.target.clone().add(direction.multiplyScalar(minZoom)));
    }
    if (distanceToTarget > maxZoom) {
      const direction = camera.position.clone().sub(controlsRef.current.target).normalize();
      camera.position.copy(controlsRef.current.target.clone().add(direction.multiplyScalar(maxZoom)));
    }
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={cameraState.position}
        fov={cameraState.fov}
      />
      <OrbitControls
        ref={controlsRef}
        target={cameraState.targetPosition}
        fov={cameraConfig.fov}
        enableZoom={!animationInProgress}
        // enablePan={!animationInProgress}
        enablePan={false}
        zoomSpeed={0.2}
        minDistance={minZoom}
        maxDistance={maxZoom}
        enableRotate={!animationInProgress}
        enableDamping={!animationInProgress}
        rotateSpeed={0.25}
      />
    </>
  );
};

export default CameraController;
