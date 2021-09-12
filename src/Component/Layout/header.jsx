import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
// import MenuIcon from '@material-ui/icons/Menu';
// import PropTypes from 'prop-types';
import brandlogo from '../../assets/img/logo.svg';
import './index.css';

const Header = () => {
  const history = useHistory();

  function loginuser() {
    history.push('/Login');
  }
  return (
    <Navbar className="navbar-header">
      {/* <MenuIcon className="menu-btn" onClick={onClick} /> */}
      <Navbar.Brand href="/">
        <img src={brandlogo} alt="" />
        {' '}
      </Navbar.Brand>
      <div className="header-login-btn">
        <Button
          variant="link"
          className="btn-theme mb-2 padding-left-19"
          onClick={loginuser}
        >
          Login
        </Button>
      </div>
    </Navbar>
  );
};
// Header.defaultProps = { onClick: false };
// Header.propTypes = { onClick: PropTypes.func };

export default Header;
