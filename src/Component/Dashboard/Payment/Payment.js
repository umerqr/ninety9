/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import AppLabel from '../../AppLabel';
import './styles.css';
import PaymentCard from './PaymentCard';
import AppButton from '../../AppButton';
import PaymentTable from './PaymentTable';
import EditCardForm from '../../EditCardForm/EditCardForm';

function Payment(props) {
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
    incomingActivePlan,
    setIncomingActivePlan,
  ] = useState('');
  const [
    displayMiniDiv,
    setDisplayMiniDiv,
  ] = useState('payment');
  const [switchOne, setSwitchOne] = React.useState(true);
  const [switchTwo, setSwitchTwo] = React.useState(false);

  const handleChange = () => {
    if (switchOne === true) {
      setSwitchOne(false);
      setSwitchTwo(true);
    } else {
      setSwitchOne(true);
      setSwitchTwo(false);
    }
  };
  const openNotification = (type, msg) => {
    notification[type]({
      message: msg,
      className: type === 'error' ? 'notification-class-error' : 'notification-class-success',
    });
  };
  const [cards] = useState(
    [
      {
        cardNumber: '0000 0000 0000',
        fullName: 'Pedro Luis Gutierrez García',
        id: 0,
        expirey: '03/22',
        active: true,
        visaCard: true,
      },
      {
        cardNumber: '0000 0000 0000',
        fullName: 'Pedro Luis Gutierrez García',
        id: 1,
        expirey: '03/22',
        active: false,
        visaCard: false,
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
    return handleCloseModal();
  };
  return (
    <>
      <div className={!clientsComp ? 'payment-main-container col-12' : 'clients-payment-main-container col-12'}>

        <div className="agregar-btn-div d-flex flex-row-reverse">
          <AppButton name="addBtn" onClick={() => handleOpenModal('edit')} label="+ Agregar nuevo" />
        </div>
        <AppLabel className="main-heading" label="Método de Pago" />
        <AppLabel className="sub-heading" label="Compruebe su información de pago o agregue un nuevo método de pago." />
        <div className="app-card-row d-flex flex-row">
          {cards.map((x) => ({
            ...x,
            // active: infoData.activePlan === x.type && true,
          })).map((z, i) => (
            <PaymentCard
              key={z.id}
              active={z.active}
              index={i}
              visaCard={z.visaCard}
              cardNumber={z.cardNumber}
              fullName={z.fullName}
              expirey={z.expirey}
              handleOpenModal={handleOpenModal}
              displayMiniDiv={displayMiniDiv}
              switchOne={switchOne}
              switchTwo={switchTwo}
              handleChange={handleChange}
            />
          ))}
        </div>
        <div className="payment-secondary-container">

          <div className="payment-secondary-row d-flex justify-content-between">

            <AppLabel className="main-heading" label="Facturación" />

          </div>
          <AppLabel className="sub-heading" label=" Encuentre aquí su historial de facturación." />
          <PaymentTable infoData={infoData} />
        </div>
      </div>
      { (() => {
        if (incomingButtonType === 'edit') {
          return (
            <EditCardForm
              infoData={infoData}
              setinfoData={setinfoData}
              openConfirmationModal={openModal}
              handleCloseModal={handleCloseModal}
              handleConfirmation={handleConfirmation}
            />
          );
        }
        return null;
      })()}
    </>
  );
}

Payment.defaultProps = { clientsComp: false };
Payment.propTypes = {
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
  clientsComp: PropTypes.bool,
};

export default Payment;
