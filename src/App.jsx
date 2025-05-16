import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { GlobalProvider } from "./Contexts/GlobalContext";
import DefaultLayout from "./Layouts/DefaultLayout";
import Home from "./Pages/Home";
import Category from "./Pages/Category";
import Product from "./Pages/Product";
import Results from "./Pages/Results";
import NotFound from "./Pages/NotFound";
import Wishlist from "./Pages/Wishlist";
import Compare from "./Pages/Compare";
import Cart from "./Pages/Cart";
import Admin from "./Pages/Admin";
import { useEffect } from "react";

// Funzione per scorrere la pagina al top quando si cambia la route
function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (null);
}

const App = () => {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/results" element={<Results />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
};

export default App