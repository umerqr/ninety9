/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from '@material-ui/core';
import AppLabel from '../../AppLabel';
import './styles.css';
import visa from '../../../assets/img/visa.svg';
import mastercard from '../../../assets/img/mastercard.svg';
import editPen from '../../../assets/img/editPen.svg';

function PaymentCard({
  // index,
  active,
  visaCard,
  cardNumber,
  fullName,
  expirey,
  switchOne,
  switchTwo,
  handleChange,
  handleOpenModal,
}) {
  return (
    <>
      <div className={active ? 'payment-card-container-active col-5' : 'payment-card-container-inactive col-5'}>
        <div className="payment-card-inner-container">
          <div className="d-flex justify-content-between">

            {visaCard === true ? (
              <img className="visa-styling" src={visa} alt="" />
            )
              : (
                <img src={mastercard} className="visa-styling" alt="" />
              )}
            <img
              src={editPen}
              onClick={() => handleOpenModal('edit')}
              alt=""
              className="pencil-icon-styling"
            />
          </div>
          <div className="payment-card-engagement-container">
            <AppLabel label="Nombre Completo" className="payment-card-plan-heading" />
            <AppLabel label={fullName} className="payment-card-number" />
          </div>
          <div className="payment-card-plan-container">
            <div className="payment-card-engagement-container">
              <AppLabel label="Número de la tarjeta" className="payment-card-plan-heading" />
              <AppLabel label={cardNumber} className="payment-card-number" />
            </div>
            <div className="payment-card-success-container">
              <AppLabel label="Vence" className="payment-card-number" />
              <AppLabel label={expirey} className="payment-card-plan-price" />
            </div>
          </div>
          <div className="payment-card-plan-container-switch">
            {active
              ? (
                <Switch
                  checked={switchOne}
                  onChange={handleChange}
                  color="primary"
                  name="checkedB"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              )
              : (
                <Switch
                  checked={switchTwo}
                  onChange={handleChange}
                  color="primary"
                  name="checkedB"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              )}
          </div>
        </div>
      </div>
    </>

  );
}
PaymentCard.defaultProps = {
  active: false,
  // index: false,
  handleChange: false,
  fullName: false,
  handleOpenModal: false,
  visaCard: false,
  cardNumber: false,
  expirey: false,
  switchOne: false,
  switchTwo: false,
};
PaymentCard.propTypes = {
  active: PropTypes.any,
  // index: PropTypes.number,
  handleOpenModal: PropTypes.func,
  visaCard: PropTypes.any,
  cardNumber: PropTypes.any,
  fullName: PropTypes.any,
  expirey: PropTypes.any,
  switchOne: PropTypes.any,
  switchTwo: PropTypes.any,
  handleChange: PropTypes.any,

};

export default PaymentCard;
