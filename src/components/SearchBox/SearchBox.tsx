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
import { findVideo, getAllVideo, getVideoByPage } from '../../api-video/api-video';
import { Video } from '../../models/video';
import Pagination from '../Pagination/Pagination';


interface SearchBoxProps {
  handleChange: (videos: Video[]) => void

}
interface resultDatas {
  isSuccess: boolean;
  results?: Record<string, any>[];
  totalPages?: number;
  currentPage?: number;
  nextPage?: number | null;
  previousPage?: number | null;
  pageLinks : string[]
  allCount?: number | null;
}


const SearchBox: FC<SearchBoxProps> = ({ handleChange }) => {
  const currentSearchParams = new URLSearchParams(window.location.search)
  const searchQuerry = currentSearchParams.get("search") || ''
  const pageQuerry = parseInt( currentSearchParams.get("page") || "1")

  const location = useLocation()
  console.log({ location });
  // const [videos, setVideos] = useState<Video[]>([])
  const [datas, setDatas] = useState<resultDatas|null>(null)

  const [cuurrentPage, setCurrentPage] = useState<number>(pageQuerry)
  const [pageSize, setPageSize] = useState<number>(5)

  const runLocalData = async () => {
    const data: any = await findVideo(searchQuerry,"title", cuurrentPage, pageSize)
    setDatas(data)
   
    if (data.isSuccess) {
      data.results.map((d: Video) => {
        d.PosterLink = convertBlob_toUrl(d.poster as Blob)
        d.VideoLink = convertBlob_toUrl(d.links as Blob)
        return d
      })
      // const filtered = data.results.filter((video: Video) =>
      //   video.title.toLowerCase().includes(searchQuerry.toLowerCase()))

      handleChange(data.results)
      // setVideos(data.result)


    }
    console.log(datas?.allCount);
    
  }



  useEffect(() => {
    window.scrollTo(0, 0)

    runLocalData()
  }, [location.search,cuurrentPage,pageSize ])

  return (
    <div className="SearchBox">

      {
        searchQuerry !== "" && <div className="Home_header">
          <h2>search result</h2>
          <p>Displaying {datas?.allCount} video matching the seach query <strong> "{searchQuerry}"</strong></p>
        </div>

      }
      <div className="d-flex justify-content-between">
         <Pagination
      currentPages={datas?.currentPage}
      totalPage={datas?.totalPages}
      pageLink={datas?.pageLinks}
      nextPage={datas?.nextPage}
      onPageChange={setCurrentPage}
      previousPage ={datas?.previousPage} />
      <div>
        <select name="pageSize" id="pageSize" className='form-control'
        onChange={(e)=>setPageSize(parseInt(e.target.value))}>
          <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      </div>
      
      </div>
        </div>
  );
}

export default SearchBox;

/**
 * searchByTag(
 * tableName: string,
 *  searchField: string,
 *  keyword: string,
 *  currentPage: number,
 *  pageSize: number
 * ): Promise<{
 *  isSuccess: boolean;
 *  results?: Record<string, any>[];
 *  totalPages?: number;
 *  currentPage?: number;
 *  nextPage?: number | null;
 *  previousPage?: number | null;
 *  resultCount?: number | null;
 *  allCount?: number | null
 * ; pageLinks?: string[];
 *  }>
 */