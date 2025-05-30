import HeaderTopBar from "./Partials/Header/HeaderTopBar"
import HeaderProdCategories from "./Partials/Header/HeaderProdCategories"
import { RiShoppingBasketLine } from "react-icons/ri";
import { FaRegHeart, FaRegUser, FaSearch } from "react-icons/fa";
import React, { useState, useRef, useEffect } from "react";
import { useGlobalContext } from "Contexts/GlobalContext";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchQuery = useRef();
  const searchRef = useRef();
  const { wishlist, cart } = useGlobalContext();

  const popularSearches = [
    "letto",
    "divano"
  ];

  const handleSearchFocus = () => {
    setIsSearchActive(true);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsSearchActive(false);
    }
  };

  useEffect(() => {
    if (isSearchActive) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchActive]);

  return (
    <>
      <HeaderTopBar />
      <div className="container flex justify-between py-7 w-full gap-5">
        <div className="left-header flex justify-center items-center w-full">
          <div className="logo">
            <a href="/">
              <img className="mr-4" src="/imgs/Bkea_logo.svg" alt="Bkea Logo" width="90px" />
            </a>
          </div>
          <div className="search z-20 w-full" ref={searchRef}>
            <div
              className="mx-4 search-inactive flex items-center border-0 bg-gray-100 border-gray-300 rounded-3xl py-2 px-3 cursor-pointer w-full"
              onClick={handleSearchFocus}
            >
              <FaSearch className="text-gray-500 mr-2" />
              <span className="text-gray-500">Cosa stai cercando?</span>
            </div>

            {isSearchActive && (
              <>
                <div className="fixed inset-0 bg-black/15 z-10" onClick={() => setIsSearchActive(false)}></div>
                <div className="search-modal fixed top-0 left-[10vw] right-0 z-20 mt-17 bg-white rounded-xl shadow-lg border border-gray-200 w-[80vw]">
                  <form action="/results" className="relative flex items-center p-2 border-b border-gray-200">
                    <div className="absolute left-5 text-gray-500">
                      <FaSearch />
                    </div>
                    <input
                      className="border-0 py-2 pl-10 pr-10 w-full focus:outline-none"
                      type="text"
                      placeholder="Cosa stai cercando?"
                      autoFocus
                      ref={searchQuery}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (searchQuery.current.value.trim() !== "") {
                            setIsSearchActive(false);
                            navigate(`/results?query=${searchQuery.current.value}`);
                          }
                        }
                      }}
                    />
                    <button type="submit" className="hidden"><i className="fa-solid fa-magnifying-glass"></i></button>
                  </form>

                  <div className="search-content">

                    <div className="popular-searches p-2">
                      {popularSearches.map((search, index) => (
                        <div
                          key={index}
                          className="search-item p-2 hover:bg-gray-100 flex items-center"
                          onClick={() => {

                            navigate(`/results?query=${search}`);
                            setIsSearchActive(false);
                          }}
                        >
                          <FaSearch className="mr-2 text-gray-500" />
                          <span className="cursor-pointer">{search}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="right-header flex items-center text-nowrap">
          <div className="login hover:bg-gray-100 py-1 px-3 border-0 rounded-2xl cursor-pointer">
            <a onClick={() => navigate("/admin")}>
              <FaRegUser className="inline text-2xl pr-2" />
              <span className="hidden lg:inline text-sm">Hej! Gestisci i Prodotti</span>
            </a>
          </div>
          <div className="wishlist hover:bg-gray-100 p-2 border-0 rounded-2xl relative cursor-pointer">
            <a onClick={() => navigate("/wishlist")}>
              <FaRegHeart />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </a>
          </div>
          <div className="cart hover:bg-gray-100 p-2 border-0 rounded-2xl relative cursor-pointer">
            <a onClick={() => navigate("/cart")}>
              <RiShoppingBasketLine className="text-xl" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </a>
          </div>
        </div>
      </div>
      {!location.pathname.includes("/admin") && (
        <HeaderProdCategories />
      )}
    </>
  )
}

export default React.memo(Header);