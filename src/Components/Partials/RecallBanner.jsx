import React from 'react'

const RecallBanner = () => {
  return (
    <div className="container py-12">
      <div className="bg-black text-white p-7 flex justify-between">
        <div>
          <h2 className="text-2xl font-bold">Richiamo prodotti dal mercato</h2>
          <p>Avvisi importanti e ritiri dal mercato relativi a prodotti BKEA</p>
        </div>
        <div>
          <button className="border-2 border-white rounded-3xl px-4 py-2 text-sm">Visualizza tutti i richiami</button>
        </div>
      </div>
    </div>
  )
}

export default RecallBanner