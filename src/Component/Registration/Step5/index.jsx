import React from 'react';
import { Form } from 'react-bootstrap';
import '../index.css';
import PropTypes from 'prop-types';

const Step5Component = (props) => {
  const { error, handleChange } = props;
  // eslint-disable-next-line react/destructuring-assignment
  const { password, name } = props.infoData;
  return (

    <Form className="resgistration-form">
      <div className="form-header">
        <h2 className="form-title">
          <span>Crear cuenta</span>
        </h2>
      </div>
      <Form.Group controlId="formBasicNumber">
        <Form.Label>Nombre del titular</Form.Label>
        <Form.Control
          type="text"
          placeholder="Name"
          name="name"
          readOnly
          value={name}
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          readOnly
        />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          name="password"
          className={error && error.password ? 'is-invalid' : ''}
          value={password}
          onChange={handleChange}
        />
        {error && error.password ? (
          <span className="error-text">{error.password}</span>
        ) : null}
      </Form.Group>
      {/* <Form.Group controlId="formBasicEmail">
        <Form.Label>Confirmar contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          name="confirmPassword"
          className={error && error.password ? 'is-invalid' : ''}
          value={confirmPassword}
          onChange={handleChange}
        />
        {error && error.password ? (
          <span className="error-text">{error.password}</span>
        ) : null}
      </Form.Group> */}
    </Form>

  );
};

Step5Component.propTypes = {
  infoData: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.number.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
  }).isRequired,
  error: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Step5Component;
