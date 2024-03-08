import React, { createContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const NotificationContextManager = createContext();

function NotificationContext({ children }) {

    const [ notification,setNotification ] = useState();

    const handleNotification = (msg,type) => {

        if(type === 'success')
        {
            toast.success(msg, {
                position: "top-right"
              });
        }
        else
        {
            toast.error(msg, {
                position: "top-right"
              });
        }

    }

  return (
    <>
        <ToastContainer></ToastContainer>
        <NotificationContextManager.Provider value={handleNotification}>
        { children }
        </NotificationContextManager.Provider>
    </>
  )
}

export default NotificationContext