import React from 'react';
import PropTypes from 'prop-types';
import loader from '../../assets/img/loader.svg';
import './index.scss';

const Loader = ({ fullLoader }) => (
  <div className={`loader-wrap ${fullLoader ? 'full-loader' : 'inner-loader'}`}>

    <div className="loader-block">
      <img src={loader} alt="loader" />
    </div>
  </div>
);
Loader.propTypes = { fullLoader: PropTypes.func.isRequired };

export default Loader;
