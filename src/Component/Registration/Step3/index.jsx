import React from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Step3Component = ({ ...props }) => {
  const { handleSelectChange, infoData, iHistory } = props;
  const { history } = iHistory;
  const { duration } = infoData;
  return (
    <>
      <Form className="resgistration-form">
        <div className="form-header">
          <h2 className="form-title">
            <span>Plan Nine</span>
          </h2>
        </div>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Plan seleccionado</Form.Label>
          <Form.Control
            as="select"
            value={duration}
            onChange={handleSelectChange}
            name="duration"
          >
            <option value="Mensual">
              Mensual
              {' '}
            </option>
            ;
            <option value="Annual">
              Annual
              {' '}
            </option>
            ;
            {/* <option value="Monthly">
              Monthly
              {' '}
            </option> */}
            ;
          </Form.Control>
        </Form.Group>
        <p className="daily-text">
          {/* eslint-disable-next-line max-len */}
          Agregue beneficiarios por $6,00 al mes. Sus familiares y amigos podrán disfrutar de los mismos beneficios del plan.
        </p>
        <Link
          onClick={() => history.push('/beneficiario')}
          to="/beneficiario"
          className="theme-link"
        >
          ¿Quiere agregar beneficiarios a su plan?
        </Link>
      </Form>
      <div className="right-box">
        <div className="daily-rectangle">
          <div className="daily-head">{duration}</div>
          <div className="daily-list">
            <span>Subtotal:</span>
            <span>$18,00</span>
          </div>
          <div className="daily-list">
            <span>IVA:</span>
            <span>2,34</span>
          </div>
          <div className="daily-list total">
            <span>Total:</span>
            <span>20,34</span>
          </div>
        </div>
      </div>
    </>
  );
};

Step3Component.propTypes = {
  infoData: PropTypes.shape({ duration: PropTypes.string.isRequired }).isRequired,
  handleSelectChange: PropTypes.func.isRequired,
  iHistory: PropTypes.shape({ history: PropTypes.string.isRequired }).isRequired,
};

export default Step3Component;
