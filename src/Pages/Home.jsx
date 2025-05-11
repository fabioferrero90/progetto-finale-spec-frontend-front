
import { useState } from 'react';

const Home = () => {
  const featuredItems = [
    {
      id: 1,
      title: "Scegli il tuo stile e goditi il tuo spazio all'aperto",
      image: "./imgs/home/image_0.39af1a014227cab6e281.avif",
      link: "#",
      product: {
        name: "NÄMMARÖ",
        description: "Lampadario da salotto",
        price: "€55"
      }
    },
    {
      id: 2,
      title: "La collezione STOCKHOLM 2025 è tornata",
      image: "./imgs/home/PH189345.avif",
      link: "#",
      tag: "Novità"
    },
    {
      id: 3,
      title: "Scegli la consegna dei mobili in casa a €59",
      image: "./imgs/home/PH169922.avif",
      link: "#"
    }
  ];

  const currentOffers = [
    {
      id: 1,
      title: "Partecipa al concorso \"Ciak, si vince con BKEA\"",
      image: "/imgs/home/webimage-PH185492.avif",
      link: "#"
    },
    {
      id: 2,
      title: "Lo sconto è servito",
      image: "/imgs/home/PH203262.avif",
      link: "#",
      tag: "BKEA Family"
    },
    {
      id: 3,
      title: "Goditi subito i tuoi acquisti, pagali con calma a tasso zero",
      image: "/imgs/home/SE-ENERGY029-crop-43.webp",
      link: "#"
    },
    {
      id: 4,
      title: "Scopri tutte le nostre soluzioni energetiche",
      image: "/imgs/home/-SE-ENERGY018-crop-11.webp",
      link: "#"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-8">Ti diamo il benvenuto in BKEA</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="relative md:col-span-1 lg:col-span-2 row-span-2 bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={featuredItems[0].image} 
              alt={featuredItems[0].title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-black/50 to-transparent">
              <h2 className="text-white text-xl font-semibold mb-2">{featuredItems[0].title}</h2>
              <a href={featuredItems[0].link} className="text-white flex items-center">
                <span>Scopri di più</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
            
            {featuredItems[0].product && (
              <div className="absolute top-1/2 right-8 bg-white p-3 rounded-lg shadow-md max-w-[200px]">
                <h3 className="font-bold">{featuredItems[0].product.name}</h3>
                <p className="text-sm text-gray-600">{featuredItems[0].product.description}</p>
                <p className="text-xl font-bold mt-1">{featuredItems[0].product.price}</p>
              </div>
            )}
          </div>
          
          {featuredItems.slice(1).map((item) => (
            <div key={item.id} className="relative bg-gray-100 rounded-lg overflow-hidden h-104">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
              {item.tag && (
                <div className="absolute top-4 left-4 bg-orange-500 text-white px-2 py-1 text-sm font-semibold">
                  {item.tag}
                </div>
              )}
              <div className="absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-black/50 to-transparent">
                <h2 className="text-white text-lg font-semibold mb-2">{item.title}</h2>
                <a href={item.link} className="text-white flex items-center">
                  <span>Scopri di più</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">Adesso in BKEA</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentOffers.map((offer) => (
            <div key={offer.id} className="relative bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={offer.image} 
                alt={offer.title} 
                className="w-full h-48 object-cover"
              />
              {offer.tag && (
                <div className="absolute top-4 left-4 bg-blue-500 text-white px-2 py-1 text-sm font-semibold">
                  {offer.tag}
                </div>
              )}
              <div className="p-4">
                <h3 className="text-md font-semibold mb-2">{offer.title}</h3>
                <a href={offer.link} className="text-blue-600 flex items-center">
                  <span>Scopri di più</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;