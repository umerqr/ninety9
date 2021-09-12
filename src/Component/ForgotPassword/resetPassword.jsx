import React, { useState } from 'react';
import { Container, Button, Form, FormControl } from 'react-bootstrap';
// import Header from '../Layout/header';
import Style from './index.css';
import { isValidPassword } from '../../helper';

const ResetPassword = () => {
//   const mockData = { mail: "abc@gmail.com", password: "1234" };
//   const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    if (isValidPassword(e.target.value)) {
      setErrorPassword(false);
    } else {
      setErrorPassword(true);
    }
  }

  function handleConfirmPasswordChange(e) {
    setConfirmPassword(e.target.value);
    if (password === confirmPassword) {
      setError(false);
    } else {
      setError(true);
    }
  }

  function validateUser() {
    if (password === confirmPassword) {
      setError(false);
      alert('success reset password');
    } else {
      setError(true);
    }
  }

  return (
    <>
      <section className={Style['form-section']}>
        <Container className="confirm-password-container">
          <div className="form-header">
            <h1 className="main-title">Restablecer contraseña</h1>
            <p className="sub-title">Ingrese su nueva contraseña.</p>
          </div>
          <div className="input-container">
            <Form className="form-container">
              <Form.Group className="input-case">
                <Form.Label className="input-title">Contraseña</Form.Label>
                <FormControl
                  autoFocus
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="forgot-password-input"
                  required
                />
                {errorPassword ? (
                  <span className="error-text">
                    Utilice 8 o más caracteres con una combinación de
                    minúsculas, mayúsculas y números.
                  </span>
                ) : null}
                <Form.Label
                  className={
                    errorPassword ? 'input-title-error' : 'input-title'
                  }
                >
                  Confirmar contraseña
                </Form.Label>
                <FormControl
                  autoFocus
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="forgot-password-input"
                  required
                />
                {error ? (
                  <span className="error-text">Las contraseñas no coinciden.</span>
                ) : null}
              </Form.Group>
            </Form>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <div className="btn-confirm">
              <Button
                variant="link"
                className="btn-theme"
                onClick={validateUser}
              >
                Restablecer contraseña
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ResetPassword;
