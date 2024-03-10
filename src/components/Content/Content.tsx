/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 07/03/2024 08:44:18
*/
import React, { FC, useEffect, Fragment, useState } from 'react';
// import Loading from '../Loading/Loading';
import './Content.css';
import VideoFormModal from '../VideoFormModal/VideoFormModal';
import { Video } from '../../models/video';
import { getAllVideo } from '../../api-video/api-video';
import { convertBlob_toUrl } from '../../helpers/fileshelper';
import Views from '../Views/Views';
import AlertModal from '../AlertModal/AlertModal';
import Loading from '../Loading/Loading';
import UploadModal from '../UploadModal/UploadModal';


interface ContentProps {
}


const Content: FC<ContentProps> = ( ) => {

  const [displayModal, setDisplayMOdal] = useState<boolean>(false)
  const [videos, setVideos] = useState<Video[]>([])
  const[loading , setLoading] = useState <boolean>(true)
  const [alertModal, setAlertModal] = useState<boolean>(false)
  const [currentVideo, setCurrentVideo] = useState<Video|undefined>()
  const[uploadModal, setUploadModal] = useState(true)
  const [viewVideo, setViewVideo] =  useState<boolean | number>(false)
// 
  const handleView =(video : Video)=>{
    setCurrentVideo(video)
    setViewVideo(true)
    console.log(video)
  }
  // 
  const handleEdit =(video : Video)=>{
    setCurrentVideo(video)
    setDisplayMOdal(true)
    console.log(video)
    
  }
  // 
  const handleDelete=(video : Video)=>{
    setCurrentVideo(video)
    setAlertModal(true)
  }
// 
  const handleAdd =()=>{
    setCurrentVideo(undefined)
    setDisplayMOdal(true)
  }
  // 
  const handleUpload =()=>{
    setCurrentVideo(undefined)
   setUploadModal(true)
     
  }
  // 
  const runLocalData = async () => {
    const data: any = await getAllVideo()
    if (data.isSuccess) {
      data.result.map((d: Video) => {
        
        d.PosterLink = convertBlob_toUrl(d.poster as Blob)
        d.VideoLink = convertBlob_toUrl(d.links as Blob)
        return d
      })
      setVideos(data.result)
      setLoading(false)

    }
    console.log({ data });
  }
  // 
  useEffect(() => {
    window.scrollTo(0, 0)
    runLocalData()

  }, [])
// 
  return (
    <Fragment>
      {
        loading ?
        <Loading />
        :
        <div className="container">
          <div className="row">
             <div className="col-6 border">
              <div className="d-flex gap-2 justify-content-between">
                 <button className='btn btn-success m-4' onClick={handleAdd}>
              Add Film
            </button>
            <button className='btn btn-primary m-4' onClick={handleUpload}>
              Add Many Film
            </button>
              </div>
            {displayModal &&  <VideoFormModal
              hideModal={() => setDisplayMOdal(false)}
              currentVideo={currentVideo}
              updateData={runLocalData} />}

              {uploadModal &&  <UploadModal
              hideModal={() => setUploadModal(false)}
              updateData={runLocalData} />}

              {alertModal && currentVideo && <AlertModal
               hideModal={ () =>setAlertModal(false)}
               currentVideo={currentVideo}
               updateData={runLocalData}/>}

            {videos.length !== 0 && <div className="contain overflow-auto m-2 p-2 shadow gap-1 row">
              {videos.map((video) => {
                return <div className="col-5 p-0 overflow-hidden border"  key={video._id}>
                  <div className="poster">
                    <img src={video.PosterLink as string } alt={video.title} />
                  </div>
                  <button className='btn btn-success m-1' onClick={()=>handleView(video)} >view</button>
                  <button className='btn btn-primary m-1' onClick={()=>handleEdit(video)}  >edit</button>
                  <button className='btn btn-danger m-1'  onClick={()=>handleDelete(video)}>Delete</button>
                </div>
              })}

            </div>}

          </div>
          {viewVideo  &&  currentVideo && <Views videoId={currentVideo._id!}/>}
          </div>
         
        </div>
      }
    </Fragment>
  );
}

export default Content;