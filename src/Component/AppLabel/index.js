import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';

function AppLabel({ className, label }) {
  return (
    <Typography
      className={className}
    >
      {label}
    </Typography>
  );
}

AppLabel.defaultProps = { className: false };
AppLabel.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  label: PropTypes.string.isRequired,
};

export default AppLabel;
