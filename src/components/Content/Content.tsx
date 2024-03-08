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
import { video } from '../../models/video';
import { getAllVideo } from '../../api-video/api-video';
import { convertBlob_toUrl } from '../../helpers/fileshelper';


interface ContentProps {

}


const Content: FC<ContentProps> = () => {


  
  const [displayModal, setDisplayMOdal] = useState<boolean>(false)
  const [videos,setVideos] = useState<video[]>([])

  const runLocalData = async () => {
    const data :any= await getAllVideo()
    if(data.isSuccess){
      data.result.map((d:video)=>{
        d.poster = convertBlob_toUrl(d.poster as Blob)
        d.links = convertBlob_toUrl(d.links as Blob)
        return d
      })
      setVideos(data.result)
    }
    console.log({data});
    


  }
  useEffect(() => {
    window.scrollTo(0,0)
    
    runLocalData()
  },[])

  return (
    <Fragment>
      {
        // loading ?
        // <Loading />
        // :
        <div className="Content row">
          <div className="col border">
            <button className='btn btn-success m-4' onClick={()=>setDisplayMOdal(true)}>
              Add Film
            </button>
            {displayModal && <VideoFormModal
            hideModal={()=>setDisplayMOdal(false)}
            updateData={runLocalData}/>}
            { videos.length !==0 &&  <div className="contain  overflow-auto m-2 p-2 shadow gap-3 row">
              {videos.map((vide)=>{
                return  <div className="col p-0 border" key={vide._id}>
                <div className="poster">
                  <img src={vide.poster as string} alt="" />
                </div>

                <button className='btn btn-success m-1'>view</button>
                <button className='btn btn-primary m-1'>edit</button>
                <button className='btn btn-danger m-1'>Delete</button>
              </div>
              })}

            </div>}


           
          </div>
          <div className="col d-flex align-items-center">
            <div className="description">
              <h2>Le dernier Jaguar</h2>
              <div className="details">
                <span> Author : jesh Dupont </span>
                <span> Category : combat</span>
                <p>
                  <strong> Description</strong>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe ea adipisci unde maiores modi iusto sed praesentium explicabo harum consectetur, ut consequuntur repudiandae aut, fugit error blanditiis. Officia, pariatur corporis.
                </p>
              </div>
            </div>
            <img src="assets/images/film.jpeg" alt="" height={"80%"} />
          </div>

        </div>
      }
    </Fragment>
  );
}

export default Content;