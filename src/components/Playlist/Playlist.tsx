/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 09/03/2024 15:18:47
*/
import React, { FC, useEffect, useState } from 'react';
import './Playlist.css';
import { Video } from '../../models/video';
import { getAllVideo } from '../../api-video/api-video';
import { convertBlob_toUrl } from '../../helpers/fileshelper';
import PlaylistItem from '../PlaylistItem/PlaylistItem';


interface PlaylistProps {
  videoId : number
 
}


const Playlist : FC<PlaylistProps> = ({videoId}) =>{
  const [videos, setVideos] = useState<Video[]>([])
  const[loading , setLoading] = useState <boolean>(true)

  
  const runLocalData = async () => {
    const data: any = await getAllVideo()
    if (data.isSuccess) {
      console.log(data.result)
        data.result.map((d: Video) => { 
        d.PosterLink = convertBlob_toUrl(d.poster as Blob)
        d.VideoLink = convertBlob_toUrl(d.links as Blob)
        return d
      })
      setVideos(data.result)
      setLoading(false)

    }
    



  }




    useEffect(() => {
      window.scrollTo(0,0)
      
      runLocalData()
    },[])

  return (
      <div className="Playlist">
        {
          videos.map((video:Video)=> <PlaylistItem key={video._id} currentVideoID={videoId} video={video}/>)
        }
      </div>
  );
}

export default Playlist;