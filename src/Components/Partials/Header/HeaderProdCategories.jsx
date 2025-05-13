import React from 'react';
import {Categories} from '../../../Data/Categories';
import { useNavigate } from 'react-router-dom';

const HeaderProdMenu = [
  "Esplora gli ambienti",
  "Offerte",
  "Ispirazione",
  "BKEA for Business",
  "Servizi e Progettazione",
  "Altro"
]

const HeaderProdCategories = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="container">
        <div className="flex justify-start gap-3">
          <span className="font-bold custom-hl pb-2">Acquista i Prodotti</span>
          {HeaderProdMenu.map((menuItem, index) => (
            <button key={index} className="cursor-pointer text-gray-600 pb-3 hover:text-black">{menuItem}</button>
          ))}
        </div>
        <div className="flex flex-wrap gap-10">
          {Categories.map((category, index) => (
            <div key={index} className="flex flex-col items-center gap-2 cursor-pointer hover:underline" onClick={() => (navigate(`/category/${category.slug}`))}>
              <img src={`/imgs/categories/${category.img}`} alt={category.name} width="100px"/>
              <span className="text-xs">{category.name}</span>
            </div>
          ))}
        </div>
      </div>

    </>
    
  )
}

export default React.memo(HeaderProdCategories);