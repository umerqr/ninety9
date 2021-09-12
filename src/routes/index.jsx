import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Error404Page from '../Component/Error404Page';

// Pages
const Main = React.lazy(() => import('../Component/Registration'));
const ChildComponent = React.lazy(() => import('../Component/RegistrationChild'));
const Login = React.lazy(() => import('../Component/Login'));
const ForgotPassword = React.lazy(() => import('../Component/ForgotPassword'));
const Dashboard = React.lazy(() => import('../Component/Dashboard/Dashboard'));

const AppRoutes = () => {
  // state object to store user information
  const [infoData, setinfoData] = React.useState({
    numValue: '',
    name: 'Joe Doe',
    email: 'abc@gmail.com',
    contact: '2222222',
    country: 'Costa Rica',
    duration: 'Mensual',
    password: '1234',
    confirmPassword: '',
    cardNumber: '',
    expireDate: '',
    expMonth: '',
    expYear: '',
    cvv: '',
    promo: '',
    activePlan: 'Monthly',
    identificationType: '',
    affiliatedDate: '22/03/23',
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
  });
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(renderProps) => (
          <Main
                // eslint-disable-next-line react/jsx-props-no-spreading
            {...renderProps}
            infoData={infoData}
            setinfoData={setinfoData}
          />
        )}
      >
        {' '}
        <Redirect to="/Plan/#1" />
        {' '}
      </Route>

      <Route
        exact
        path="/Plan"
        render={(renderProps) => (
          <Main
                // eslint-disable-next-line react/jsx-props-no-spreading
            {...renderProps}
            infoData={infoData}
            setinfoData={setinfoData}
          />
        )}
      />

      <Route path="/beneficiario" component={ChildComponent} />
      <Route
        exact
        path="/Login"
        render={(renderProps) => (
          <Login
                // eslint-disable-next-line react/jsx-props-no-spreading
            {...renderProps}
            infoData={infoData}
            setinfoData={setinfoData}
          />
        )}
        infoData={infoData}
      />
      <Route
        exact
        path="/ForgotPassword"
        component={ForgotPassword}
        infoData={infoData}
      />
      <Route
        path="/dashboard"
        render={(renderProps) => (
          <Dashboard
                // eslint-disable-next-line react/jsx-props-no-spreading
            {...renderProps}
            infoData={infoData}
            setinfoData={setinfoData}
          />
        )}
        infoData={infoData}
      />
      <Route
        path="/dashboard/admin"
        render={(renderProps) => (
          <Dashboard
                // eslint-disable-next-line react/jsx-props-no-spreading
            {...renderProps}
            infoData={infoData}
            setinfoData={setinfoData}
          />
        )}
        infoData={infoData}
      />
      <Route
        render={() => (
          <Error404Page />
        )}
      />
    </Switch>
  );
  // }
};
export default withRouter(AppRoutes);
