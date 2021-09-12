import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import CountryWithCode from '../../../Common/CountryWithCode.json';

const Step2Component = (props) => {
  const { infoData, handleChange, error } = props;
  const { email, contact, country } = infoData;
  const data = CountryWithCode.filter((county) => county.name === country)[0];
  let temp;
  if (data.name) {
    temp = `${data.code} ${data.dial_code}`;
  }
  return (

    <Form className="resgistration-form">
      <div className="form-header">
        <h2 className="form-title"><span>Información de Contacto</span></h2>
      </div>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control
          type="email"
          placeholder="example@example.com"
          name="email"
          className={error && error.email ? 'is-invalid' : ''}
          value={email}
          onChange={handleChange}
        />
        {error && error.email ? (
          <span className="error-text">{error.email}</span>
        ) : null}
      </Form.Group>
      <Form.Group>
        <div className="input-group-custom">
          <div className="input-group-code">
            <Form.Label>Código país</Form.Label>
            <div className="append-custom-input">
              {temp}
            </div>
          </div>
          <div className="input-group-country">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              id="basic-url"
              aria-describedby="basic-addon3"
              type="text"
              placeholder="2222 2222"
              name="contact"
              className={error && error.contact ? 'is-invalid' : ''}
              value={contact}
              onChange={handleChange}
            />
          </div>
        </div>

        {error && error.contact ? (
          <span className="error-text">{error.contact}</span>
        ) : null}
      </Form.Group>
    </Form>

  );
};

Step2Component.propTypes = {
  infoData: PropTypes.shape({
    country: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    contact: PropTypes.number.isRequired,
  }).isRequired,
  error: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Step2Component;
