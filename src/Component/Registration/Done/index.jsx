import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import email from '../../../assets/img/done.png';
import '../index.css';

const Done = (props) => {
  const { infoData } = props;
  useEffect(() => {
    const contactData = JSON.parse(localStorage.getItem('contactData'));
    const { number } = infoData;
    // eslint-disable-next-line
    delete props.infoData.expYear;
    // eslint-disable-next-line
    delete props.infoData.expMonth;
    // eslint-disable-next-line
    delete props.infoData.numValue;

    const data = {
      userData: { ...props.infoData, number },
      contactData: { contactData },
    };
    localStorage.setItem('data', JSON.stringify(data));
    // eslint-disable-next-line
  }, []);
  return (
    <div className="email-section">
      <h2 className="email-title">Bienvenido</h2>
      <h6 className="email-sub-title">Su subscripción ha sido exitosa y sus datos se ingresaron correctamente.</h6>
      <div className="email-img">
        <img src={email} alt="email" />
      </div>
    </div>
  );
};

Done.propTypes = {
  infoData: PropTypes.shape({
    numValue: PropTypes.number.isRequired,
    expMonth: PropTypes.number.isRequired,
    expYear: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
  }).isRequired,
};
export default Done;
