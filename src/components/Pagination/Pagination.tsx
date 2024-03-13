/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 13/03/2024 09:53:15
*/
import React, { FC, useEffect } from 'react';
import './Pagination.css';
import { Link, useNavigate } from 'react-router-dom';


interface PaginationProps {
  currentPages?: number
  totalPage?: number
  nextPage?: number | null
  previousPage?: number | null
  pageLink?: string[]
  onPageChange?: (page: number) => void

}


const Pagination: FC<PaginationProps> = ({ currentPages, totalPage, nextPage, previousPage, pageLink, onPageChange }) => {
  const links = pageLink?.map((page) => parseInt(page.split("=")[1]))
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {

    }
    runLocalData()
  })


  const handleClick = (event: any, page?: number | null) => {
    event.preventDefault()
    console.log({ page });


    if (page) {
      onPageChange && onPageChange(page)
      const currentSearchParams = new URLSearchParams(window.location.search)
      currentSearchParams.set("page", page.toString())
      navigate({
        search: currentSearchParams.toString()
      })
    }

  }
  const renderPageNumbers = () => {
    let newLinks = links
    newLinks = newLinks?.filter((page: number) => (page >= currentPages! - 2) && (page <= currentPages! + 2))
    return newLinks?.map((pageNumber: number, index: number) => (
      <li className="page-item" key={index}>
        <a
          className={"page-link" + (currentPages === pageNumber ? " active" : "")}
          href={"?page=" + pageNumber}
          onClick={(event) => handleClick(event, pageNumber)}
        >
          {pageNumber}
        </a>
      </li>
    ))
  }

  return (
    <div className="Pagination">
      <div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item"
              onClick={(event) => handleClick(event, previousPage)}
            >
              <Link className="page-link"
                to={"?page=" + previousPage}>Previous</Link></li>
            {
              currentPages! > 3 &&
              <>
              <li className="page-item" >
                <a className={"page-link" }
                  onClick={(event) => handleClick(event, 1)}
                >
                  {1}
                </a>
              </li>
               <li className="page-item" >
               <a className="page-link" >
                 ...
               </a>
             </li> 
              </>
              
                }
            {
              renderPageNumbers()
            }
             {
              currentPages! < (totalPage! - 2) &&
              <>
              <li className="page-item" >
               <a className="page-link" >
                 ...
               </a>
             </li>
              <li className="page-item" >
                <a className={"page-link" }
                  onClick={(event) => handleClick(event, totalPage)}
                >
                  {totalPage}
                </a>
              </li>
                
              </>
              
                }


            <li className="page-item"
              onClick={(event) => handleClick(event, nextPage)}><Link className="page-link" to={"?page=" + nextPage}>Next</Link></li>
          </ul>
        </nav>
      </div>

    </div>
  );
}

export default Pagination;