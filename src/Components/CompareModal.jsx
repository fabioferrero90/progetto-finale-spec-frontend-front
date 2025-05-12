import React from 'react'
import { useGlobalContext } from '../Contexts/GlobalContext'
import { useNavigate, useLocation } from 'react-router-dom'

const CompareModal = () => {
    const {compareList, setCompareList} = useGlobalContext()
    const navigate = useNavigate()
    const location = useLocation()

    // Verifica se siamo in una pagina che contiene ProductGrid
    const pagesWithProductGrid = ['/category', '/wishlist']
    const shouldShowModal = pagesWithProductGrid.some(path => location.pathname.includes(path))

    if (compareList.length === 0 || !shouldShowModal) {
        return null
    }

    return (
        <div className="p-3 text-sm fixed flex justify-around items-center bottom-10 right-10 w-[85vw] lg:w-[40vw] xl:w-[20vw] border-0 rounded-2xl bg-white h-[50px] shadow-black shadow-2xl">
            <div className="flex w-full">
                <h3 className="text-nowrap">Confronta prodotti:</h3>
                <span className="pl-3 font-bold">{compareList.length}</span>
            </div>
            <div className="flex w-full">
                <button 
                    className="bg-blue-600 text-white ml-3 px-2 py-1 border-0 rounded-xl cursor-pointer"
                    onClick={() => navigate("/compare")}>
                    <span className="text-nowrap">Confronta</span>  
                </button>
                <button 
                    className="bg-gray-600 text-white ml-3 px-2 py-1 border-0 rounded-xl cursor-pointer"
                    onClick={() => setCompareList([])}>
                        <span className="text-nowrap">Pulisci lista</span>  
                </button>
            </div>
        </div> 
    )
}

export default CompareModal