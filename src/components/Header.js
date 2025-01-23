import React from 'react';
import logo from '../assets/logo.svg';
import DropdownMenu from './DropdownMenu';
import projectsData from '../data/projects.json';

const Header = ({ onProjectSelect }) => {
  return (
    <header>
      <div className="logo" onClick={() => onProjectSelect('original')}>
        <img src={logo} alt="Logo" />
      </div>
      <nav>
        <ul>
          {projectsData.sections.map((section) => (
            <li className="dropdown-menu" key={section.id}>
              <DropdownMenu
                sectionName={section.title}
                sectionID={section.id}
                projects={section.projects}
                onProjectSelect={onProjectSelect}
              />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
