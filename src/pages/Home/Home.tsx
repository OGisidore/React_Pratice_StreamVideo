/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 09/03/2024 11:37:20
*/
import React, { FC, useEffect, Fragment, useState } from 'react';
// import Loading from '../Loading/Loading';
import './Home.css';
import Loading from '../../components/Loading/Loading';
import Content from '../../components/Content/Content';
import { getAllVideo } from '../../api-video/api-video';
import { Video } from '../../models/video';
import { convertBlob_toUrl } from '../../helpers/fileshelper';
import VideoCard from '../../components/VideoCard/VideoCard';


interface HomeProps {

}


const Home: FC<HomeProps> = () => {


  // const [state, setState] = useState<any>(null)
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<Video[]>([])
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
   



  }

  useEffect(() => {
    window.scrollTo(0, 0)

    runLocalData()
  }, [])

  return (

    <Fragment>
      {
        loading ?
          <Loading />
          :
          <div className="Home container py-2">
            <div className="row ">
              {
                videos.map((video: Video) => (
                 <VideoCard key={video._id} video={video}/>
                ))
              }
            </div>
          </div>
      }
    </Fragment>
  );
}

export default Home;