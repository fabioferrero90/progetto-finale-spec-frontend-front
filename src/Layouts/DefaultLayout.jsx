import {Outlet} from 'react-router-dom'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Notifications from '../Components/Notifications';

const headerMenu = [
  { route: "/", name: "Hej! Accedi", key: "login" },
];

const DefaultLayout = () => {
  return (
    <div>
    <section><Notifications/></section>
    <header><Header headerMenu={headerMenu}/></header>
    <main><Outlet /></main>
    <footer><Footer /></footer>
  </div>
  )
}

export default DefaultLayout

