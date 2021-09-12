/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import * as classnames from 'classnames';
import { Form } from 'react-bootstrap';
import AppLabel from '../../AppLabel';
import ClientsTable from './ClientsTable';
import AppTextField from '../../AppTextField';
import Profile from '../Profile';
import Payment from '../Payment/Payment';
import Plans from '../Plans/Plans';
import AppButton from '../../AppButton';

const clientSearh = [
  {
    name: 'Todos los clientes',
    value: 'all',
  },
  {
    name: 'Plan',
    value: 'plan',
  },
];
function Clients(props) {
  const [clientsData, setClientsData] = useState([
    {
      numValue: '1-8859-4671',
      name: 'Joe Doe',
      email: 'abc@gmail.com',
      contact: '2222222',
      country: 'Costa Rica',
      duration: 'Mensual',
      password: '',
      confirmPassword: '',
      cardNumber: '',
      expireDate: '',
      expMonth: '',
      expYear: '',
      cvv: '',
      promo: '',
      activePlan: 'Monthly',
      affiliatedDate: '22/03/23',
      fee: '11$',
      type: 'Monthly',
      price: '$11.3',
      id: 0,
      active: true,
      planTime: 'MES',
      identificationType: 'Física',
      beneficiary: [
        {
          beneficiaryName: 'Alexis González Valenciano',
          agregado: '22/02/20',
        },
        {
          beneficiaryName: 'Marian Flores Hernández   ',
          agregado: '12/02/20',
        },
        {
          beneficiaryName: 'Juan Jose Velasco Martinez',
          agregado: '04/03/20',
        },
        {
          beneficiaryName: 'Eva Benavides Morales',
          agregado: '04/02/20',
        },
        {
          beneficiaryName: 'Marian Benavides Martinez',
          agregado: '04/07/20',
        },
        {
          beneficiaryName: 'González Juan Valencian',
          agregado: '09/07/20',
        },
      ],
      cardsData: [
        {
          date: '20/06/2020',
          plan: 'Mensual',
          payment: '*****6578',
          amount: '$11.3',
          state: 'active',
          visa: true,
        },
        {
          date: '20/06/2020',
          plan: 'Mensuel',
          payment: '*****6578',
          amount: '$11.3',
          state: 'pending',
          visa: true,
        },
        {
          date: '20/06/2020',
          plan: 'Mensual',
          payment: '*****6578',
          amount: '$11.3',
          state: 'active',
          visa: true,
        },
        {
          date: '20/06/2020',
          plan: 'Mensual',
          payment: '*****6578',
          amount: '$11.3',
          state: 'active',
          visa: false,
        },
        {
          date: '20/06/2020',
          plan: 'Mensual',
          payment: '*****6578',
          amount: '$11.3',
          state: 'active',
          visa: true,
        },
        {
          date: '20/06/2020',
          plan: 'Mensual',
          payment: '*****6578',
          amount: '$11.3',
          state: 'active',
          visa: true,
        },
      ],
    },
    {
      numValue: '1-8859-4672',
      name: 'Alexis González Valenciano',
      email: 'abc@gmail.com',
      contact: '2222222',
      country: 'Costa Rica',
      duration: 'Mensual',
      password: '',
      confirmPassword: '',
      cardNumber: '',
      expireDate: '',
      expMonth: '',
      expYear: '',
      cvv: '',
      promo: '',
      activePlan: 'Monthly',
      affiliatedDate: '22/03/23',
      fee: '11$',
      type: 'Monthly',
      price: '$11.3',
      id: 0,
      active: true,
      planTime: 'MES',
      identificationType: 'Física',
      beneficiary: [
        {
          beneficiaryName: 'Alexis González Valenciano',
          agregado: '22/02/20',
        },
        {
          beneficiaryName: 'Marian Flores Hernández   ',
          agregado: '12/02/20',
        },
        {
          beneficiaryName: 'Juan Jose Velasco Martinez',
          agregado: '04/03/20',
        },
        {
          beneficiaryName: 'Eva Benavides Morales',
          agregado: '04/02/20',
        },
        {
          beneficiaryName: 'Marian Benavides Martinez',
          agregado: '04/07/20',
        },
        {
          beneficiaryName: 'González Juan Valencian',
          agregado: '09/07/20',
        },
      ],
      cardsData: [
        {
          date: '20/06/2020',
          plan: 'Mensual',
          payment: '*****6578',
          amount: '$11.3',
          state: 'active',
          visa: true,
        },
        {
          date: '20/06/2020',
          plan: 'Mensuel',
          payment: '*****6578',
          amount: '$11.3',
          state: 'pending',
          visa: true,
        },
        {
          date: '20/06/2020',
          plan: 'Mensual',
          payment: '*****6578',
          amount: '$11.3',
          state: 'active',
          visa: true,
        },
        {
          date: '20/06/2020',
          plan: 'Mensual',
          payment: '*****6578',
          amount: '$11.3',
          state: 'active',
          visa: false,
        },
        {
          date: '20/06/2020',
          plan: 'Mensual',
          payment: '*****6578',
          amount: '$11.3',
          state: 'active',
          visa: true,
        },
        {
          date: '20/06/2020',
          plan: 'Mensual',
          payment: '*****6578',
          amount: '$11.3',
          state: 'active',
          visa: true,
        },
      ],
    },
    {
      numValue: '1-8859-4675',
      name: 'Marian Flores Hernández',
      email: 'MarianFloresHernández@gmail.com',
      contact: '2222222',
      country: 'Costa Rica',
      duration: 'Mensual',
      password: '',
      confirmPassword: '',
      cardNumber: '',
      expireDate: '',
      expMonth: '',
      expYear: '',
      cvv: '',
      promo: '',
      activePlan: 'Monthly',
      affiliatedDate: '22/03/23',
      fee: '11$',
      type: 'Monthly',
      price: '$11.3',
      id: 0,
      active: true,
      planTime: 'MES',
      identificationType: 'Física',
      beneficiary: [
        {
          beneficiaryName: 'Alexis González Valenciano',
          agregado: '22/02/20',
        },
        {
          beneficiaryName: 'Marian Flores Hernández   ',
          agregado: '12/02/20',
        },
        {
          beneficiaryName: 'Juan Jose Velasco Martinez',
          agregado: '04/03/20',
        },
        {
          beneficiaryName: 'Eva Benavides Morales',
          agregado: '04/02/20',
        },
        {
          beneficiaryName: 'Marian Benavides Martinez',
          agregado: '04/07/20',
        },
        {
          beneficiaryName: 'González Juan Valencian',
          agregado: '09/07/20',
        },
      ],
      cardsData: [
        {
          date: '20/06/2020',
          plan: 'Mensual',
          payment: '*****6578',
          amount: '$11.3',
          state: 'active',
          visa: true,
        },
        {
          date: '20/06/2020',
          plan: 'Mensuel',
          payment: '*****6578',
          amount: '$11.3',
          state: 'pending',
          visa: true,
        },
        {
          date: '20/06/2020',
          plan: 'Mensual',
          payment: '*****6578',
          amount: '$11.3',
          state: 'active',
          visa: true,
        },
        {
          date: '20/06/2020',
          plan: 'Mensual',
          payment: '*****6578',
          amount: '$11.3',
          state: 'active',
          visa: false,
        },
        {
          date: '20/06/2020',
          plan: 'Mensual',
          payment: '*****6578',
          amount: '$11.3',
          state: 'active',
          visa: true,
        },
        {
          date: '20/06/2020',
          plan: 'Mensual',
          payment: '*****6578',
          amount: '$11.3',
          state: 'active',
          visa: true,
        },
      ],
    },
    {
      numValue: '1-8859-4679',
      name: 'Juan Jose Velasco Martinez',
      email: 'JuanJoseVelascoMartinez@gmail.com',
      contact: '2222222',
      country: 'Costa Rica',
      duration: 'Mensual',
      password: '',
      confirmPassword: '',
      cardNumber: '',
      expireDate: '',
      expMonth: '',
      expYear: '',
      cvv: '',
      promo: '',
      activePlan: 'Monthly',
      affiliatedDate: '22/03/23',
      fee: '11$',
      type: 'Monthly',
      price: '$11.3',
      id: 0,
      active: true,
      planTime: 'MES',
      identificationType: 'Física',
      beneficiary: [
        {
          beneficiaryName: 'Alexis González Valenciano',
          agregado: '22/02/20',
        },
        {
          beneficiaryName: 'Marian Flores Hernández   ',
          agregado: '12/02/20',
        },
        {
          beneficiaryName: 'Juan Jose Velasco Martinez',
          agregado: '04/03/20',
        },
        {
          beneficiaryName: 'Eva Benavides Morales',
          agregado: '04/02/20',
        },
        {
          beneficiaryName: 'Marian Benavides Martinez',
          agregado: '04/07/20',
        },
        {
          beneficiaryName: 'González Juan Valencian',
          agregado: '09/07/20',
        },
      ],
      cardsData: [
        {
          date: '20/06/2020',
          plan: 'Mensual',
          payment: '*****6578',
          amount: '$11.3',
          state: 'active',
          visa: true,
        },
        {
          date: '20/06/2020',
          plan: 'Mensuel',
          payment: '*****6578',
          amount: '$11.3',
          state: 'pending',
          visa: true,
        },
        {
          date: '20/06/2020',
          plan: 'Mensual',
          payment: '*****6578',
          amount: '$11.3',
          state: 'active',
          visa: true,
        },
        {
          date: '20/06/2020',
          plan: 'Mensual',
          payment: '*****6578',
          amount: '$11.3',
          state: 'active',
          visa: false,
        },
        {
          date: '20/06/2020',
          plan: 'Mensual',
          payment: '*****6578',
          amount: '$11.3',
          state: 'active',
          visa: true,
        },
        {
          date: '20/06/2020',
          plan: 'Mensual',
          payment: '*****6578',
          amount: '$11.3',
          state: 'active',
          visa: true,
        },
      ],
    },
  ]);
  const { infoData } = props;
  const [
    rowClicked,
    setRowClicked,
  ] = useState();
  const [filter, setFilter] = useState(null);
  const [searchFieldText, setSearchFieldText] = useState(null);
  const rowClickedHandler = (childRows) => {
    setRowClicked(childRows);
  };
  const [tabItem, setTabItem] = useState('Profile');

  const onChangeTab = (item) => {
    setTabItem(item);
  };
  const handleSelectChange = (event) => {
    const { target: { value } } = event;
    setFilter(value);
  };
  return (
    <>
      {/* <div className="d-flex"> */}
      {rowClicked && (
        <>
          <div className="d-flex">
            <div className="clients-side-container">
              <div className="client-side-inner-container">
                <AppTextField
                  className={classnames('form-control is-search')}
                  stateToUpdate={setSearchFieldText}
                  value={searchFieldText}
                  placeholder="Buscar aquí"
                />
                <AppLabel className="client-main-heading" label="Clientes" />
                <div className="d-flex justify-content-between">
                  <Form.Control
                    as="select"
                    value={filter}
                    name="identificationType"
                    onChange={handleSelectChange}
                    className="client-filter-select-styling"
                  >
                    {clientSearh.map((list, i) => (
                      <option value={list.name} key={i}>
                        {list.name}
                      </option>
                    ))}
                  </Form.Control>
                </div>
                <AppLabel className="client-side-sub-heading" label="Nombre completo" />
                {clientsData.map((x) => (
                  <>
                    <div className={Object.values(rowClicked).includes(x.name) ? 'highlighted-div' : 'unhighlighted-div'} key={x.name} onClick={() => rowClickedHandler(x)}>
                      <AppLabel className="" label={x.name} />
                      <AppLabel className="" label={x.email} />
                      <hr />
                    </div>
                  </>
                ))}
              </div>
            </div>
            <div className="right-side-screen">
              <div className="d-flex">
                <AppLabel className="right-side-main-heading" label={rowClicked.name} />
                {rowClicked.activePlan === 'Monthly' ? (
                  <AppLabel label="MENSUAL" className="clients-right-side-mini-div" />
                ) : (
                  <AppLabel label="Annual" className="clients-right-side-mini-div-annual" />
                )}
              </div>
              <div className="client-tab-row row align-items-center justify-content-between">
                <div className="client-tab-container row col">
                  <div onClick={() => onChangeTab('Profile')} className={tabItem === 'Profile' ? 'client-tab-label-container-selected' : 'client-tab-label-container'}>
                    <AppLabel label="PREFIL" className={tabItem === 'Profile' ? 'client-tab-label-selected' : 'client-tab-label'} />
                  </div>
                  <div onClick={() => onChangeTab('Plans')} className={tabItem === 'Plans' ? 'client-tab-label-container-selected' : 'client-tab-label-container'}>
                    <AppLabel label="PLAN" className={tabItem === 'Plans' ? 'client-tab-label-selected' : 'client-tab-label'} />
                  </div>
                  <div onClick={() => onChangeTab('Payment')} className={tabItem === 'Payment' ? 'client-tab-label-container-selected' : 'client-tab-label-container'}>
                    <AppLabel label="PAGO" className={tabItem === 'Payment' ? 'client-tab-label-selected' : 'client-tab-label'} />
                  </div>
                </div>
              </div>
              {tabItem === 'Profile' && <Profile infoData={rowClicked} setinfoData={setRowClicked} clientsComp setClientsData={setClientsData} />}
              {tabItem === 'Plans' && <Plans infoData={rowClicked} setinfoData={setRowClicked} clientsComp />}
              {tabItem === 'Payment' && <Payment infoData={rowClicked} setinfoData={setRowClicked} clientsComp />}
            </div>
          </div>
        </>
      )}
      <div className="clients-main-container col-12">
        {!rowClicked && (
          <>
            <div className="search-div-main">
              <AppTextField
                className={classnames('form-control is-search')}
                stateToUpdate={setSearchFieldText}
                value={searchFieldText}
                placeholder="Buscar aquí"
              />
            </div>
            <AppLabel className="main-heading" label="Clientes" />
            <div className="d-flex justify-content-between">
              <div>
                {/* <AppLabel label="Tipo de identificación" /> */}
                <Form.Control
                  as="select"
                  value={filter}
                  name="identificationType"
                  onChange={handleSelectChange}
                  className="client-filter-select-styling"
                >
                  {clientSearh.map((list, i) => (
                    <option value={list.name} key={i}>
                      {list.name}
                    </option>
                  ))}
                </Form.Control>
              </div>
              <AppButton onClick={() => {}} label="+Agregar nuevo" />
            </div>
            <ClientsTable
              infoData={infoData}
              clientsData={clientsData}
              rowClickedHandler={rowClickedHandler}
            />
          </>
        )}
      </div>
      {/* </div> */}
    </>
  );
}

Clients.propTypes = {
  infoData: PropTypes.shape({
    country:
 PropTypes.string,
  }).isRequired,
};

export default Clients;
