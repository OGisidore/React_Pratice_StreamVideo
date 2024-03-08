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
import { getAllVideo, getVideo } from '../../api-video/api-video';
import { convertBlob_toUrl } from '../../helpers/fileshelper';
import Views from '../Views/Views';


interface ContentProps {
}


const Content: FC<ContentProps> = ( ) => {

  const [displayModal, setDisplayMOdal] = useState<boolean>(false)
  const [videos, setVideos] = useState<Video[]>([])
  // const [displayModal, setDisplayMOdal] =
  const [currentVideo, setCurrentVideo] = useState<Video|undefined>()

  const [viewVideo, setViewVideo] =  useState<boolean | number>(false)

  const handleView =(video : Video)=>{
    setCurrentVideo(video)
    setViewVideo(true)


    console.log(video)
    
  }
  const handleEdit =(video : Video)=>{
    setCurrentVideo(video)
    setDisplayMOdal(true)

    console.log(video)
    
  }
  const handleAdd =()=>{
    setCurrentVideo(undefined)
    setDisplayMOdal(true)

    
  }
  const runLocalData = async () => {
    const data: any = await getAllVideo()
    if (data.isSuccess) {
      data.result.map((d: Video) => {
        
        d.PosterLink = convertBlob_toUrl(d.poster as Blob)
        d.VideoLink = convertBlob_toUrl(d.links as Blob)
        return d
      })
      setVideos(data.result)
    }
    console.log({ data });



  }

 
  useEffect(() => {
    window.scrollTo(0, 0)
   
    runLocalData()

  }, [])

  return (
    <Fragment>
      {
        // loading ?
        // <Loading />
        // :
        <div className="Content row">
          <div className="col-6 border">
            <button className='btn btn-success m-4' onClick={handleAdd}>
              Add Film
            </button>

            {displayModal &&  <VideoFormModal
              hideModal={() => setDisplayMOdal(false)}
              currentVideo={currentVideo}
              updateData={runLocalData} />}

            {videos.length !== 0 && <div className="contain  overflow-auto m-2 p-2 shadow gap-3 row">
              {videos.map((video) => {
                return <div className="col p-0 border"  key={video._id}>
                  <div className="poster">
                    <img src={video.PosterLink } alt="" />
                  </div>
                  <button className='btn btn-success m-1' onClick={()=>handleView(video)} >view</button>
                  <button className='btn btn-primary m-1' onClick={()=>handleEdit(video)}  >edit</button>
                  <button className='btn btn-danger m-1' >Delete</button>
                </div>
              })}

            </div>}



          </div>
          {viewVideo  &&  currentVideo && <Views videoId={currentVideo._id!}/>}
        </div>
      }
    </Fragment>
  );
}

export default Content;