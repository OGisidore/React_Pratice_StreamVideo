/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 09/03/2024 15:24:13
*/
import React, { FC, useEffect } from 'react';
import './PlaylistItem.css';
import { Video } from '../../models/video';
import { Link } from 'react-router-dom';


interface PlaylistItemProps {
  video:Video
  currentVideoID : number
 
}


const PlaylistItem : FC<PlaylistItemProps> = ({video, currentVideoID}) =>{


  return (
      <div className="PlaylistItem p-1">
          <Link to={"/reader/" + video.slug} className={ currentVideoID === video._id? "row border currentVideo": "row border" }>
            <div className="col-md-4">
            <img
            width={"100%"}
             src={video.PosterLink as string }
              alt={video.title} />

            </div>
            <div className="col-md-8">
              <strong>{video.title}</strong>
            </div>
          </Link>
      </div>
  );
}

export default PlaylistItem;