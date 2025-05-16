import React from 'react'
import { useGlobalContext } from 'Contexts/GlobalContext'

const NotificationModal = () => {
    const { notifications } = useGlobalContext();

    return (
        <div className="fixed bottom-5 left-5 flex flex-col gap-4 z-99">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`flex justify-between items-center gap-8 bg-white py-5 px-8 rounded-2xl shadow-2xl shadow-black transition-all duration-300 w-[85vw] lg:w-[40vw] xl:w-[20vw] translate-x-0 animate-slideIn`}
                >
                    <div className="w-1/4 flex justify-center">
                        <img className="w-[50px]" src="/imgs/notification.gif" alt="notify" />
                    </div>
                    <div className="w-3/4">
                        <p className="font-semibold text-nowrap">{notification.title}</p>
                        <p>{notification.message}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default NotificationModal