/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';
import AppLabel from '../../AppLabel';
import './styles.css';
import walletIcon from '../../../assets/img/wallet.svg';
import planesIcon from '../../../assets/img/planes.svg';
import profileIcon from '../../../assets/img/profile.svg';

function DrawerListItem(props) {
  const { onClickItem, selected, listItem } = props;
  const { path } = useRouteMatch();
  return (

    <Link className="link-styling" to={() => `${path}/${listItem.name}`}>
      <div
        className={(() => {
          if (selected === listItem.name) {
            // if (visible) {
            return 'list-item-container list-item-selected d-flex';
            // }
            // return 'list-item-container list-item-selected-closed d-flex';
          }
          // if (visible) {
          return 'list-item-container list-item d-flex';
          // }
          // return 'list-item-container list-item-closed d-flex';
        })()}
        onClick={() => onClickItem(listItem)}
      >
        {(() => {
          switch (listItem.name) {
            case 'profile':
              return <img src={profileIcon} alt="" className="drawer-icon-styling" />;
            case 'plans':
              return <img src={planesIcon} alt="" className="drawer-icon-styling" />;
            case 'payment':
              return <img src={walletIcon} alt="" className="drawer-icon-styling" />;
            case 'clients':
              return <img src={profileIcon} alt="" className="drawer-icon-styling" />;
            default: return null;
          }
        })()}
        <AppLabel label={listItem.label} onClick={() => onClickItem(listItem)} />
      </div>
    </Link>

  );
}
DrawerListItem.defaultProps = {
  onClickItem: false,
  selected: false,
  listItem: false,
  // visible: false,
};
DrawerListItem.propTypes = {
  onClickItem: PropTypes.func,
  selected: PropTypes.string,
  // visible: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  listItem: PropTypes.any,
};

export default DrawerListItem;
