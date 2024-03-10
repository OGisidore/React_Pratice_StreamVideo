/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 10/03/2024 13:06:48
*/
import React, { FC, useEffect } from 'react';
import './NotificationComponent.css';
import { Notification } from '../../models/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications } from '../../Reduce/selectors/selectors';
import { REMOVE } from '../../Reduce/types/action';


interface NotificationComponentProps {

}


const NotificationComponent: FC<NotificationComponentProps> = () => {

  const notifications = useSelector(getNotifications)
  const dispatch = useDispatch()



  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {
       notifications.map((notification :Notification)=>{
          setTimeout(() => {
            dispatch({
              type : REMOVE,
              payload : notification
            })
    
      }, notification?.timeout || 2000);

        })
      
    }
    runLocalData()
  })
  
  const handleDeleteNotification = (notification : Notification)=>{

    dispatch({
      type : REMOVE,
      payload : notification
    })
  }

  return (
    <div className="NotificationComponent">
      {
        notifications.map((notification:Notification ) => (
          <div className={`alert alert-${notification.status} alert-dismissible fade show`} role="alert">
           {notification.message}
            <button type="button" onClick={()=>handleDeleteNotification(notification)} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        )

        )
      }

    </div>
  );
}

export default NotificationComponent;