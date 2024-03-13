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


import { Video } from '../../models/video';

import VideoCard from '../../components/VideoCard/VideoCard';

import SearchBox from '../../components/SearchBox/SearchBox';


interface HomeProps {

}


const Home: FC<HomeProps> = () => {


  // const [state, setState] = useState<any>(null)
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<Video[]>([])
 
  



  

  useEffect(() => {
    window.scrollTo(0, 0)
setLoading(false)
    
  }, [])

  return (

    <Fragment>
      {
        loading ?
          <Loading />
          :
          <div className="Home container py-2">
           <SearchBox 
           handleChange={setVideos}/>
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