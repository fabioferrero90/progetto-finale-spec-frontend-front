import React, { useState } from 'react'
import { useGlobalContext } from 'Contexts/GlobalContext'

const APIEnabler = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { isUsingAPI, setIsUsingAPI } = useGlobalContext()

    return (
        <div className="fixed left-0 top-1/2 -translate-y-1/2 flex justify-center items-center">
            <div className={`bg-gray-900 text-white p-4 shadow-lg rounded-r-xl transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} flex`}>
                <div className="flex flex-col items-center gap-4 w-[200px]">
                    <div className="flex justify-between gap-10">
                        <span className="text-sm font-medium">API Mode</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={isUsingAPI}
                                onChange={() => setIsUsingAPI(!isUsingAPI)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    <p className="text-xs pb-2">Se la API Mode è disattivata verranno utilizzati i dati inseriti nel client per la fruizione del sito web, attivala per usare i dati forniti dal server locale.</p>
                </div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-gray-600/50 text-white p-2 shadow-md rounded-r-xl absolute -right-10 shadow-gray-400 cursor-pointer"
                >
                    <svg
                        className={`w-6 h-25 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default APIEnabler