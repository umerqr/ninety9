/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Navbar } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AppLabel from '../../AppLabel';
import DrawerListItem from './DrawerListItem';
// import AppButton from '../../AppButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import PropTypes from 'prop-types';
import brandlogo from '../../../assets/img/logo.svg';
import logout from '../../../assets/img/logout.svg';
import AppButton from '../../AppButton';

function DrawerList(props) {
  const { onClickItem, selected, drawerItems, infoData, clientsComp } = props;
  const nameInitials = infoData.name.split(' ').map((n) => n[0]).join('');
  return (
    <div className="drawer-list-container">

      <Navbar.Brand href="/" className="header-logo">
        <img src={brandlogo} alt="" />
        {' '}
      </Navbar.Brand>

      <div className="d-flex drawer-avatar-styling-div">
        <Avatar className="drawer-avatar-styling">{nameInitials}</Avatar>
        {/* { visible && ( */}
        <div className="dashboard-name-styling col-7">
          <AppLabel className="" label="Bienvenid" />
          <AppLabel className="" label={infoData.name} />
        </div>
        {/* // )} */}
      </div>
      <div className="drawer-list-sub-container">
        {drawerItems.map((x) => (
          <DrawerListItem
            key={x.id}
            onClickItem={onClickItem}
            selected={selected}
            listItem={x}
          />
        ))}
      </div>
      <div className="agender-btn-style-div">
        {clientsComp ? null : <AppButton name="Agender Button" label="Agendar cita" className="agender-btn-style" onClick={() => {}} />}
      </div>
      <Link className="link-styling" to={() => '/login'}>
        <div
          className={clientsComp ? 'clients-logout-div-styling d-flex' : 'logout-div-styling d-flex'}
          onClick={() => { window.localStorage.removeItem('loggedInEmail'); }}
        >
          <img src={logout} alt="." />
          <AppLabel className="logout-label" label="Cerrar sesión" />
        </div>
      </Link>
    </div>
  );
}

DrawerList.defaultProps = {
  onClickItem: false,
  selected: false,
  drawerItems: false,
  clientsComp: false,
};
DrawerList.propTypes = {
  onClickItem: PropTypes.func,
  // visible: PropTypes.bool,
  selected: PropTypes.string,
  clientsComp: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  drawerItems: PropTypes.array,
  infoData: PropTypes.shape({
    country:
   PropTypes.string,
    email:
   PropTypes.string,
    name:
   PropTypes.string,
    contact:
   PropTypes.string,
  }).isRequired,
};

export default DrawerList;
