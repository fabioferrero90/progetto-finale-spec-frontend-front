import React from 'react';
import { filterNames } from '../../../Data/FilterMapping';

const FilterButton = ({ name, options, onChange }) => {
  const label = filterNames.find(filter => filter.name === name)?.label;

  const handleChange = (e) => {
    onChange(name, e.target.value);
    e.target.value = 'all'; // Resetta il valore del select dopo la selezione
  };

  return (
    <>
      <div className="filter-button relative mr-4">
        <select 
          className="flex font-bold items-center px-3 py-1 text-sm border-0 rounded-2xl hover:bg-gray-100"
          onChange={handleChange}
          defaultValue={'all'}
        >
          <option className="px-2" value="all">{label}</option>
          {options.map((item, index) => {
            if (item === "price_asc" || item === "price_desc") {
              let displayText = item === "price_asc" ? "Prezzo crescente" : "Prezzo decrescente";
              return (
                <option className="px-2" key={index} value={item}>
                  {displayText}
                </option>
              );
            }
            return (
              <option className="px-2" key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};

export default React.memo(FilterButton);