/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 09/03/2024 18:37:16
*/
import React, { FC, useEffect, useState } from 'react';
import './UploadModal.css';
import { Modal} from 'react-bootstrap';
import FileDrop from '../FileDrop/FileDrop';
import { Video } from '../../models/video';
import { convertFile_toBlob, linkToBlob } from '../../helpers/fileshelper';
import Loading from '../Loading/Loading';
import { addVideo } from '../../api-video/api-video';


interface UploadModalProps {
  hideModal:()=>void
  updateData:()=>void
 
}


const UploadModal : FC<UploadModalProps> = ({hideModal,updateData}) =>{
  const [isLoading , setIsLoading] = useState<boolean>(false)

const handleFileDrop = async (files : File[])=>{
  setIsLoading(true)
  try {
    await Promise.all( files.map( async (file)=>{
    const filesNameParts = file.name.split('.')
    const extension = filesNameParts.pop()
    const title = filesNameParts.join(' ')
    const videoBlob = await convertFile_toBlob(file)
    const imageLink = window.origin + "/assets/images/film.jpeg"
    const posterBlob = await linkToBlob(imageLink)

    const video : Video = {
      title: title,
      description : title,
      links : videoBlob,
      created_at : new Date(),
      poster : posterBlob ,
      category : "divers",
      isAvailable : false,
    }

    await addVideo(video)
    console.log(video);
    
  }))
  updateData()
  hideModal()
  } catch (error) {
    console.error("une erreur s'est produit lors du traitement des fichiers : ", error)
    
  }
 
  setIsLoading(false)
}

    useEffect(() => {
      window.scrollTo(0,0)
      const runLocalData = async () => {

      }
      runLocalData()
    })

  return (
      <div className="UploadModal">
         <Modal show={true} size='lg' centered >
            <Modal.Header>
              <Modal.Title>
               <h2>upload Video</h2>
              </Modal.Title>

              <button onClick={hideModal} className='btn btn-close'></button>
            </Modal.Header>
           <Modal.Body>
            {
              isLoading ?
              <Loading/> :
              <FileDrop onFileDrop={handleFileDrop}/>
           
            }
            

           </Modal.Body>
          </Modal>
      </div>
  );
}

export default UploadModal;