import React from 'react';

const ProjectDisplay = ({ project, onClose, isFullscreen, onFullscreenToggle }) => {
  const toggleFullscreen = () => {
    onFullscreenToggle(!isFullscreen);
  };

  return (
    <section>
      <div className='overlay-header'>
        <p className='overlay-title'>{project.title}</p>
        <div className='overlay-buttons'>
          <button className={`${isFullscreen ? 'minimize-button' : 'fullscreen-button'} buttons`} onClick={toggleFullscreen}>
          </button>
          <button className="buttons close-button" onClick={onClose}></button>
        </div>
      </div>
      <div className='overlay-content'>
        <p>{project.description}</p>
        {project.image && (
          <img 
            className='project-image'
            src={project.image} 
            alt={project.title} 
          />
        )}
      </div>
    </section>
  );
};

export default ProjectDisplay;
