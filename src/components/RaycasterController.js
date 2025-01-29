import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Raycaster, Vector2 } from 'three';
import projectsData from '../data/projects.json';

const RaycasterController = ({ handleObjectClick, setHoveredObject, selectedObject }) => {
  const { camera, scene, gl } = useThree(); // Récupérer le canvas via `gl.domElement`
  const raycaster = useRef(new Raycaster());
  const mouse = useRef(new Vector2());
  const [intersectedObject, setLocalIntersectedObject] = useState(null);
  const [mouseDownObject, setMouseDownObject] = useState(null);

  // Vérifier si un objet est sélectionnable
  const isSelectable = (object) => {
    return projectsData.sections.some(section =>
      section.id === object.name || section.projects?.some(project => project.name === object.name)
    );
  };

  // Gérer les mouvements de souris/touch
  const handlePointerMove = (event) => {
    const canvas = gl.domElement;
    const rect = canvas.getBoundingClientRect();

    let clientX, clientY;
    if (event.touches && event.touches[0]) {
      // Gérer les interactions tactiles
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      // Gérer les interactions souris
      clientX = event.clientX;
      clientY = event.clientY;
    }

    mouse.current.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    mouse.current.y = -((clientY - rect.top) / rect.height) * 2 + 1;
  };

  // Gérer l'événement de pression sur la souris/touch
  const handlePointerDown = () => {
    if (intersectedObject && intersectedObject !== selectedObject) {
      setMouseDownObject(intersectedObject);
    }
  };

  // Gérer l'événement de relâchement de la souris/touch
  const handlePointerUp = () => {
    if (
      intersectedObject &&
      mouseDownObject &&
      intersectedObject === mouseDownObject &&
      isSelectable(intersectedObject)
    ) {
      handleObjectClick(intersectedObject);
    }
    setMouseDownObject(null);
  };

  // Mise à jour du raycaster à chaque frame
  useFrame(() => {
    raycaster.current.setFromCamera(mouse.current, camera);
    const intersects = raycaster.current.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const object = intersects[0].object;

      if (isSelectable(object)) {
        setLocalIntersectedObject(object);
        setHoveredObject(object);
      } else {
        setLocalIntersectedObject(null);
        setHoveredObject(null);
      }
    } else {
      setLocalIntersectedObject(null);
      setHoveredObject(null);
    }
  });

  // Gestion des événements
  useEffect(() => {
    const canvas = gl.domElement;

    // Ajouter les listeners
    canvas.addEventListener('mousemove', handlePointerMove);
    canvas.addEventListener('mousedown', handlePointerDown);
    canvas.addEventListener('mouseup', handlePointerUp);
    canvas.addEventListener('touchmove', handlePointerMove, { passive: true });
    canvas.addEventListener('touchstart', handlePointerDown, { passive: true });
    canvas.addEventListener('touchend', handlePointerUp, { passive: true });

    // Nettoyage des listeners
    return () => {
      canvas.removeEventListener('mousemove', handlePointerMove);
      canvas.removeEventListener('mousedown', handlePointerDown);
      canvas.removeEventListener('mouseup', handlePointerUp);
      canvas.removeEventListener('touchmove', handlePointerMove);
      canvas.removeEventListener('touchstart', handlePointerDown);
      canvas.removeEventListener('touchend', handlePointerUp);
    };
  }, [intersectedObject, mouseDownObject, camera, scene, gl]);

  return null;
};

export default RaycasterController;
