/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { Avatar, Badge, Tooltip, withStyles } from '@material-ui/core';
import { notification } from 'antd';
// import MuiAlert from '@material-ui/lab/Alert';
import { Form } from 'react-bootstrap';
import MaskedInput from 'react-maskedinput';
import SaveIcon from '@material-ui/icons/Save';
import { isValidEmail, isValidPasswordNew } from '../../../helper';
import CountryWithCode from '../../../Common/CountryWithCode.json';
import './styles.css';
import AppButton from '../../AppButton';
import identificationOptions from '../../../Common/identificationOptions.json';
import editPen from '../../../assets/img/editPen.svg';

const AppLabel = React.lazy(() => import('../../AppLabel'));
const AppTextField = React.lazy(() => import('../../AppTextField'));

function Profile({ infoData, visible, clientsComp, setinfoData }) {
  const { country, numValue, identificationType } = infoData;
  const [email, setEmail] = useState(infoData.email);
  const [editMode, setEditMode] = useState(false);
  const [contact, setContact] = useState(infoData.contact);
  const [profilePassword, setProfilePassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [titleTextField, setTitleTextField] = useState(infoData.name);
  const [errorMail, setErrorMail] = useState(false);
  const [showHelper, setShowHelper] = useState(true);
  const [confirmationError, setConfirmationError] = useState(false);
  const [errorContact, setErrorContact] = useState('');
  const [errorPassword, setErrorPassword] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState({ numValue: '' });
  const openNotification = (type, msg) => {
    notification[type]({
      message: msg,
      className: type === 'error' ? 'notification-class-error' : 'notification-class-success',
    });
  };
  const data = CountryWithCode.filter((county) => county.name === country)[0];
  let temp;
  if (data.name) {
    temp = `${data.code} ${data.dial_code}`;
  }
  useEffect(() => {
    setTitleTextField(infoData.name);
    setContact(infoData.contact);
    setEmail(infoData.email);
  }, [
    infoData,
  ]);
  useEffect(() => {
    if (!clientsComp) {
      setEditMode(true);
    }
  }, [
    clientsComp,
  ]);

  function handleEmailChange(incomingValue, stateToUpdate) {
    stateToUpdate(incomingValue);
    if (isValidEmail(incomingValue)) {
      setErrorMail(false);
    } else {
      setErrorMail(true);
    }
  }

  function handlePasswordChange(incomingValue, stateToUpdate) {
    stateToUpdate(incomingValue);
    if (isValidPasswordNew(incomingValue)) {
      setErrorPassword(false);
      setShowHelper(false);
    } else if (incomingValue === '') {
      setErrorPassword(false);
      setConfirmationError(false);
      setShowHelper(true);
    } else {
      setErrorPassword(true);
    }
  }
  const handleConfirmPasswordChange = (incomingValue, stateToUpdate) => {
    stateToUpdate(incomingValue);
    if (isValidPasswordNew(incomingValue)) {
      setConfirmationError(false);
      setShowHelper(false);
    } else if (incomingValue === '') {
      setConfirmationError(false);
    } else {
      setConfirmationError(true);
    }
    if (incomingValue !== profilePassword) {
      setConfirmationError(true);
    }
  };
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
  const nameInitials = infoData.name.split(' ').map((n) => n[0]).join('');
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    // eslint-disable-next-line no-unused-vars
    const url = reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfilePic([reader.result]);
    };
    setProfilePic(event.target.files[0]);
  };
  const gaurderClicked = () => {
    if ((email &&
      contact &&
      profilePassword &&
      confirmPassword &&
      titleTextField)) {
      return openNotification('success', 'Su nueva contraseña ha sido cambiada correctamente. ');
    }
    if ((errorMail ||
      confirmationError ||
      errorContact ||
      errorPassword)) {
      return openNotification('error', 'Ha ocurrido un error, no se guardo la  nueva contraseña ¡Inténtelo de nuevo!');
    }
    return null;
  };
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
  const onSaveEditButtonClick = (type) => {
    setEditMode(!editMode);
    if (type === 'Save') {
      return openNotification('success', 'Su nueva contraseña ha sido cambiada correctamente. ');
    }
    return null;
  };
  const CustomToolTip = withStyles({
    tooltip: {
      color: '#787878',
      backgroundColor: '#FFF9F1',
      fontSize: 12,
      fontWeight: '600',
    },
  })(Tooltip);

  return (
    <>
      <div className={visible ? 'profile-main-container' : 'profile-main-container-closed'}>
        <AppLabel className="main-heading" label="Perfil" />
        {clientsComp && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div className="save-edit-div float-right" onClick={() => onSaveEditButtonClick(editMode ? 'Save' : 'Edit')}>
          { !editMode
            ? (
              <CustomToolTip placement="bottom" title="Editar">
                <img src={editPen} alt="" />
              </CustomToolTip>
            )
            : (
              <CustomToolTip placement="bottom" title="Guardar">
                <SaveIcon />
              </CustomToolTip>
            )}
        </div>
        )}
        <AppLabel className="sub-heading" label="Modifique los datos de perfil." />
        <div className="first-layer-container">
          <div className="avatar-styling-div">

            <Badge badgeContent={(
              <>
                {editMode && (
                <>
                  <input
                    accept="image/*"
                    className="picker-class"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="contained-button-file">
                    {/* <Fab component="span" className={classes.button}> */}
                    <AddAPhotoIcon className="camera-icon-styling" />
                  </label>
                </>
                )}
              </>
)}
            >
              {profilePic ? <Avatar className="avatar-styling-uploaded" src={profilePic} /> : <Avatar className="avatar-styling">{nameInitials}</Avatar> }

            </Badge>
          </div>
          <div className="inner-div-first">
            <div className={editMode ? 'd-flex sub-inner-div-first' : 'sub-inner-div-first'}>
              { editMode ? (
                <AppTextField
                  label="Nombre del titular"
                  mainDivClassName="name-input-field"
                  value={titleTextField}
                  className={
                  (() => {
                    if (titleTextField !== '') {
                      return 'form-control validated';
                    }
                    return 'form-control';
                  })()
                }
                  stateToUpdate={setTitleTextField}
                />
              ) : (
                <div className="clients-name-div">
                  <AppLabel className="clients-headings-styling" label="Nombre del titular" />
                  <AppLabel className="clients-sub-headings-styling" label={titleTextField} />
                </div>
              )}
              {editMode ? (
                <div className="email-input-field">
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
              ) : (
                <div className="clients-name-div">
                  <AppLabel className="clients-headings-styling" label="Correo electrónico" />
                  <AppLabel className="clients-sub-headings-styling" label={email} />
                </div>
              )}
            </div>
            <div className="second-layer d-flex">
              <div className="contact-column-styling flex-column">
                <div className="contact-input-field d-flex">
                  {editMode ? (
                    <>
                      <div className="input-group-custom-code flex-column">
                        <AppLabel label="Código país" />
                        <div className="append-custom-input-code">
                          {temp}
                        </div>
                      </div>
                      <AppTextField
                        label="Teléfono"
                        type="text"
                        name="contact"
                        mainDivClassName="contact-input-field-inner"
                        className={(() => {
                          if (errorContact) {
                            return 'form-control is-invalid';
                          }
                          if (!errorContact && contact !== '') {
                            return 'form-control validated';
                          }
                          return 'form-control';
                        })()}
                    // className={error && error.contact ? 'is-invalid' : ''}
                        value={contact}
                        stateToUpdate={setContact}
                        onChange={handleContactChange}
                        error={errorContact !== ''}
                        errorMessage={errorContact}
                        errorClassName="error-text"
                      />
                    </>
                  ) : (
                    <div className="clients-name-div">
                      <AppLabel className="clients-headings-styling" label="Teléfono" />
                      <AppLabel className="clients-sub-headings-styling" label={contact} />
                    </div>
                  )}
                  {/* </div> */}

                </div>
              </div>
              {!clientsComp && (
              <AppTextField
                label="Contraseña"
                type="password"
                placeholder=""
                name="password"
                onChange={handlePasswordChange}
                required
                className={(() => {
                  if (errorPassword) {
                    return 'form-control is-invalid';
                  }
                  if (!errorPassword && profilePassword !== '') {
                    return 'form-control validated';
                  }
                  return 'form-control';
                })()}
                mainDivClassName="password-input-field"
                value={profilePassword}
                stateToUpdate={setProfilePassword}
                error={errorPassword}
                errorMessage="Utilice 8 o más caracteres con una combinación de minúsculas, mayúsculas y números."
                errorClassName="error-text"
                showHelper={showHelper}
                helperMesg="Utilice 8 o más caracteres con una combinación de minúsculas, mayúsculas y números."
              />
              )}
            </div>
            {!clientsComp && (
            <div className="confirm-password-input-field">

              { profilePassword && (
              <AppTextField
                label="Confirmar contraseña"
                type="password"
                placeholder=""
                name="confirm password"
                onChange={handleConfirmPasswordChange}
                required
                className={(() => {
                  if (confirmationError) {
                    return 'form-control is-invalid';
                  }
                  if (!confirmationError && profilePassword === confirmPassword) {
                    return 'form-control validated';
                  }
                  return 'form-control';
                })()}
                // mainDivClassName="confirm-password-input-field"
                value={confirmPassword}
                stateToUpdate={setConfirmPassword}
                error={confirmationError}
                errorMessage={profilePassword !== confirmPassword && 'La contraseña no coincide.'}
                errorClassName="error-text"
              />
              )}
            </div>
            )}
            {!editMode && clientsComp ? (
              <>
                <div className="d-flex">
                  <AppLabel className="other-heading-styling" label="OTROS DETALLES" />
                  <div className="hr-styling" />
                </div>
                <div className="clients-name-div">

                  <AppLabel className="clients-headings-styling" label="Tipo de identificación" />
                  <AppLabel className="clients-sub-headings-styling" label={identificationType} />
                </div>
                <div className="clients-name-div">

                  <AppLabel className="clients-headings-styling" label="Número de identificación" />
                  <AppLabel className="clients-sub-headings-styling" label={numValue} />
                </div>
              </>
            ) : clientsComp && (
              <>
                <div className="d-flex">

                  <AppLabel className="other-heading-styling-editing" label="OTROS DETALLES" />
                  <div className="hr-styling" />
                </div>
                <div className="country-field">
                  <AppLabel label="Tipo de identificación" />
                  <Form.Control
                    as="select"
                    value={identificationType}
                    name="identificationType"
                    onChange={handleSelectChange}
                    className="client-identification-select-styling"
                  >
                    {identificationOptions.map((list, i) => (
                      <option value={list.name} key={i}>
                        {list.name}
                      </option>
                    ))}
                  </Form.Control>
                </div>
                <div className="country-field">
                  <AppLabel label="Número de identificación" />
                  <MaskedInput
                    mask="1-1111-1111"
                    name="numValue"
                    placeholder="0-0000-0000"
                    size="9"
                    value={numValue}
                    className={(() => {
                      if (error && error.numValue) {
                        return 'client-identification-select-styling form-control is-invalid';
                      }
                      if (!error.numValue && numValue !== '') {
                        return 'client-identification-select-styling form-control validated';
                      }
                      return 'client-identification-select-styling form-control';
                    })()}
                    onChange={handleChange}
                  />
                  {error && error.numValue ? (
                    <span className="error-text">{error.numValue}</span>
                  ) : null}
                </div>
              </>
            )}
            { editMode && !clientsComp && (
            <div className="btn-styling-save">
              <AppButton name="Guarder Button" label="Guardar" onClick={() => gaurderClicked()} />
            </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

Profile.defaultProps = { visible: false, clientsComp: false, setinfoData: false };
Profile.propTypes = {
  infoData: PropTypes.shape({
    country:
   PropTypes.string.isRequired,
    email:
   PropTypes.string.isRequired,
    name:
   PropTypes.string.isRequired,
    contact:
   PropTypes.string.isRequired,
    numValue:
   PropTypes.string.isRequired,
    identificationType: PropTypes.string,
  }).isRequired,
  visible: PropTypes.bool,
  clientsComp: PropTypes.bool,
  setinfoData: PropTypes.func,
};

export default Profile;
