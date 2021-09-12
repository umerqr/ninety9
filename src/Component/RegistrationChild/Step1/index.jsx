import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import MaskedInput from 'react-maskedinput';
import CountryWithCode from '../../../Common/CountryWithCode.json';
import '../index.css';

const Step1Component = (props) => {
  const { handleSelectChange, error, handleChange, infoData } = props;
  const { country, numValue, name } = infoData;
  return (
    <Form className="resgistration-form">
      <div className="form-header">
        <h2 className="form-title">
          <span>Beneficiario</span>
        </h2>
        {/* <p className='form-subtitle'>This is Sub Registration form</p> */}
      </div>
      <Form.Group controlId="formBasicNumber">
        <Form.Label>Tipo de identificación</Form.Label>
        <Form.Control
          as="select"
          value={country}
          name="country"
          onChange={handleSelectChange}
        >
          {CountryWithCode.map((list, i) => (
            <option value={list.name} key={i}>
              {list.name}
              {' '}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formBasicNumber">
        <Form.Label>Número de identificación</Form.Label>
        <MaskedInput
          mask="1-1111-1111"
          name="numValue"
          placeholder="0-0000-0000"
          size="9"
          value={numValue}
          className={
            error && error.numValue ? 'form-control is-invalid' : 'form-control'
          }
          onChange={handleChange}
        />
        {error && error.numValue ? (
          <span className="error-text">{error.numValue}</span>
        ) : null}
      </Form.Group>

      {numValue.replace(/-/g, '').replace(/_/g, '').length > 0 &&
      !error.numValue ? (
        <Form.Group controlId="formBasicNumber">
          <Form.Label>Número de identificación</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            name="name"
            // readOnly
            value={name}
            onChange={handleChange}
          />
        </Form.Group>
        ) : null}
    </Form>
  );
};

Step1Component.propTypes = {
  infoData: PropTypes.shape({
    numValue: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  handleSelectChange: PropTypes.func.isRequired,
  error: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Step1Component;
