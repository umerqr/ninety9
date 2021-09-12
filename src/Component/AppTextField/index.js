/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';
import AppLabel from '../AppLabel';

const AppTextField = ({
  type, name, value, stateToUpdate, label,
  className, onChange, mainDivClassName, required,
  errorMessage, error, errorClassName, helperMesg,
  showHelper, autofocus, placeholder,
}) => {
  const handleChangeFields = (incomingValue, incomingStateToUpdate) => {
    if (onChange) {
      onChange(incomingValue, stateToUpdate);
    } else {
      incomingStateToUpdate(incomingValue);
    }
  };
  return (
    <div className={mainDivClassName}>
      <AppLabel className="label-heading" label={label} />
      <FormControl
        autoFocus={autofocus}
        className={className}
        type={type}
        name={name}
        required={required}
        onChange={(e) => handleChangeFields(e.target.value, stateToUpdate)}
        value={value}
        placeholder={placeholder}
      />

      {error ? (
        <span className={errorClassName}>
          {errorMessage}
        </span>
      ) : null}
      { showHelper && !error && (
      <span>
        {helperMesg}
      </span>
      )}
    </div>
  );
};

AppTextField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any.isRequired,
  stateToUpdate: PropTypes.func,
  onChange: PropTypes.func,
  className: PropTypes.string,
  name: PropTypes.string,
  mainDivClassName: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  errorClassName: PropTypes.string,
  errorMessage: PropTypes.string,
  helperMesg: PropTypes.string,
  showHelper: PropTypes.bool,
  autofocus: PropTypes.bool,
  placeholder: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
};

export default AppTextField;
