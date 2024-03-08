/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 08/03/2024 11:58:34
*/
import React, { FC, useEffect, useState } from 'react';
import './Views.css';
import { Video } from '../../models/video';
import { getVideo } from '../../api-video/api-video';
import { convertBlob_toUrl } from '../../helpers/fileshelper';
import Loading from '../Loading/Loading';
import { OuitubePlayer } from 'ouitube-player';


interface ViewsProps {
  videoId: number

}


const Views: FC<ViewsProps> = ({ videoId }) => {

  const [video, setVideo] = useState<Video | null>(null)
  const [isloading, setIsloading] = useState<boolean>(true)


  const runLocalData = async () => {




    const data: any = await getVideo(videoId)

    if (data.isSuccess) {
      const currentData = data.result

      currentData.poster = convertBlob_toUrl(currentData.poster as Blob)
      currentData.links = convertBlob_toUrl(currentData.links as Blob)
      setVideo(currentData)
    } else {
      // gestion des erreurs
    }
    setIsloading(false)
  }


  useEffect(() => {
    window.scrollTo(0, 0)

    runLocalData()
  },[videoId])

  return (

    <div className="col d-flex align-items-center justify-content-center">
      {
        isloading ?
          <Loading />
          :
          video ? 
              <div className="description">
              <h2>{video.title}</h2>
              <div className="section1 d-flex">
              <div className="details">
                <p> <strong>Author</strong> : jesh Dupont </p>
                <p> <strong>Category</strong> : {video.category}</p>
                <p> <strong> Description</strong></p>
                <p>
                  {video.description}
                </p>
              </div>
              <div className="image">
              <h2> Poster</h2>
              <img src={video.poster as string} alt="" width={"80%"} className='img-fluid' />
              </div>
              </div>
              <div className="vide p-2">
                <h3>video</h3>
                <OuitubePlayer src={video.links as string} />
              {/* <video src={video.links as string} controls width={"100%"}></video> */}

              </div>
              
              
            </div>
            
            :
            <p>error</p>
      }

    </div>


  );
}

export default Views;