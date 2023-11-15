import { Outlet } from 'react-router-dom';
import FooterComponent from '../footer-component';
import HeaderComponent from '../header-component';

export const HeaderLayout = () => (
  <>
    <HeaderComponent />
    <Outlet />
    <FooterComponent />
  </>
);