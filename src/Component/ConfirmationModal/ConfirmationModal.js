/* eslint-disable no-nested-ternary */
/* eslint-disable react/require-default-props */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { Form } from 'react-bootstrap';
import AppModal from '../AppModal/AppModal';
import AppButton from '../AppButton';
import AppLabel from '../AppLabel';
// import styled from 'styled-components';

function AddBeneficiary({
  promptText,
  promptHeading,
  handleCloseConfirmationModal,
  openConfirmationModal,
  handleConfirmation,
  buttonLabelRight,
  clientsComp,
  incomingButtonType,
  infoData,
  setinfoData,
}) {
  const activePlanOptions = [
    {
      name: 'Monthly',
      value: 'Monthly',
    },
    {
      name: 'Annual',
      value: 'Annual',
    },
  ];
  const handleSelectChange = (event) => {
    const { target: { name, value } } = event;
    setinfoData({
      ...infoData,
      [name]: value,
    });
  };
  return (
    <AppModal modalOpen={openConfirmationModal} childClassName="confirmation-modal" handleClose={handleCloseConfirmationModal} label={promptHeading}>
      <div className="confirmation-modal-dialogue">
        <AppLabel label={promptText} />
      </div>
      <div className="confirmation-modal-flex-div">
        { !clientsComp
          ? (
            <>
              <AppButton className="btn-theme-outline" onClick={handleCloseConfirmationModal} label="Cancelar" />
              <AppButton onClick={() => handleConfirmation()} label={buttonLabelRight} />
            </>
          )
          : (
            <>
              {incomingButtonType === 'changeComp' ? (
                <div>
                  <div className="d-flex justify-content-between">
                    <Form.Control
                      as="select"
                      value={infoData.activePlan}
                      name="activePlan"
                      onChange={handleSelectChange}
                      className="confirmation-select-styling"
                    >
                      {activePlanOptions.map((list, i) => (
                        <option value={list.name} key={i}>
                          {list.name}
                        </option>
                      ))}
                    </Form.Control>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="btn-div-confirmation">

                      <AppButton className="btn-theme-outline" onClick={handleCloseConfirmationModal} label="Cancelar plan" />
                    </div>
                    <AppButton onClick={() => handleConfirmation()} label="Cambiar plan" />
                  </div>
                </div>
              )
                : incomingButtonType === 'deleteBeneficary' ? <AppButton onClick={() => handleConfirmation()} label="Eliminar" /> : <AppButton className="btn-theme-outline" onClick={handleCloseConfirmationModal} label="Cancelar plan" />}
            </>
          )}
      </div>
    </AppModal>
  );
}

AddBeneficiary.propTypes = {
  handleCloseConfirmationModal: PropTypes.func,
  handleConfirmation: PropTypes.func,
  promptText: PropTypes.string,
  promptHeading: PropTypes.string,
  openConfirmationModal: PropTypes.bool,
  buttonLabelRight: PropTypes.string,
  clientsComp: PropTypes.bool,
  incomingButtonType: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  infoData: PropTypes.object,
  setinfoData: PropTypes.func,
};

export default memo(AddBeneficiary);
