import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBehance,faYoutube,faInstagram,faLinkedin} from '@fortawesome/free-brands-svg-icons';
import logo from "../../img/rast-mobile-logo.png"
import "../Header/header.css"

const Header = () => {
  return (
    <Navbar expand="lg" className='navbar'>
      <Navbar.Brand href="#home" className='navbarBrand'>
        <img
          src={logo}
          height="30"
          className="d-inline-block align-top logo"
          alt="Logo"
        />
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto titleContainer">
          <Nav.Link className='title1' href="https://rastmobile.com/hakkimizda/" target='_blank'>Hakkımızda</Nav.Link>
          <Nav.Link className='title2' href="https://rastmobile.com/case-study/juri-yarisma-yazilimi/">Jüri-Yarışma Yazılımı</Nav.Link>
          <Nav.Link className='title3' href="https://getwordninja.com/" target="_blank">Word Ninja</Nav.Link>
          <Nav.Link className='title4' href="https://rastmobile.com/case-study/word-pyramids-kelime-bulmaca-oyunu/">Word Pyramids</Nav.Link>
        </Nav>
        <Nav className='socialMedia-container'>
          
          <Nav.Link href="https://www.youtube.com/channel/UC9zhWu89h4AqolHrVspLkVw" target='_blank'>
            <FontAwesomeIcon icon={faYoutube} className="socialMediaIcon" />
          </Nav.Link>
          <Nav.Link href="https://www.instagram.com/mobilerast/" target='_blank'>
            <FontAwesomeIcon icon={faInstagram} className="socialMediaIcon" />
          </Nav.Link>
          <Nav.Link href="https://www.behance.net/rastmobile" target='_blank'>
            <FontAwesomeIcon icon={faBehance} className="socialMediaIcon" />
          </Nav.Link>
          <Nav.Link href="https://www.linkedin.com/company/rastmobile/" target ="_blank">
            <FontAwesomeIcon icon={faLinkedin}  className="socialMediaIcon" />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
