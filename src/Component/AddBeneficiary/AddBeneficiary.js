/* eslint-disable react/require-default-props */
/**
 *
 * ConfirmationModal
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { Form } from 'react-bootstrap';
import MaskedInput from 'react-maskedinput';
import { Checkbox } from '@material-ui/core';
import { notification } from 'antd';
import AppModal from '../AppModal/AppModal';
import AppButton from '../AppButton';
import AppLabel from '../AppLabel';
import identificationOptions from '../../Common/identificationOptions.json';
import AppTextField from '../AppTextField';
import { isValidEmail } from '../../helper';
import CountryWithCode from '../../Common/CountryWithCode.json';
// import styled from 'styled-components';

const beneficiaryMockData = [
  {
    email: 'avalenciano@example.co',
    phone: '88594671',
    name: 'Alexis González Valenciano',
    id: '1-2345-6788',
  },
  {
    email: 'anna@example.co',
    phone: '32232112123',
    name: 'Anna Lilac Vodka',
    id: '1-2345-6789',
  },
  {
    email: 'shani@example.co',
    phone: '211211234',
    name: 'Alexis González Valenciano',
    id: '1-1264-0362',
  },
];
function ConfirmationModal({
  handleCloseModal,
  openConfirmationModal,
  // handleConfirmation,
  infoData,
  setinfoData,
}) {
  const [error, setError] = React.useState({ numValue: '' });
  const { country, numValue } = infoData;
  const [email, setEmail] = useState('');
  const [errorMail, setErrorMail] = useState(false);
  const [clientName, setClientName] = useState('');
  const [contact, setContact] = useState('');
  const [errorContact, setErrorContact] = useState('');
  const [utilize, setUtilize] = useState(false);
  const data = CountryWithCode.filter((county) => county.name === country)[0];
  let temp;
  const openNotification = (type, msg) => {
    notification[type]({
      message: msg,
      className: type === 'error' ? 'notification-class-error' : 'notification-class-success',
    });
  };
  if (data) {
    temp = `${data.code} ${data.dial_code}`;
  }
  const handleContactChange = (incomingValue, stateToUpdate) => {
    stateToUpdate(incomingValue);
    // eslint-disable-next-line no-restricted-globals
    if (incomingValue && isNaN(incomingValue)) {
      setErrorContact('Enter valid contact number');
    } else if (incomingValue && incomingValue.length < 9) {
      setErrorContact('Número telefónico no válido');
    } else if (incomingValue && incomingValue.length > 14) {
      setErrorContact('Contact must be equal to than 8 numbers');
    } else {
      setErrorContact('');
    }
  };
  function handleEmailChange(incomingValue, stateToUpdate) {
    stateToUpdate(incomingValue);
    if (isValidEmail(incomingValue)) {
      setErrorMail(false);
    } else {
      setErrorMail(true);
    }
  }
  const handleSelectChange = (event) => {
    const { target: { name, value } } = event;
    setinfoData({
      ...infoData,
      [name]: value,
    });
  };
  const handleChange = (event) => {
    const { target: { name, value } } = event;

    if (
      name === 'numValue' &&
      value.replace(/-/g, '').replace(/_/g, '').length < 9
    ) {
      setError({
        ...error,
        numValue: 'Verificar número de cédula.',
      });
    } else {
      setError({
        ...error,
        numValue: '',
      });
    }
    setinfoData({
      ...infoData,
      [name]: value,
    });
  };
  useEffect(() => {
    if (!error.numValue && numValue !== '') {
      const findBeneficary = beneficiaryMockData.find((x) => numValue === x.id);
      if (findBeneficary) {
        setEmail(findBeneficary.email);
        setContact(findBeneficary.phone);
        setClientName(findBeneficary.name);
      }
    }
    // eslint-disable-next-line
  }, [numValue]);
  const handleAddForm = () => {
    if (email && numValue && clientName && contact) {
      openNotification('success', 'Se ha agregado un nuevo beneficiario exitosamente!');
      setEmail('');
      setClientName('');
      setContact('');
      setUtilize(false);
      setinfoData({
        ...infoData,
        numValue: '',
      });
      return handleCloseModal();
    }
    if (email === '' &&
      contact === '') {
      setErrorMail(true);
      setErrorContact(true);
    }
    return null;
  };
  return (
    <AppModal
      modalOpen={openConfirmationModal}
      childClassName="add-beneficiary-modal"
      handleClose={handleCloseModal}
      label="Agregar Beneficiario"
      mainHeadingClassName="add-beneficiary-main-label"
    >
      <div className="add-beneficiary-sub-heading padding-left">
        <AppLabel label="Ingrese los datos que se le indican para agregar el beneficiario a su plan." />
      </div>
      <div className="d-flex col-12">
        <div className="col-6">

          <AppLabel className="add-beneficiary-main-label" label="Beneficiario" />
          <div className="add-beneficiary-second-sub-heading">
            <AppLabel label="Datos obtenidos del Registro Civil de Costa Rica, verifique que sean correctos." />
          </div>
          <div className="add-beneficary-country-field">
            <AppLabel label="Tipo de identificación" />
            <Form.Control
              as="select"
              value={country}
              name="country"
              onChange={handleSelectChange}
              className="identification-select-styling"
            >
              {identificationOptions.map((list, i) => (
                <option value={list.name} key={i}>
                  {list.name}
                </option>
              ))}
            </Form.Control>
          </div>
          <div className="">
            <AppLabel label="Número de identificación" />
            <MaskedInput
              mask="1-1111-1111"
              name="numValue"
              placeholder="0-0000-0000"
              size="9"
              value={numValue}
              className={(() => {
                if (error && error.numValue) {
                  return 'identification-select-styling form-control is-invalid';
                }
                if (!error.numValue && numValue !== '') {
                  return 'identification-select-styling form-control validated';
                }
                return 'identification-select-styling form-control';
              })()}
              onChange={handleChange}
            />
            {error && error.numValue ? (
              <span className="error-text">{error.numValue}</span>
            ) : null}
          </div>
          { clientName !== '' && (
            <>
              <div className="add-beneficiary-email-input-field">
                <AppTextField
                  label="Nombre del beneficiario"
                  type="name"
                  required
                  className={(() => {
                    if (clientName !== '') {
                      return 'form-control validated';
                    }
                    return 'form-control';
                  })()}
                  value={clientName}
                  stateToUpdate={setClientName}
                />
              </div>
              <div className="d-flex align-items-center">
                <Checkbox
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                  value={utilize}
                  onChange={() => setUtilize(!utilize)}
                />
                <AppLabel label="Utilizar datos de contacto del titular" />
              </div>
              <AppLabel
                className="hint-text-bottom"
                label="Marque esta casilla en caso de que el beneficiario sea menor de edad o adulto mayor."
              />
            </>
          )}
        </div>
        <div className="col-6">
          {!utilize && (
          <>
            <AppLabel className="add-beneficiary-main-label" label="Información de Contacto" />
            <div className="add-beneficiary-email-input-field">
              <AppTextField
                label="Correo electrónico"
                type="email"
                required
                className={(() => {
                  if (errorMail) {
                    return 'form-control is-invalid';
                  }
                  if (!errorMail && email !== '') {
                    return 'form-control validated';
                  }
                  return 'form-control';
                })()}
                value={email}
                stateToUpdate={setEmail}
                onChange={handleEmailChange}
                error={errorMail}
                errorMessage="Correo electrónico no válido."
                errorClassName="error-text"
              />
            </div>
            <div className="flex-column">
              <div className="d-flex">
                <div className="add-beneficiary-input-group-custom-code flex-column">
                  <AppLabel label="Código país" />
                  <div className="append-custom-input-code">
                    {temp}
                  </div>
                </div>
                <AppTextField
                  label="Teléfono"
                  type="text"
                  name="contact"
                  mainDivClassName="add-beneficiary-contact-input-field"
                  className={(() => {
                    if (errorContact) {
                      return 'form-control is-invalid';
                    }
                    if (!errorContact && contact !== '') {
                      return 'form-control validated';
                    }
                    return 'form-control';
                  })()}
                  value={contact}
                  stateToUpdate={setContact}
                  onChange={handleContactChange}
                  error={errorContact}
                  errorMessage={errorContact}
                  errorClassName="error-text"
                />

              </div>
            </div>
          </>
          )}
          <div className="add-beneficiary-modal-flex-div ">
            <AppButton onClick={() => handleAddForm('addSuccess')} label="Guardar" />
          </div>
        </div>
      </div>

    </AppModal>
  );
}

ConfirmationModal.propTypes = {
  handleCloseModal: PropTypes.func,
  // handleConfirmation: PropTypes.func,
  openConfirmationModal: PropTypes.bool,
  setinfoData: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  infoData: PropTypes.object,
};

export default memo(ConfirmationModal);
