import React from 'react';
import PropTypes from 'prop-types';
// import { Button } from 'react-bootstrap';
import './styles.css';
import { Button } from '@material-ui/core';

function AppButton(props) {
  const {
    name,
    className,
    onClick,
    disabled,
    label,
  } = props;
  return (

    <>
      <Button
        type="button"
        name={name}
        className={className || 'app-btn-theme'}
        onClick={onClick}
        disabled={disabled || false}
      >
        {label}
      </Button>
    </>
  );
}
AppButton.defaultProps = {
  onClick: false,
  name: false,
  className: false,
  disabled: false,
  label: false,
};
AppButton.propTypes = {
  name: PropTypes.string,
  className: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  onClick: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
    PropTypes.string,
  ]),
  disabled: PropTypes.bool,
  label: PropTypes.string,
};

export default AppButton;
