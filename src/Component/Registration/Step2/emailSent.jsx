import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import email from '../../../assets/img/emailVerification.svg';
import '../index.css';
import EmailVerification from './emailVerification';

const EmailSent = (props) => {
  const [isSubmit, setisSubmit] = React.useState(false);

  const { handleStepper } = props;
  return (
    <>
      {!isSubmit ? (
        <>
          <div className="email-section">
            <h2 className="email-title">Confirme su correo</h2>
            <h6 className="email-sub-title">Hemos enviado un mensaje con un código a su correo para activar su cuenta.</h6>
            <p className="email-msg-text">
              ¿Tiene problemas con el correo?
              {' '}
              <span>Enviar de nuevo</span>
            </p>
            <div className="email-img">
              <img src={email} alt="email" />
            </div>
            <p className="thankyou-text">¿Ya recibió el correo con el código?</p>
            <Button
              variant="link"
              className="btn-theme"
              onClick={() => setisSubmit(true)}
            >
              Ingresar código
            </Button>
          </div>
        </>
      ) : (
        <EmailVerification handleStepper={() => handleStepper('email')} />
      )}
    </>
  );
};

EmailSent.propTypes = { handleStepper: PropTypes.func.isRequired };

export default EmailSent;
