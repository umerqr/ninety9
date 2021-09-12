import React, { useState } from 'react';
import { Container, Button, Form, FormControl } from 'react-bootstrap';
import Header from '../Layout/header';
import Style from './index.css';
import { isValidEmail } from '../../helper';
import EmailVerification from './emailVerification';

const ForgotPassword = () => {
  const mockData = { mail: 'abc@gmail.com', password: '1234' };
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);
  const [errorMail, setErrorMail] = useState(false);
  const [submit, setSubmit] = useState(false);

  function handleInputChange(e) {
    setInputValue(e.target.value);
    if (isValidEmail(e.target.value)) {
      setErrorMail(false);
    } else {
      setErrorMail(true);
    }
  }

  function validateUser() {
    let flag = 0;
    if (mockData.mail === inputValue) {
      flag = 1;
    }
    if (flag === 1) {
      setError(false);
      setSubmit(true);
    } else {
      setError(true);
    //   alert("mail not exist");
    }
  }

  return (
    <>
      <Header />
      <section className={Style['form-section']}>
        {!submit && (
          <Container className="forgot-password-container">
            <div className="form-header">
              <h1 className="main-title">¿Olvidó su contraseña?</h1>
              <p className="sub-title">
                Ingrese su correo y se le enviará un código para recuperar su
                contraseña.
              </p>
            </div>
            <div className="input-container">
              <Form>
                <Form.Group>
                  <Form.Label className="input-title">
                    Correo electrónico
                  </Form.Label>
                  <FormControl
                    autoFocus
                    type="email"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="forgot-password-input"
                    required
                  />
                  {errorMail ? (
                    <span className="error-text">
                      Correo electrónico no válido.
                    </span>
                  ) : null}
                  {error ? (
                    <span className="error-text">
                      Formato inválido de correo.
                    </span>
                  ) : null}
                </Form.Group>
              </Form>
            </div>
            <div className="forgot-password-footer">
              <div>
                {/* <span className="forgot-password-button-text">
                  Iniciar sesión
                </span> */}
                <Button className="btn-theme mb-2" onClick={validateUser}>Iniciar sesión</Button>
              </div>
            </div>
          </Container>
        )}
        {submit && <EmailVerification />}
      </section>
    </>
  );
};

export default ForgotPassword;
