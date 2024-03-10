/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 09/03/2024 14:46:55
*/
import React, { FC, useEffect, useState } from 'react';
// import Loading from '../Loading/Loading';
import './MediaReader.css';
import Loading from '../../components/Loading/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import { seachVideoBySlug } from '../../api-video/api-video';
import { Video } from '../../models/video';
import { OuitubePlayer } from 'ouitube-player';
import { convertBlob_toUrl } from '../../helpers/fileshelper';
import Playlist from '../../components/Playlist/Playlist';


interface MediaReaderProps {
 
}


const MediaReader : FC<MediaReaderProps> = () =>{


    const [video, setVideo] = useState<Video | undefined>()
    const [loading, setLoading] = useState(true);
    const [errorPage, setErrorPage]= useState(false)
    const navigate = useNavigate()
    // un ourque qui permet de recuperer les informations dans les paramettres
    let {slug} = useParams()
   

    
    
    // const [value, setValue] = useState('');
 const runLocalData = async () => {
  if(slug){
    try {
       const data : any = await seachVideoBySlug(slug)
    if(data.isSuccess){
      
      const currentVideo = data.result
      currentVideo.PosterLink = convertBlob_toUrl(currentVideo.poster as Blob)
        currentVideo.VideoLink = convertBlob_toUrl(currentVideo.links as Blob)
      setVideo(currentVideo)
    } else{
      setErrorPage(true)
    }
    } catch (error) {
      setErrorPage(true)
    }
   
   
    
  }
 
        setLoading(false)
      }
    useEffect(() => {
      window.scrollTo(0,0)
     
      runLocalData()
    },[slug])
    if (errorPage) {
      navigate("/error")
      
    }

  return (
    <div className='container-fluid'>
    {
      loading ?
      <Loading />
      :
      video?
      <div className="MediaReader p-2">
         <div className="row">
          <div className="col-md-9">
            <OuitubePlayer src={video.VideoLink as string}/>
            <div className="  ">
            <h2>{video.title}</h2>
            </div>
            <div className="video-description  p-2">
                  {
                    video.description
                  }
            </div>
           
          </div>
          <div className="col-md-3">
            <Playlist 
            videoId={video._id!}/>
          </div>
         </div>
      </div>
      :
      null
    }
    </div>
  );
}

export default MediaReader;