/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 07/03/2024 11:06:20
*/
import React, { FC, useEffect, Fragment, useState } from 'react';
// import Loading from '../Loading/Loading';
import './VideoFormModal.css';
import { Modal } from 'react-bootstrap';
import { Video } from '../../models/video';
import { convertFile_toBlob, convertFile_toLink } from '../../helpers/fileshelper';
import { addVideo } from '../../api-video/api-video';
import Loading from '../Loading/Loading';


interface VideoFormModalProps {
  currentVideo?:Video
  hideModal: () => void
  updateData:()=> void

}


const VideoFormModal: FC<VideoFormModalProps> = ({ currentVideo, hideModal, updateData }) => {

/***********   les states   **************/
/***** state pour previsualiser les videos et images******** */
const [posterPreview, setProsterPreview] = useState<string>( currentVideo?.PosterLink as string || "")
const [videoPreview, setVideoPreview] = useState<string>( currentVideo?.VideoLink as string || "")
const [formsubmitError, setFormSubmitError] = useState<string>("")
const [isSubmitted, setIsSubmitted] = useState<boolean>(false)




  const [formData, setFormData] = useState<Video>( currentVideo || {
    title: "",
    description: "",
    poster: null,
    links: null,
    category: "",
    isAvailable: true,


  })
  const [formsErrors, setFormErrors] = useState<Record<string,string>>({})

  /*******  ***** * fonction permettant de mettre a jour les valeurs des champs de formulaires******** */
  const handleInputChange = async (event: any) => {
    const { name, value, type, files, checked } = event.target
    const newValue: any = formData
    
    if (type === "checkbox") {
      newValue[name] = checked
    } else if (type === "file") {
      const file = files[0]
      const link = await convertFile_toLink(file)
      if(name === "poster"){
        if(!file.type.startsWith("image/")){
          return;
        }
        setProsterPreview(link)
      }
      if(name ==="links"){
        if(!file.type.startsWith("video/")){
          return;
        }
        setVideoPreview(link)
      }
      newValue[name] = file

    } else {
      newValue[name] = value
    }
    // console.log(newValue);


    setFormData(newValue)
    const errors = formsErrors
    delete errors[name]
    setFormErrors({...errors})

  }

/****  fonction de validation de formulaire    *******/
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}
    if (!formData.title.trim()) {
      errors.title = "Title is required"
    }
    if (!formData.description.trim()) {
      errors.description = "Description is required"
    }
    if (!formData.poster) {
      errors.poster = "poster file  is required"
    }
    if (!formData.links) {
      errors.links = "video file is required"
    }
    if (!formData.category.trim()) {
      errors.category = "Please select a category"
    }
    setFormErrors(errors)
    return Object.keys(errors).length === 0 
  }


  /***************** fonction pour la gestion de soumission du formulaires** */
  const handleSubmit = async (event: any) => {
    event.preventDefault()
    if (!validateForm()) {
      return
    }
    try {
      setIsSubmitted(true)
      const video : Video = formData
      
      let result 
      if (currentVideo) {
        if (currentVideo.poster !== video.poster) {
          video.poster = await convertFile_toBlob(video.poster as File)
          
        }else{
          video.poster = currentVideo.poster
        }
        video.updated_at = new Date()
        
      } else{
        video.created_at = new Date()
      video.poster = await convertFile_toBlob(video.poster as File)
      video.links = await convertFile_toBlob(video.links as File)
       result = await addVideo(video)
      }
      if(result.isSuccess){
        setFormData({
          title: "",
          description: "",
          poster: null,
          links: null,
          category: "",
          isAvailable: true,
      

        })
        updateData()
        hideModal()
      }
  
      console.log({result});
      
    } catch (error) {
      setFormSubmitError("Error , please again later !")

      
    }
    setIsSubmitted(false)
   
    
  }


  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {
      setFormData( currentVideo || {
        title: "",
        description: "",
        poster: null,
        links: null,
        category: "",
        isAvailable: true,
    
    
      } )
      


    }
    runLocalData()
  },[currentVideo])

  return (
    <Fragment>
      {


        <div className="VideoFormModal">
          <Modal show={true} size='lg' >
            <Modal.Header>
              <Modal.Title>
                Video form
              </Modal.Title>
              <button onClick={hideModal} className='btn btn-close'></button>
            </Modal.Header>
            <Modal.Body className=' body overflow-auto'>
              {isSubmitted ?
              <Loading/> : 
              <form action="" >
              {formsubmitError && <div className="text-danger">
                {formsubmitError}
              </div>}
              <div className="input-group  py-3">
                <label htmlFor="Title" className="form-label m-1">Title</label>
                <input
                  defaultValue={formData.title}
                  type="text" name='title'
                  className={`form-control ${formsErrors.title ? "is-invalid" : ""}`}
                  onChange={handleInputChange} />
                {formsErrors.title && <div className='invalid-feedback'>{formsErrors.title}</div>}

              </div>
              
              <div className="input-group  py-3">
                <label htmlFor="Description" className="form-label m-1">Description</label>
                <textarea
                  defaultValue={formData.description}
                  name="description"
                  id="description"
                  className={`form-control ${formsErrors.description ? "is-invalid" : ""}`}
                  onChange={handleInputChange} />
                {formsErrors.description && <div className='invalid-feedback'>{formsErrors.title}</div>}


              </div>
              <div className="input-group  py-3">
                <label htmlFor="Poster" className="form-label m-1">Poster</label>
                <input
                accept='image/*'
                  type="file"
                  name='poster'
                  className={`form-control ${formsErrors.poster ? "is-invalid" : ""}`}
                  onChange={handleInputChange}
                />
                {posterPreview && <div className="preview-image">
                  <img className='img-fluid' width={100} src={posterPreview} alt=''/>
                </div> }
                
                {formsErrors.poster && <div className='invalid-feedback'>{formsErrors.poster}</div>}

              </div>
              <div className="input-group  py-3">
                <label htmlFor="Video" className="form-label m-1">Video</label>
                <input
                accept='video/*'
                  type="file"
                  name='links'
                  className={`form-control ${formsErrors.links ? "is-invalid" : ""}`}
                  onChange={handleInputChange}
                />
                {videoPreview && <div className="preview-video">
                  <video src={videoPreview} controls width={"100%"}></video>
                </div> }
                {formsErrors.links && <div className='invalid-feedback'>{formsErrors.links}</div>}
              </div>
              <div className="input-group  py-3" >
                <label htmlFor="Categories" className="form-label m-1">Categories</label>
                <select
                  defaultValue={formData.category}
                  name="category"
                  id="category"
                  className={`form-control ${formsErrors.category ? "is-invalid" : ""}`}
                  onChange={handleInputChange}
                >
                  {formsErrors.category && <div className='invalid-feedback'>{formsErrors.category}</div>}
                  <option value="">select video categories</option>
                  <option value="Politique">Politique</option>
                  <option value="Comedie">Comedie</option>
                  <option value="Romance">Romance</option>
                  <option value="Education">Education</option>
                  <option value="Motivation">Motivation</option>
                  <option value="Famille">Famille</option>
                  <option value="Formation">Formation</option>
                </select>
              </div>
              <div className="form-check form-switch">
                <input
                  // value={formData.isAvailable}
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  name='isAvailable'
                  id="isAvaibility"
                  defaultChecked={formData.isAvailable} />
                <label className="form-check-label" htmlFor="avaibility">Is Available</label>
              </div>


            </form> }
           

            </Modal.Body>
            <Modal.Footer>
              <button onClick={hideModal} className='btn btn-danger'>Cancel</button>
              {
                currentVideo? 
                <button className='btn btn-warning' onClick={handleSubmit}>Update video</button>
                :
                <button className='btn btn-success' onClick={handleSubmit}>Save</button>
              }
              
            </Modal.Footer>

          </Modal>
        </div>
      }
    </Fragment>
  );
}

export default VideoFormModal;