import { Outlet, Navigate } from 'react-router-dom';
import FooterComponent from '../footer-component';
import HeaderComponent from '../header-component';

export default function HeaderLayout() {
  const token = localStorage.getItem('TOKEN')
  let auth = { token: token};
  
  if(auth.token) 
    return (<>
        <HeaderComponent />
        <Outlet />
        <FooterComponent />
      </>) 
  else 
    return <Navigate to="/" /> 
}