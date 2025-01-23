import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import Room3D from '../components/Room3D';
import ProjectDisplay from '../components/ProjectDisplay';
import projectsData from '../data/projects.json';
import cameraConfigs from '../data/cameraConfigs.json';

const Home = () => {
  const [selectedSection, setSelectedSection] = useState('original');
  const [selectedProject, setSelectedProject] = useState(null);
  const [cameraConfig, setCameraConfig] = useState(cameraConfigs.original);
  const [isProjectDisplayFullscreen, setIsProjectDisplayFullscreen] = useState(false);

  const handleProjectSelect = (selected) => {
    if (selected === "original") {
      setSelectedProject(null);
      setSelectedSection(selected);
      setCameraConfig(cameraConfigs.original);
      return;
    }
    
    const sectionWithProjects = projectsData.sections.find(section => 
      section.id === selected || (section.projects && section.projects.some(project => project.name === selected))
    );
    
    if (sectionWithProjects) {
      const selectedProject = sectionWithProjects.projects 
        ? sectionWithProjects.projects.find(project => project.name === selected) 
        : null;
      
      setSelectedSection(sectionWithProjects.id);
      setSelectedProject(selectedProject);
      
      const projectCameraConfig = cameraConfigs[selected] || cameraConfigs[sectionWithProjects.id] || cameraConfigs.original;
      setCameraConfig({
        position: projectCameraConfig.position,
        targetPosition: projectCameraConfig.targetPosition,
        fov: projectCameraConfig.fov,
        limits: {
          maxPolarAngle: projectCameraConfig.limits.maxPolarAngle,
          minPolarAngle: projectCameraConfig.limits.minPolarAngle,
          maxAzimuthAngle: projectCameraConfig.limits.maxAzimuthAngle,
          minAzimuthAngle: projectCameraConfig.limits.minAzimuthAngle
        }
      });
    }
  };

  const handleProjectClose = () => {
    setSelectedProject(null);
    setCameraConfig(cameraConfigs[selectedSection] || cameraConfigs.original);
  };
  
  const handleProjectDisplayFullscreenToggle = (isFullscreen) => {
    setIsProjectDisplayFullscreen(isFullscreen);
  };
  
  return (
    <div className="home-container">
      <Header onProjectSelect={handleProjectSelect}/>
      <main className="main-content">
        <div className="scene-container">
          <Room3D cameraConfig={cameraConfig} onProjectSelect={handleProjectSelect} disableRaycaster={selectedProject && isProjectDisplayFullscreen}/>
        </div>
        {selectedProject && (<div className={`${isProjectDisplayFullscreen ? 'fullscreen' : 'classicscreen'} project-overlay non-selectable`}>
          <ProjectDisplay 
              project={selectedProject}
              onClose={handleProjectClose}
              isFullscreen={isProjectDisplayFullscreen} 
              onFullscreenToggle={handleProjectDisplayFullscreenToggle}/>
        </div>)}
      </main>
    </div>
  );
};

export default Home;
