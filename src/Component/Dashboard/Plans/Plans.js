/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import AppLabel from '../../AppLabel';
import './styles.css';
import AppCard from '../../AppCard/AppCard';
import AppButton from '../../AppButton';
import PlansTable from './PlansTable';
import ConfirmationModal from '../../ConfirmationModal/ConfirmationModal';
import AddBeneficiary from '../../AddBeneficiary/AddBeneficiary';

function Plans(props) {
  const { infoData, setinfoData, clientsComp } = props;
  const [
    openModal,
    setOpenModal,
  ] = useState(false);
  const [
    incomingButtonType,
    setIncomingButtonType,
  ] = useState('');
  const [
    incomingBeneficiaryData,
    setIncomingBeneficiaryData,
  ] = useState('');
  const [
    incomingActivePlan,
    setIncomingActivePlan,
  ] = useState('');
  const [
    displayMiniDiv,
    setDisplayMiniDiv,
  ] = useState('payment');
  const openNotification = (type, msg) => {
    notification[type]({
      message: msg,
      className: type === 'error' ? 'notification-class-error' : 'notification-class-success',
    });
  };
  const [planes] = useState(
    [
      {
        type: 'Monthly',
        price: '$11.3',
        id: 0,
        active: false,
        planTime: 'MES',
        affiliatedDate: infoData.affiliatedDate,
        beneficiary: infoData.beneficiary,
      },
      {
        type: 'Annual',
        price: '$121.3',
        id: 1,
        active: false,
        planTime: 'AÑO',
        affiliatedDate: infoData.affiliatedDate,
        beneficiary: infoData.beneficiary,
      },
    ],
  );

  useEffect(() => {
    if (incomingButtonType !== '') {
      setOpenModal(true);
    }
  }, [incomingButtonType]);
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenModal = (type, activePlan) => {
    setIncomingButtonType(type);
    setIncomingActivePlan(activePlan);
    if (incomingButtonType !== '') {
      setOpenModal(true);
    }
  };
  const handleConfirmation = () => {
    if (incomingButtonType === 'cancel') {
      setDisplayMiniDiv('pending');
      return (openNotification('error', 'Ha ocurrido un error con el pago de su plan, revise si la información del método de pago es correta.'), handleCloseModal());
    } if (incomingButtonType === 'change') {
      setinfoData({
        ...infoData,
        activePlan: incomingActivePlan,
      });
      setDisplayMiniDiv('');
      return (openNotification('success', 'Successful!'), handleCloseModal());
    }
    if (incomingButtonType === 'changeComp') {
      return (openNotification('success', 'Success!'), handleCloseModal());
    }
    if (incomingButtonType === 'deleteBeneficary') {
      return (openNotification('error', 'Deleted successfully!'), handleCloseModal());
    }
    return handleCloseModal();
  };
  const handleDeleteBeneficiary = (row) => {
    handleOpenModal('deleteBeneficary');
    setIncomingBeneficiaryData(row);
  };
  return (
    <>
      <div className={!clientsComp ? 'plans-main-container col-12' : 'clients-plans-main-container col-12'}>
        {
    !clientsComp && (
    <>
      <AppLabel className="main-heading" label="Planes" />
      <AppLabel className="sub-heading" label="Cambie su plan o agregue beneficiarios." />
    </>
    )
}
        {!clientsComp ? (
          <div className="app-card-row d-flex flex-row">
            {planes.map((x) => ({
              ...x,
              active: infoData.activePlan === x.type && true,
            })).map((z, i) => (
              <AppCard
                key={z.id}
                showPayment={z.active && true}
                planLabel={z.type}
                affiliatedDate={z.affiliatedDate}
                planPrice={z.price}
                planTime={z.planTime}
                beneficiary={z.beneficiary}
                beneficiaryCount={z.beneficiary.length}
                active={z.active}
                index={i}
                handleOpenModal={handleOpenModal}
                displayMiniDiv={displayMiniDiv}
              />
            ))}
          </div>
        )
          : (
            <AppCard
              planLabel={infoData.type}
              affiliatedDate={infoData.affiliatedDate}
              planPrice={infoData.price}
              planTime={infoData.planTime}
              beneficiary={infoData.beneficiary}
              beneficiaryCount={infoData.beneficiary.length}
              active={infoData.active}
              // index={i}
              handleOpenModal={handleOpenModal}
              displayMiniDiv={displayMiniDiv}
              clientsComp={clientsComp}
            />
          )}
        <div className="plans-secondary-container">

          <div className="plans-secondary-row d-flex justify-content-between">

            <AppLabel className="main-heading" label="Beneficiarios" />
            <AppButton name="agregarBtn" onClick={() => handleOpenModal('add')} label="+ Agregar nuevo" />
          </div>
          <AppLabel className="sub-heading" label="Agregue beneficiarios a su plan por sólo $6 por persona." />
          <PlansTable handleDeleteBeneficiary={handleDeleteBeneficiary} infoData={infoData} />
        </div>
      </div>
      { (() => {
        if (incomingButtonType === 'cancel') {
          return (
            <ConfirmationModal
              openConfirmationModal={openModal}
              clientsComp={clientsComp}
              handleCloseConfirmationModal={handleCloseModal}
              promptHeading={
                (() => {
                  if (infoData.activePlan === 'Monthly') {
                    if (!clientsComp) {
                      return '¿Está seguro que quiere cancelar su subscripción al plan mensual?';
                    }

                    return '¿Está seguro que quiere cancelar esta subscripción al plan mensual?';
                  }
                  return '¿Está seguro que quiere cancelar su subscripción al plan anual?';
                })()
              }
              promptText={
                (() => {
                  if (infoData.activePlan === 'Monthly') {
                    if (!clientsComp) {
                      return 'Para cancelar su subscripción, envíe la solicitud y le contactaremos próximamente para completar la cancelación.';
                    }
                    return `Al cancelar esta subscripción, el cliente ya no podrá contar 
                      con los servicios de Salud 360.`;
                  }
                  return 'Al cancelar su plan no podrá accesar a los beneficios que le ofrece Salud 360 ni tampoco sus beneficiarios.';
                })()
              }
              handleConfirmation={handleConfirmation}
              buttonLabelRight="Enviar solicitud"
            />
          );
        } if (incomingButtonType === 'change') {
          return (
            <ConfirmationModal
              clientsComp={clientsComp}
              openConfirmationModal={openModal}
              handleCloseConfirmationModal={handleCloseModal}
              promptHeading="¿Está seguro que quiere cambiar su plan mensual al plan anual?"
              promptText="Al activar el plan anual se cancela su subscripción al plan mensual y se cobrará el nuevo monto de $112 al año más $6 por cada beneficiario incluido."
              handleConfirmation={handleConfirmation}
              buttonLabelRight="Cambiar plan"
              incomingButtonType={incomingButtonType}
            />
          );
        }
        if (incomingButtonType === 'add') {
          return (
            <AddBeneficiary
              infoData={infoData}
              setinfoData={setinfoData}
              openConfirmationModal={openModal}
              handleCloseModal={handleCloseModal}
              handleConfirmation={handleConfirmation}
              incomingButtonType={incomingButtonType}
            />
          );
        }
        if (incomingButtonType === 'changeComp') {
          return (
            <ConfirmationModal
              clientsComp={clientsComp}
              openConfirmationModal={openModal}
              handleCloseConfirmationModal={handleCloseModal}
              promptHeading="¿Está seguro que quiere cambiar el tipo de plan del cliente?"
              promptText="Al activar el plan anual se cancela su subscripción al plan mensual y se cobrará el nuevo monto de $112 al año más $6 por cada beneficiario incluido."
              handleConfirmation={handleConfirmation}
              buttonLabelRight="Cambiar plan"
              incomingButtonType={incomingButtonType}
              infoData={infoData}
              setinfoData={setinfoData}
            />
          );
        }
        if (incomingButtonType === 'deleteBeneficary') {
          return (
            <ConfirmationModal
              clientsComp={clientsComp}
              openConfirmationModal={openModal}
              handleCloseConfirmationModal={handleCloseModal}
              promptHeading={`¿Está seguro que quiere eliminar al beneficiario ${incomingBeneficiaryData.beneficiaryName}?`}
              promptText="Al eliminar al beneficiario del plan ya no se le cobrará el monto $6 adicionales al titular y se borrarán los datos del beneficiario perfil del cliente."
              handleConfirmation={handleConfirmation}
              buttonLabelRight="Cambiar plan"
              incomingButtonType={incomingButtonType}
              infoData={infoData}
              setinfoData={setinfoData}
            />
          );
        }
        return null;
      })()}
    </>
  );
}

Plans.propTypes = {
  infoData: PropTypes.shape({
    country:
       PropTypes.string,
    email:
       PropTypes.string,
    name:
       PropTypes.string,
    contact:
       PropTypes.string,
  }).isRequired,
};

export default Plans;
