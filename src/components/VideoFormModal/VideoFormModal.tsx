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
import { video } from '../../models/video';


interface VideoFormModalProps {
  hideModal: () => void

}


const VideoFormModal: FC<VideoFormModalProps> = ({ hideModal }) => {



  const [formData, setFormData] = useState<video>({
    title: "",
    description: "",
    poster: null,
    links: null,
    category: "",
    isAvailable: true,


  })
  const [formsErrors, setFormErrors] = useState<Record<string,string>>({})
  const handleInputChange = (event: any) => {
    const { name, value, type, files, checked } = event.target
    const newValue: any = formData
    if (type === "checkbox") {
      newValue[name] = checked
    } else if (type === "file") {
      newValue[name] = files[0]
    } else {
      newValue[name] = value
    }
    // console.log(newValue);


    setFormData(newValue)

  }
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
    return Object.keys(errors).length === 0 
  }
  const handleSubmit = (event: any) => {
    event.preventDefault()
    if (!validateForm()) {
      return
    }
  }


  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {


    }
    runLocalData()
  })

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
            <Modal.Body>
              <form action="">
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
                    type="file"
                    name='poster'
                    className={`form-control ${formsErrors.poster ? "is-invalid" : ""}`}
                    onChange={handleInputChange}
                  />
                  {formsErrors.poster && <div className='invalid-feedback'>{formsErrors.poster}</div>}

                </div>
                <div className="input-group  py-3">
                  <label htmlFor="Video" className="form-label m-1">Video</label>
                  <input
                    type="file"
                    name='links'
                    className={`form-control ${formsErrors.links ? "is-invalid" : ""}`}
                    onChange={handleInputChange}
                  />
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


              </form>

            </Modal.Body>
            <Modal.Footer>
              <button onClick={hideModal} className='btn btn-danger'>Cancel</button>
              <button className='btn btn-success' onClick={handleSubmit}>Save</button>
            </Modal.Footer>

          </Modal>
        </div>
      }
    </Fragment>
  );
}

export default VideoFormModal;