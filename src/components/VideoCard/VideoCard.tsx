/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 09/03/2024 14:41:30
*/
import React, { FC, useEffect } from 'react';
import './VideoCard.css';
import { Video } from '../../models/video';
import { Link } from 'react-router-dom';


interface VideoCardProps {
  video:Video
 
}


const VideoCard : FC<VideoCardProps> = ({video}) =>{



   
  return (
    <div key={video._id} className=" videoCard col-lg-4 col-md-6 p-1">
      <Link to={"/reader/" + video.slug}>
         <div className="card carte">
      <img src={video.PosterLink} className='card-img-top' alt={video.title} />
      <div className="card-body">
        <h5 className="card-title">{video.title}</h5>
        <p className='card-text'>{video.created_at?.toDateString()}</p>
      </div>
    </div>
      </Link>
   
  </div>
  );
}

export default VideoCard;