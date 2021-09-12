import React, { PureComponent } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import AppRoutes from './routes/';
import './App.css';
import Loader from './Common/Loader/Loader';

const history = createBrowserHistory({ basename: '/' });
class App extends PureComponent {
  render() {
    return (
      <>
        <Router history={history}>
          <React.Suspense fallback={<Loader fullLoader />}>
            <AppRoutes />
          </React.Suspense>
        </Router>
      </>
    );
  }
}
export default App;
