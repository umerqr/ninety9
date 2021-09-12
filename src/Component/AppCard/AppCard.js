/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import AppLabel from '../AppLabel';
import './styles.css';
import users from '../../assets/img/users.svg';
import AppButton from '../AppButton';

function AppCard({
  showPayment, planLabel, affiliatedDate, planPrice, planTime,
  beneficiaryCount, active, index, handleOpenModal, displayMiniDiv, clientsComp,
}) {
  return (
    <>
      {!clientsComp ? (
        <div className={active ? 'app-card-container-active col-5' : 'app-card-container-inactive col-5'}>
          <div className="app-card-inner-container">
            {showPayment && (displayMiniDiv === 'pending' ? (
              <div className="app-card-pending-div">
                <AppLabel label="PENDIENTE" className="app-card-item-name-pending" />
              </div>
            ) : (
              <div className="app-card-pago-div">
                <AppLabel label="PAGO" className="app-card-item-name" />
              </div>
            ))}
            <div className="app-card-plan-container">
              <div className="app-card-engagement-container">
                <AppLabel label={planLabel} className="app-card-plan-heading" />
                <AppLabel label={`Afiliado desde: ${affiliatedDate}`} className="app-card-affiliation-label" />
              </div>
              <div className="app-card-success-container d-flex">
                <AppLabel label={planPrice} className="app-card-plan-price" />
                <AppLabel label={`/POR ${planTime}`} className="app-card-affiliation-label" />
              </div>
            </div>
            <div className="app-card-beneficiary-row">
              { beneficiaryCount > 0 && index === 0 && (
              <>
                <img src={users} alt="." className="users-icon-style" />
                <AppLabel label={`${beneficiaryCount} beneficiarios`} className="app-card-affiliation-label" />
              </>
              )}
            </div>
            <div className="app-card-plan-container d-flex flex-row-reverse">
              {active
                ? (

                  <AppButton name="cancelarBtn" onClick={() => handleOpenModal('cancel', planLabel)} label="Cancelar plan" className="app-card-btn-theme-outline" />

                )
                : (
                  <div className="cambiar-button-div">
                    <AppButton name="cambiarBtn" onClick={() => handleOpenModal('change', planLabel)} label="Cambiar plan" />
                  </div>
                )}
            </div>
          </div>
        </div>
      ) : (
        <div className="one-app-card-container-active col-5">
          <div className="app-card-inner-container">
            <div className="app-card-plan-container">
              <div className="app-card-engagement-container d-flex justify-content-between col-12">
                <div className="col-4">
                  <AppLabel label="Tipo de plan" className="app-card-affiliation-label" />
                  <AppLabel label={planLabel} className="app-card-plan-heading" />
                </div>
                <div className="col-4">
                  <AppLabel label="Afiliado desde:" className="app-card-affiliation-label" />
                  <AppLabel label={affiliatedDate} className="app-card-affiliation-label" />
                </div>
                <div className="col-4">
                  <AppButton name="cambiarBtn" onClick={() => handleOpenModal('changeComp', planLabel)} label="Cambiar plan" />
                  <AppButton name="cancelarBtn" onClick={() => handleOpenModal('cancel', planLabel)} label="Cancelar plan" className="app-card-btn-theme-outline" />
                </div>
              </div>
            </div>
            <div className="d-flex col-12">
              <div className="app-card-beneficiary-row col-4">
                { beneficiaryCount > 0 && (
                <>
                  <img src={users} alt="." className="users-icon-style" />
                  <AppLabel label={`${beneficiaryCount} beneficiarios`} className="app-card-affiliation-label" />
                </>
                )}
              </div>
              <div className="app-card-success-container d-flex col-2">
                <AppLabel label={planPrice} className="app-card-plan-price" />
                <AppLabel label={`/POR ${planTime}`} className="app-card-affiliation-label" />
              </div>
            </div>
          </div>
        </div>
      ) }
    </>

  );
}
AppCard.defaultProps = {
  showPayment: false,
  affiliatedDate: false,
  planLabel: false,
  planPrice: false,
  beneficiaryCount: false,
  planTime: false,
  active: false,
  index: false,
  displayMiniDiv: false,
  handleOpenModal: false,
  clientsComp: false,
};
AppCard.propTypes = {
  showPayment: PropTypes.bool,
  planLabel: PropTypes.any,
  affiliatedDate: PropTypes.any,
  planPrice: PropTypes.any,
  planTime: PropTypes.any,
  beneficiaryCount: PropTypes.any,
  active: PropTypes.any,
  index: PropTypes.number,
  handleOpenModal: PropTypes.func,
  displayMiniDiv: PropTypes.any,
  clientsComp: PropTypes.bool,

};

export default AppCard;
