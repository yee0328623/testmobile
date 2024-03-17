import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import "./Navbar.css";
import '../index.css';

const Navbar = ({ isOpen, toggleNavbar, handleClientSelection, clientsByCounty}) => {
  const [activeItem, setActiveItem] = useState(null);

  const handleNavItemClick = (county) => {
    setActiveItem(activeItem === county ? null : county);
  };

  const [isResponsive, setIsResponsive] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsResponsive(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

return (
  <nav className={`nav-bar ${isResponsive ? 'responsive' : ''} ${isOpen ? 'isopen' : ''}`} id="Navbar">
    <ul className="nav-list">
      <li className="logo" onClick={toggleNavbar}>
          <a href="#" className="logo-link">
              <h3 className="link-text">知訊科技</h3>
              <div className="icon">
                    <svg className={`close-nav ${isOpen ? '' : 'nav-hidden'}`} height="26" width="22" viewBox="0 0 384 512">
                      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                    </svg>
                    <svg className={`open-nav ${isOpen ? 'nav-hidden' : ''}`} height="26" width="24" viewBox="0 0 448 512">
                      <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                    </svg>
              </div>
          </a>
      </li>                
      <div className="nav-heading">
          <svg height="22" width="20" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
      </div>
      {Object.keys(clientsByCounty).map((county) => (
        <li key={county} className={`nav-list-item ${activeItem === county ? 'active' : ''}`}>
          <a href="#" className="nav-link" onClick={() => handleNavItemClick(county)}>
              <svg height="16" width="10" viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>
              <span className="link-text">{county}</span>
          </a>
          {activeItem === county ? (
            <DropdownList
              clients={clientsByCounty[county]}
              toggleNavbar={toggleNavbar}
              handleClientSelection={handleClientSelection}
            />
          ) : null}
        </li>
      ))}
    </ul>
  </nav>
);
};

const DropdownList = ({ clients, toggleNavbar, handleClientSelection }) => {
const props = useSpring({
  from: { opacity: 0, height: 0 },
  to: { opacity: 1, height: clients.length * 50 },
  leave: { opacity: 0, height: 0 },
});

return (
  <animated.ul style={props} className="dropdown-list">
    {clients.map((clientName) => (
      <li key={clientName} className="dropdown-list-item">
        <a
          href="#!"
          className="dropdown-link"
          onClick={() => {
            toggleNavbar();
            handleClientSelection(clientName);
          }}
        >
          {clientName}
        </a>
      </li>
    ))}
  </animated.ul>
);
};

export default Navbar;