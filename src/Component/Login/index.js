/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import { FormControl, Container, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Header from '../Layout/header';
import Style from './index.css';
import { isValidEmail } from '../../helper';

const Login = (props) => {
  const { infoData } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);
  const [errorMail, setErrorMail] = useState(false);

  const history = useHistory();
  const mockData = { mail: infoData.email, password: infoData.password };
  const adminMockData = { mail: 'admin@gmail.com', password: 'admin' };
  function onChange(e) {
    setChecked(e.target.checked);
  }

  useEffect(() => {
    window.localStorage.removeItem('loggedInEmail');
    if (localStorage.checkbox && localStorage.email !== '') {
      setChecked(true);
      setEmail(localStorage.username);
      setPassword(localStorage.password);
    } else {
      setChecked(false);
    }
  }, []);

  function validateUser() {
    let flag = 0;
    if (mockData.mail === email && mockData.password === password) {
      flag = 1;
    } else if (adminMockData.mail === email && adminMockData.password === password) {
      flag = 2;
    }
    if (checked && flag === 1) {
      localStorage.username = email;
      localStorage.password = password;
      localStorage.checkbox = true;
    }
    if (!checked && flag === 1) {
      localStorage.username = '';
      localStorage.password = '';
      localStorage.checkbox = false;
    }
    if (flag === 1) {
      alert('login success');
      history.push('./dashboard');
    } else if (flag === 2) {
      alert('admin logged in');
      window.localStorage.setItem('loggedInEmail', email);
      history.push('./dashboard');
    } else {
      setError(true);
      alert('wrong details');
    }
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
    if (isValidEmail(e.target.value)) {
      setErrorMail(false);
    } else {
      setErrorMail(true);
    }
  }

  return (
    <>
      <Header />
      <section className={Style['form-section']}>
        <Container className="login-container">
          <Form className={Style['resgistration-form']}>
            <div className="form-header">
              <h1 className="main-title">Inicio de sesión</h1>
              <p className="sub-title">
                Ingrese sus datos para iniciar sesión.
              </p>
            </div>
            <Form.Group controlId="formBasicEmail">
              <div>
                <Form.Label>Correo electrónico</Form.Label>
                <FormControl
                  autoFocus
                  type="email"
                  required
                  onChange={handleEmailChange}
                  value={email}
                />
              </div>
              {errorMail ? (
                <span className="error-text">
                  Correo electrónico no válido.
                </span>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <div className="input-group-custom">
                <div className="input-group-country">
                  <Form.Label>Contraseña</Form.Label>
                  <FormControl
                    autoFocus
                    type="password"
                    placeholder=""
                    name="password"
                    onChange={handlePasswordChange}
                    required
                    value={password}
                  />
                </div>
              </div>
              {error ? (
                <span className="error-text">
                  La contraseña es incorrecta. Inténtelo de nuevo.
                </span>
              ) : null}
            </Form.Group>

            <div className={error ? 'login-footer-error' : 'login-footer'}>
              <div
                className="forgot-password"
                onClick={() => history.push('/ForgotPassword')}
              >
                ¿Olvidó su contraseña?
              </div>
              <div className="remember-password">
                <Checkbox onChange={onChange} checked={checked}>
                  <span className="remenber-text">Recordarme</span>
                </Checkbox>
              </div>
            </div>
            <div className="d-flex align-items-end flex-column">
              {/* <span className="login-button-text">Iniciar sesión</span> */}
              <Button className="btn-theme mb-2" onClick={validateUser}>Iniciar sesión </Button>
            </div>
          </Form>
        </Container>
      </section>
    </>
  );
};

Login.propTypes = {
  infoData: PropTypes.shape({
    country: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    contact: PropTypes.number.isRequired,
  }).isRequired,
};

export default Login;
