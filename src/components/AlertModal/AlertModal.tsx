/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 09/03/2024 09:18:14
*/
import React, { FC, useEffect } from 'react';
import './AlertModal.css';
import { Modal } from 'react-bootstrap';

import { deleteVideo } from '../../api-video/api-video';
import { Video } from '../../models/video';
import { initNotification } from '../../helpers/notificationHelper';
import { ADD } from '../../Reduce/types/action';
import { useDispatch } from 'react-redux';


interface AlertModalProps {

  hideModal: () => void
  updateData: () => void
  currentVideo?: Video


}


const AlertModal: FC<AlertModalProps> = ({ hideModal, updateData, currentVideo }) => {
  const dispatch = useDispatch()

  const runLocalData = async () => {
    await deleteVideo(currentVideo?._id!)
    hideModal()
    updateData()
    initNotification(dispatch, ADD, "Error , please again later !", "danger")

  }


  useEffect(() => {
    window.scrollTo(0, 0)


  })

  return (
    <div className="AlertModal">
      <Modal show={true} size='lg' >
        <Modal.Header>
          <Modal.Title>
            Deleting
          </Modal.Title>
          <button onClick={hideModal} className='btn btn-close'></button>
        </Modal.Header>
        <Modal.Body className=' body overflow-auto'>
          <p>Are you sure you want to delete this video?

          </p>
          <p> Title : <strong> {currentVideo?.title}</strong></p>


        </Modal.Body>
        <Modal.Footer>
          <button onClick={hideModal} className='btn btn-danger'>Cancel</button>
          <button onClick={runLocalData} className='btn btn-success'>confirm</button>
        </Modal.Footer>

      </Modal>      </div>
  );
}

export default AlertModal;