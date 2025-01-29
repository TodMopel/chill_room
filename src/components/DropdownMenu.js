import React, { useState } from 'react';

const DropdownMenu = ({ sectionName, sectionID, projects, onProjectSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleItemClick = (project) => {
    onProjectSelect(project);
    setIsOpen(false);
  };

  return (
    <div>
      <div className="dropdown-header">
        <div
          className="dropdown-button"
          onClick={() => onProjectSelect(sectionID)}
        >
          {sectionName}
        </div>
        {projects && projects.length > 0 && (
          <div className="dropdown-toggle" onClick={toggleDropdown}>
            {isOpen ? '▲' : '▼'}
          </div>
        )}
      </div>
      {isOpen && (
        <ul className="dropdown-content">
          {projects.map((project) => (
            <li key={project.name} onClick={() => handleItemClick(project.name)}>
              <div className="dropdown-title">{project.title}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default DropdownMenu;