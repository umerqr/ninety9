import React from 'react';
import { AppRoutes } from './config/AppRoutes';

const Step2Component = React.lazy(() => import('./Component/Registration/Step2'));
const MainComponent = React.lazy(() => import('./Component/Registration'));
const Login = React.lazy(() => import('./Component/Login'));

const routes = [
  {
    path: AppRoutes.STEP2.url,
    exact: AppRoutes.STEP2.exact,
    name: AppRoutes.STEP2.name,
    component: Step2Component,
  },
  {
    path: AppRoutes.MAIN.url,
    exact: AppRoutes.MAIN.exact,
    name: AppRoutes.MAIN.name,
    component: MainComponent,
  },
  {
    path: AppRoutes.LOGIN.url,
    exact: AppRoutes.LOGIN.exact,
    name: AppRoutes.LOGIN.name,
    component: Login,
  },
];

export default routes;
