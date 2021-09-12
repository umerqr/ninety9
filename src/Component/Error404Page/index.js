import React from 'react';
// import PropTypes from 'prop-types';
import './styles.css';
import { Link } from 'react-router-dom';
import error404 from '../../assets/img/error404.svg';
import Header from '../Layout/header';
import AppLabel from '../AppLabel';
import AppButton from '../AppButton';

function Error404Page() {
  return (
    <div>
      <Header />
      <AppLabel label="Página no encontrada" className="error-heading" />
      <AppLabel
        label="Es posible que hayas ingresado al enlace incorrecto o esta página fue eliminada. "
        className="error-sub-heading"
      />
      <img src={error404} alt="." className="error-img" />
      <div className="error-btn">

        <Link to="/">
          <AppButton label="Ir a Salud 360" />
        </Link>
      </div>
    </div>
  );
}

Error404Page.propTypes = {};

export default Error404Page;
