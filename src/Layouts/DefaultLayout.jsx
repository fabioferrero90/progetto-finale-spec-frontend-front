import { Outlet } from 'react-router-dom'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import CompareModal from '../Components/CompareModal';
import NotificationModal from '../Components/NotificationModal';
import APIEnabler from '../Components/APIEnabler';

const headerMenu = [
  { route: "/", name: "Hej! Accedi", key: "login" },
];

const DefaultLayout = () => {
  return (
    <div>
      <header><Header headerMenu={headerMenu} /></header>
      <main><Outlet /></main>
      <footer><Footer /></footer>
      <section><CompareModal /></section>
      <section><NotificationModal /></section>
      <section><APIEnabler /></section>
    </div>
  )
}

export default DefaultLayout

