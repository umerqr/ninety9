/* eslint-disable react/require-default-props */
/**
 *
 * ConfirmationModal
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { Form } from 'react-bootstrap';
import MaskedInput from 'react-text-mask';
import { notification } from 'antd';
import * as classnames from 'classnames';
import AppModal from '../AppModal/AppModal';
import AppButton from '../AppButton';
import AppLabel from '../AppLabel';
import AppTextField from '../AppTextField';
// import styled from 'styled-components';

function EditCardForm({
  handleCloseModal,
  openConfirmationModal,
  // handleConfirmation,
  infoData,
  setinfoData,
}) {
  const { cardNumber, cvv, expireDate } = infoData;
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState({
    numValue: '',
    email: '',
    contact: '',
    expireYearError: '',
    expireMonthError: '',
    password: '',
  });
  const openNotification = (type, msg) => {
    notification[type]({
      message: msg,
      className: type === 'error' ? 'notification-class-error' : 'notification-class-success',
    });
  };
  const handleChange = (event) => {
    const { target: { name, value } } = event;
    setinfoData({
      ...infoData,
      [name]: value,
    });
    if (name === 'cardNumber' || name === 'cvv' || name === 'expireDate') {
      setError({
        ...error,
        cardNumber: '',
        cvv: '',
        expireDate: '',
      });
    }
  };

  const handleAddForm = () => {
    if (cardNumber && cvv && fullName && expireDate) {
      openNotification('success', 'Su nuevo método de pago ha sido agregado correctamente.');
      setinfoData({
        ...infoData,
        numValue: '',
      });
      return handleCloseModal();
    }

    return null;
  };
  const handleExpireDate = (event) => {
    const { target: { value } } = event;
    const expireDated = value.split('/');
    setinfoData({
      ...infoData,
      expireDate: value,
      expMonth: expireDated[0],
      expYear: expireDated[1],
    });
    setError({
      ...error,
      expireMonthError: null,
      expireYearError: null,
      cardNumber: '',
      cvv: '',
      expireDate: '',
    });
  };
  return (
    <AppModal
      modalOpen={openConfirmationModal}
      childClassName="edit-card-modal"
      handleClose={handleCloseModal}
      label="Agregar Método de Pago"
      mainHeadingClassName="edit-card-main-label col"
    >
      <div className="edit-card-sub-heading">
        <AppLabel label="Ingrese los datos que se indican a continuación." />
      </div>
      <AppTextField
        label="Nombre completo"
        mainDivClassName="edit-form-input-field"
        value={fullName}
        className={
                  (() => {
                    if (fullName !== '') {
                      return 'form-control validated';
                    }
                    return 'form-control';
                  })()
                }
        stateToUpdate={setFullName}
      />
      <div className="edit-form-input-field">
        <Form.Label>Número de tarjeta</Form.Label>
        <MaskedInput
          id="basic-url"
          aria-describedby="basic-addon3"
          mask={[
            /[0-9]/,
            /\d/,
            /\d/,
            /\d/,
            ' ',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            ' ',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            ' ',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
          ]}
          className={classnames('form-control is-visa', { 'is-invalid': error.cardNumber })}
          placeholder="Enter card number"
          value={cardNumber}
          name="cardNumber"
          onChange={handleChange}
        />
        {error.cardNumber ? (
          <span className="error-text">
            {error.cardNumber}
            {' '}
          </span>
        ) : null}
      </div>
      <div className="d-flex">
        <div className="expire-date-styling">
          <Form.Label> Fecha de expiración </Form.Label>
          <MaskedInput
            mask={[/[0-9]/, /\d/, '/', /\d/, /\d/]}
            className={classnames('form-control', {
              'is-invalid':
                    error.expireDate || error.expireYearError || error.expireMonthError,
            })}
            placeholder="mm/aa"
            id="expireDate"
            name="expireDate"
            value={expireDate}
            onChange={handleExpireDate}
          />
          {error.expireDate ? (
            <span className="error-text">
              {error.expireDate}
              {' '}
            </span>
          ) : null}
          {error.expireYearError ? (
            <span className="error-text">
              {error.expireYearError}
              {' '}
            </span>
          ) : null}
          {error.expireMonthError ? (
            <span className="error-text">
              {error.expireMonthError}
              {' '}
            </span>
          ) : null}

        </div>
        <div className="cvv-field-styling">

          <Form.Label htmlFor="cvv">
            {' '}
            CVV
            <span className="info-img">
              {/* <img src={infoicon} alt="info icon" /> */}
            </span>
          </Form.Label>
          <div className="input-block">
            <MaskedInput
              mask={[/[0-9]/, /\d/, /\d/]}
              className={classnames('form-control', { 'is-invalid': error.cvv })}
              placeholder="Enter CVV"
              id="cvv"
              name="cvv"
              value={cvv}
              onChange={handleChange}
            />

            {error && error.cvv ? (
              <span className="error-text">
                {error.cvv}
                {' '}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="edit-card-modal-flex-div ">
        <AppButton name="editCard" onClick={() => handleAddForm('addSuccess')} label="Guardar tarjeta" />
      </div>

    </AppModal>
  );
}

EditCardForm.propTypes = {
  handleCloseModal: PropTypes.func,
  // handleConfirmation: PropTypes.func,
  openConfirmationModal: PropTypes.bool,
  setinfoData: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  infoData: PropTypes.object,
};

export default memo(EditCardForm);
