import { useEffect, useRef } from 'react';
import { Object3D } from 'three';
import { useFrame } from '@react-three/fiber';

const lerp = (start, end, t) => start + (end - start) * t;

const SelectedObjectEffect = ({ hoveredObject, selectedObject }) => {
  const bumpObjects = useRef(new Map());
  const animationSpeed = .5;

  useEffect(() => {
    if (hoveredObject instanceof Object3D) {
      if (hoveredObject==selectedObject) return;
      bumpObjects.current.set(hoveredObject, {
        originalScale: hoveredObject.scale.clone(),
        targetScale: 1.25,
        animationPhase: 'bump'
      });
    }
  }, [hoveredObject]);

  useFrame(() => {
    bumpObjects.current.forEach((data, object) => {
      const { targetScale, animationPhase } = data;
      const currentScale = object.scale.toArray();

      if (animationPhase === 'bump') {
        const newScale = currentScale.map(s => lerp(s, targetScale, animationSpeed));

        object.scale.set(...newScale);

        if (Math.abs(newScale[0] - targetScale) < 0.01) {
          data.targetScale = 1.0;
          data.animationPhase = 'reset';
        }
      }

      if (animationPhase === 'reset') {
        const newScale = currentScale.map(s => lerp(s, data.targetScale, animationSpeed));

        object.scale.set(...newScale);

        if (Math.abs(newScale[0] - data.targetScale) < 0.01) {
          bumpObjects.current.delete(object);
        }
      }
    });
  });

  return null;
};

export default SelectedObjectEffect;
