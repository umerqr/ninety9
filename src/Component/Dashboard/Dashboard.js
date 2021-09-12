/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import 'antd/dist/antd.css';
import { Drawer, SwipeableDrawer } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// import { /* useDispatch, */ useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import DrawerList from './DrawerList/DrawerList';
import Clients from './Clients/Clients';
// import Plans from './Plans/Plans';
// import * as actionTypes from './actions';

const Profile = React.lazy(() => import('./Profile'));
const Plans = React.lazy(() => import('./Plans/Plans'));
const Payment = React.lazy(() => import('./Payment/Payment'));
const Homepage = (props) => {
  const { path, url } = useRouteMatch();
  const { infoData, setinfoData } = props;
  const [visible, setVisible] = useState(true);
  const [showOtherMenu, setShowOtherMenu] = useState(false);
  const [loggedIn, setLoggedIn] = useState('');
  const [selected, setSelected] = useState('');
  const [drawerItems] = useState([
    {
      label: 'Perfil',
      name: 'profile',
      id: 1,
    },
    {
      label: 'Planes',
      name: 'plans',
      id: 2,
    },
    {
      label: 'Método de Pagogit',
      name: 'payment',
      id: 3,
    },
  ]);
  const [adminDrawerItems] = useState([
    {
      label: 'Clientes',
      name: 'clients',
      id: 1,
    },
  ]);
  const [
    windowSize,
    setWindowSize,
  ] = useState({
    width: 0,
    height: 0,
  });

  const onClickItem = (listitem) => {
    setSelected(listitem.name);
  };
  useLayoutEffect(() => {
    const updateSize = () => {
      setWindowSize({
        ...windowSize,
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };
    window.addEventListener('resize', updateSize);
    updateSize();// eslint-disable-next-line
    return () => window.removeEventListener('resize', updateSize);// eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (windowSize.width < 890) {
      setShowOtherMenu(true);
      setVisible(false);
    }
    if (windowSize.width > 890) {
      setShowOtherMenu(false);
      setVisible(true);
    }
  }, [
    windowSize,
  ]);
  useEffect(() => {
    const loggedInEmail = window.localStorage.getItem('loggedInEmail');
    setLoggedIn(loggedInEmail);
    setSelected(loggedInEmail === 'admin@gmail.com' ? 'users' : 'profile');
  }, []);
  useEffect(() => {
    if (selected === 'profile') {
      props.history.push(`${url}/profile`);
    }
    if (selected === 'clients') {
      props.history.push(`${url}/clients`);
    }
    if (loggedIn === 'admin@gmail.com') {
      props.history.push(`${url}/clients`);
    }
    // eslint-disable-next-line no-restricted-globals
    const locationPath = location.pathname;
    if (locationPath === `${url}/clients`) {
      setSelected('clients');
    }
    // eslint-disable-next-line
  }, [selected]);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setVisible(open);
  };
  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
        edge="start"
        className="menu-btn"
      >
        <MenuIcon />
      </IconButton>
      <div className="main-content-container">
        { showOtherMenu ? (
          <SwipeableDrawer
            anchor="left"
            open={visible}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            // className="drawer-open"
          >
            <DrawerList
              // visible={visible}
              drawerItems={loggedIn === 'admin@gmail.com' ? adminDrawerItems : drawerItems}
              onClickItem={onClickItem}
              selected={selected}
              infoData={infoData}
              loggedIn={loggedIn}
            />
          </SwipeableDrawer>
        )
          : (
            <Drawer
              variant="permanent"
              open={visible}
              className="drawer-open"
            >
              <DrawerList
                // visible={visible}
                drawerItems={loggedIn === 'admin@gmail.com' ? adminDrawerItems : drawerItems}
                onClickItem={onClickItem}
                selected={selected}
                infoData={infoData}
                loggedIn={loggedIn}
                clientsComp={loggedIn === 'admin@gmail.com' && true}
              />
            </Drawer>
          )}
        <Switch>
          {loggedIn !== 'admin@gmail.com'
            ? (
              <>
                <Route path={`${path}/profile`} render={(renderProps) => <Profile {...renderProps} visible={visible} infoData={infoData} />} />
                <Route path={`${path}/plans`} render={(renderProps) => <Plans {...renderProps} visible={visible} infoData={infoData} setinfoData={setinfoData} />} />
                <Route path={`${path}/payment`} render={(renderProps) => <Payment {...renderProps} visible={visible} infoData={infoData} setinfoData={setinfoData} />} />
              </>
            )
            : <Route path={`${path}/clients`} render={(renderProps) => <Clients {...renderProps} visible={visible} infoData={infoData} setinfoData={setinfoData} />} />}
        </Switch>
      </div>
    </>
  );
};

Homepage.defaultProps = { setinfoData: false };
Homepage.propTypes = {
  infoData: PropTypes.shape({
    country:
 PropTypes.string.isRequired,
  }).isRequired,
  // eslint-disable-next-line react/require-default-props
  history: PropTypes.object,
  setinfoData: PropTypes.func,
};

export default Homepage;
