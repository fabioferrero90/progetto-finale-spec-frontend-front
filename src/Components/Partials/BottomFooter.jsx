import { FaFacebook, FaInstagram, FaPinterest, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";


const BottomFooter = () => {
  return (
    <div className="bg-gray-50">
      <div className="container py-8 flex items-center gap-6">
        <div className="social-media flex gap-6">
          <FaFacebook className="text-gray-500 inline text-3xl p-1 cursor-pointer hover:border-2 border-gray-300 rounded-3xl"/>
          <FaInstagram className="text-gray-500 inline text-3xl p-1 cursor-pointer hover:border-2 border-gray-300 rounded-3xl"/>
          <FaPinterest className="text-gray-500 inline text-3xl p-1 cursor-pointer hover:border-2 border-gray-300 rounded-3xl"/>
          <FaXTwitter className="text-gray-500 inline text-3xl p-1 cursor-pointer hover:border-2 border-gray-300 rounded-3xl"/>
          <FaYoutube className="text-gray-500 inline text-3xl p-1 cursor-pointer hover:border-2 border-gray-300 rounded-3xl"/>
        </div>
        <div className="payments flex gap-6">
          <img src="/src/assets/imgs/payments/master-card.svg" alt="mastercard payment" />
          <img src="/src/assets/imgs/payments/visa.svg" alt="visa payment" />
          <img src="/src/assets/imgs/payments/american-express.svg" alt="amex payment" />
          <img src="/src/assets/imgs/payments/paypal.svg" alt="paypal payment" />
          <img src="/src/assets/imgs/payments/ikea-gift-card.svg" alt="giftcard payment" />
          <img src="/src/assets/imgs/payments/apple-pay.svg" alt="applepay payment" />
          <img src="/src/assets/imgs/payments/google-pay.svg" alt="googlepay payment" />
          <img src="/src/assets/imgs/payments/master-card-id-check.svg" alt="mc-idcheck payment" />
          <img src="/src/assets/imgs/payments/visa-secure.svg" alt="visa-secure payment" />
          <img src="/src/assets/imgs/payments/american-express-safe-key.svg" alt="amex-esk payment" />
        </div>
        <div className="ml-auto">
          <button className="border-2 rounded-4xl px-3 py-2 flex">
            <TbWorld className="text-xl"/>
            <span className="px-2 text-sm">IT</span>
            <span className="px-2 text-sm">|</span>
            <span className="text-sm">Italiano</span>
          </button>
        </div>
      </div>
      <hr className="container text-gray-200 py-3"/>
      <div className="container flex justify-between py-5">
        <div className="pb-5 text-gray-600 text-xs font-semibold">
          <p>© 2025 BKEA. All rights reserved - Made by Fabio Ferrero.</p>
        </div>
        <nav>
          <ul className="text-xs flex gap-6 flex-wrap justify-end">
            <li><a className="cursor-pointer" href="#">Condizioni di Vendita</a></li>
            <li><a className="cursor-pointer" href="#">Privacy Policy</a></li>
            <li><a className="cursor-pointer" href="#">Informativa sui Cookies</a></li>
            <li><a className="cursor-pointer" href="#">Impostazione dei Cookie</a></li>
            <li><a className="cursor-pointer" href="#">Responsible Disclosure</a></li>
            <li><a className="cursor-pointer" href="#">Modello 231</a></li>
            <li><a className="cursor-pointer" href="#">Whistleblowing</a></li>
            <li><a className="cursor-pointer" href="#">Segnala una preoccupazione</a></li>
          </ul>
        </nav>
      </div>
      <p className="container text-gray-600 text-xs pb-10 leading-5">
      TASSO ZERO: Fino a 30 mesi importo finanziabile da €49 a €15.000. Prima rata a 30 giorni - Esempio: €1.500 (importo totale del credito) in 30 rate da € 50 - TAN fisso 0% TAEG 0%. Il TAEG rappresenta il costo totale del credito espresso in percentuale annua e in certi casi può essere diverso da zero esclusivamente per effetto di arrotondamento decimale. Tutti i costi azzerati - Importo totale dovuto €1.500. Offerta valida dal 27/08/2024 al 31/08/2025. Messaggio pubblicitario con finalità promozionale. Per le informazioni precontrattuali richiedere sul punto vendita il documento “Informazioni europee di base sul credito ai consumatori” (SECCI) e copia del testo contrattuale. Salvo approvazione della finanziaria per cui BKEA opera come intermediario del credito non in esclusiva.
      </p>
    </div>
  )
}

export default BottomFooter