/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 10/03/2024 18:35:19
*/
import React, { FC, useEffect, useState } from 'react';
import './SearchBox.css';
import { useLocation } from 'react-router-dom';
import { convertBlob_toUrl } from '../../helpers/fileshelper';
import { getAllVideo } from '../../api-video/api-video';
import { Video } from '../../models/video';


interface SearchBoxProps {
  handleChange:(videos : Video[])=>void
 
}


const SearchBox : FC<SearchBoxProps> = ({handleChange}) =>{
  const currentSearchParams = new URLSearchParams(window.location.search)
  const searchQuerry = currentSearchParams.get("search") || ''
  const location = useLocation()
  console.log({location});
  const [videos , setVideos] = useState<Video[]>([])

  const runLocalData = async () => {
    const data: any = await getAllVideo()
    if (data.isSuccess) {
      data.result.map((d: Video) => {

        d.PosterLink = convertBlob_toUrl(d.poster as Blob)
        d.VideoLink = convertBlob_toUrl(d.links as Blob)
        return d
      })
      const filtered = data.result.filter((video:Video)=>
      video.title.toLowerCase().includes(searchQuerry.toLowerCase()))

      handleChange(filtered)
      setVideos(filtered)
      

    }
   



  }


    useEffect(() => {
      window.scrollTo(0,0)
      
      runLocalData()
    },[location.search])

  return (
      <div className="SearchBox">
 {
              searchQuerry !== "" && <div className="Home_header">
                <h2>search result</h2>
                <p>Displaying {videos.length} video matching the seach query <strong> "{searchQuerry}"</strong></p>
              </div>

            }      </div>
  );
}

export default SearchBox;