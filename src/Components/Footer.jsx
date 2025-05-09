import React from 'react'
import RecallBanner from './Partials/RecallBanner'
import BottomFooter from './Partials/BottomFooter'

const Footer = () => {
  return (
    <>
      <RecallBanner/>
      <div className="bg-gray-50">
        <div className="container flex justify-between pt-12">
          <div className="CTA-section w-1/3 pr-10">
            <div className="py-5">
              <h2 className="font-bold pb-2">Iscriviti a BKEA Family</h2>
              <p className="text-sm text-gray-600 pt-2">Entra nel club per dar vita alla tue idee, avrai accesso a tanti vantaggi, promozioni ed eventi dedicati</p>
              <p className="text-sm text-gray-600 py-3 underline cursor-pointer" href="#">Scopri di piu</p>
              <button className="bg-black text-white px-5 py-3 border-0 rounded-3xl text-xs mt-3 font-semibold">
                Iscriviti e accedi
              </button>
            </div>
            <div className="py-5">
              <h2 className="font-bold pb-2">Entra in BKEA Business Network</h2>
              <p className="text-sm text-gray-600 pt-2">Siamo con te in ogni tua impresa: dalla fattura in cassa alla consulenza d'arredo e tanti altri vantaggi.</p>
              <p className="text-sm text-gray-600 py-3 underline cursor-pointer" href="#">Scopri di piu</p>
              <button className="bg-black text-white px-5 py-3 border-0 rounded-3xl text-xs mt-3 font-semibold">
                Iscriviti e accedi
              </button>
            </div>
          </div>
          <div className="flex footer-menu-section justify-between pt-5 ml-10 w-full">
            <div className="text-sm w-1/4">
              <h2 className="font-bold pb-2">Aiuto e Contatti</h2>
              <ul className="text-gray-600">
                <li className="py-2"><a href="#">Servizio Clienti</a></li>
                <li className="py-2"><a href="#">Servizi di consegna</a></li >
                <li className="py-2"><a href="#">Disponibilità prodotti</a></li>
                <li className="py-2"><a href="#">Cambi e resi</a></li>
                <li className="py-2"><a href="#">Supporto prodotti</a></li>
                <li className="py-2"><a href="#">Pezzi di ricambio</a></li>
                <li className="py-2"><a href="#">Traccia e gestisci il tuo ordine</a></li>
                <li className="py-2"><a href="#">Monitoraggio</a></li>
                <li className="py-2"><a href="#">Garanzie</a></li>
                <li className="py-2"><a href="#">Contattaci</a></li>
                <li className="py-2"><a href="#">Raccontaci la tua esperienza</a></li>
                <li className="py-2"><a href="#">Avvisi importanti e richiami prodotto</a></li>
                <li className="py-2"><a href="#">Tutti i nostri servizi</a></li>
              </ul>
            </div>
            <div className="text-sm w-1/4">
              <h2 className="font-bold pb-2">Acquistare in BKEA</h2>
              <ul className="text-gray-600">
                <li className="py-2"><a href="#">Planner e configuratori</a></li>
                <li className="py-2"><a href="#">Consulenza d'arredo</a></li>
                <li className="py-2"><a href="#">Acquistare in BKEA</a></li>
                <li className="py-2"><a href="#">Brochure</a></li>
                <li className="py-2"><a href="#">I nostri punti vendita</a></li>
                <li className="py-2"><a href="#">App BKEA</a></li>
                <li className="py-2"><a href="#">Acquista da casa</a></li>
                <li className="py-2"><a href="#">BKEA Family</a></li>
                <li className="py-2"><a href="#">Lista regalo BKEA</a></li>
                <li className="py-2"><a href="#">Metodi di pagamento</a></li>
                <li className="py-2"><a href="#">BKEA Business Network</a></li>
                <li className="py-2"><a href="#">Bonus Mobili ed Elettrodomestici</a></li>
              </ul>
            </div>
            <div className="text-sm w-1/4">
              <h2 className="font-bold pb-2">Il mio account</h2>
              <ul className="text-gray-600">
                <li className="py-2"><a href="#">Profilo/Login</a></li>
                <li className="py-2"><a href="#">Il mio profilo BKEA Family</a></li>
                <li className="py-2"><a href="#">Lista dei desideri</a></li>
              </ul>
            </div>
            <div className="text-sm w-1/4">
              <h2 className="font-bold pb-2">A proposito di BKEA</h2>
              <ul className="text-gray-600">
                <li className="py-2"><a href="#">Lavora con noi</a></li>
                <li className="py-2"><a href="#">Questa è BKEA</a></li>
                <li className="py-2"><a href="#">La vita in casa</a></li>
                <li className="py-2"><a href="#">Una vita sana e sostenibile</a></li>
                <li className="py-2"><a href="#">Clima e ambiente</a></li>
                <li className="py-2"><a href="#">Impatto sociale</a></li>
                <li className="py-2"><a href="#">Sala stampa</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <BottomFooter/>
    </>
  )
}

export default Footer