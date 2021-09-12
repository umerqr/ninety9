import React, { useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Stepper } from 'react-form-stepper';
import { useHistory } from 'react-router-dom';
import Header from '../Layout/header';
import Step2Component from './Step2';
import Step1Component from './Step1';
import './index.css';
import { isValidEmail } from '../../helper';
import Step3Component from './Step3';

const Child = () => {
  // state for active step
  const [steps, setcurrentStep] = React.useState(0);

  // state object to store user information
  const [infoData, setinfoData] = React.useState({
    numValue: '985476238',
    name: 'Joe Doe',
    email: '',
    contact: '',
    country: 'Costa Rica',
  });

  //  state to manage error
  const [error, setError] = React.useState({
    numValue: '',
    email: '',
    contact: '',
  });

  const history = useHistory();

  //  Manage routing with hash according to active stepper
  useEffect(() => {
    history.push(`/beneficiario/#${steps + 1}`);
    // eslint-disable-next-line
  }, [steps]);

  //  handle next & previous button
  const handleStepper = (name) => {
    if (name === 'previous') {
      setcurrentStep(steps - 1);
    } else {
      setcurrentStep(steps + 1);
    }
  };

  const handleContact = (value) => {
    setinfoData({
      ...infoData,
      contact: value,
    });
  };

  //  function for dropdown selection
  const handleSelectChange = (event) => {
    const { target: { name, value } } = event;
    setinfoData({
      ...infoData,
      [name]: value,
    });
  };

  // handle change value
  const handleChange = (event) => {
    const { target: { name, value } } = event;

    if (
      name === 'numValue' &&
      value.replace(/-/g, '').replace(/_/g, '').length < 9
    ) {
      setError({
        ...error,
        numValue: 'Please valid entry.',
      });
    } else {
      setError({
        ...error,
        numValue: '',
      });
    }
    if (name === 'email') {
      const temp = isValidEmail(value);
      if (!temp) {
        setError({
          ...error,
          [name]: 'Correo electrónico no válido.',
        });
      } else {
        setError({
          ...error,
          email: '',
        });
      }
    }
    if (name === 'contact') {
      // eslint-disable-next-line no-restricted-globals
      if (value && isNaN(value)) {
        setError({
          ...error,
          contact: 'Enter valid contact number',
        });
      } else if (value && value.length < 9) {
        setError({
          ...error,
          contact: 'Verificar número de cédula.',
        });
      } else if (value && value.length > 14) {
        setError({
          ...error,
          contact: 'Contact must be less than 14 numbers',
        });
      } else {
        setError({
          ...error,
          contact: '',
        });
      }
    }

    setinfoData({
      ...infoData,
      [name]: value,
    });
  };
  return (
    <>
      <Header />
      <section className="form-section">
        <Container>
          <>
            <h1 className="main-title">Proteja a los suyos</h1>
            <p className="sub-title">Ingrese los datos que se le indican para agregar al beneficiario.</p>
            <Stepper
              className="stepper"
              steps={[
                { label: steps === 1 || steps > 1 ? 'CONTACT' : '' },
                { label: steps === 2 || steps > 2 ? 'INFORMATION' : '' },
                { label: steps === 3 || steps > 3 ? '' : '' },
              ]}
              activeStep={steps}
              completeColor="#49B8AD"
              activeTitleColor="#49B8AD"
              completeBorderStyle="#49B8AD"
              // eslint-disable-next-line
              className={'stepclass'}
              stepClassName="stepclassName"
              // disabledSteps={ [0] }
            />
            <div className="inner-body">
              {
                // eslint-disable-next-line no-nested-ternary
                steps === 0 ? (
                  <Step1Component
                    infoData={infoData}
                    handleSelectChange={handleSelectChange}
                    handleChange={handleChange}
                    error={error}
                  />
                  // eslint-disable-next-line no-nested-ternary
                ) : steps === 1 ? (
                  <Step2Component
                    infoData={infoData}
                    handleContact={handleContact}
                    handleChange={handleChange}
                    error={error}
                  />
                ) : steps === 2 ? (
                  <Step3Component
                    infoData={infoData}
                    handleSelectChange={handleSelectChange}
                    setcurrentStep={setcurrentStep}
                    setinfoData={setinfoData}
                  />
                ) : null
                }
            </div>
            <>
              <div className="d-flex align-items-start justify-content-between btn-wrap">
                <Button
                  variant="link"
                  className="btn-theme-outline mb-2"
                  onClick={() => {
                    if (steps === 0) {
                      // redirect to parent step 3
                      history.push({
                        pathname: '/Plan',
                        state: { step: 3 },
                      });
                    } else {
                      handleStepper('previous');
                    }
                  }}
                >
                  Atrás
                </Button>
                <div className="d-flex align-items-end flex-column">
                  <Button
                    variant="link"
                    className="btn-theme mb-2"
                    onClick={() => {
                      if (steps === 2) {
                        // redirect to parent step 3
                        history.push({
                          pathname: '/Plan',
                          state: { step: 3 },
                        });
                      } else {
                        handleStepper('next');
                      }
                    }}
                    disabled={
                      // eslint-disable-next-line no-nested-ternary
                      error && (error.email || error.numValue || error.contact)
                        ? true
                        : steps === 1 && (!infoData.email || !infoData.contact)
                          ? true
                          : !!(steps === 0 && !infoData.numValue)
                    }
                  >
                    Continuar
                  </Button>
                  {error && (error.email || error.contact || error.numValue) ? (
                    <p className="error-muted">
                      Please resolve the above errors and verify details again.
                    </p>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </>
          </>
        </Container>
      </section>
    </>
  );
};
export default Child;
