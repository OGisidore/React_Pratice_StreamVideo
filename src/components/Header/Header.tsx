/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 07/03/2024 08:43:37
*/
import React, { FC, useEffect, useState } from 'react';

import './Header.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';



interface HeaderProps {

}


const Header: FC<HeaderProps> = () => {
  const navigate = useNavigate()
  const currentSearchParams = new URLSearchParams(window.location.search)
  const searchQuerry = currentSearchParams.get("search") || ''
    const [searchInput, setSearchInput] = useState<string>(searchQuerry)




const handleSearch = (event:any) =>{
  event.preventDefault()
  const currentSearchParams = new URLSearchParams(window.location.search)
  currentSearchParams.set("search", searchInput)
  navigate({
    search:currentSearchParams.toString()
  })

}
  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {

      // setLoading(false)
    }
    runLocalData()
  })

  return (

    <div className="Header">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link to='/' className="navbar-brand title" >Wetube</Link>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/account">Account</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/account">Home</Link>
              </li>
              
              
            </ul>
             <form
             onSubmit={handleSearch}
              className="d-flex"
               role="search">
            <input
            onChange={(e)=>setSearchInput(e.target.value)}
             className="form-control me-2"
             type="search"
             defaultValue={searchInput}
             placeholder="Search"
             aria-label="Search"
             />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
          <button className="btn btn-outline-success" type="submit">Add nodif</button>
          </div>


         
        </div>
      </nav>

    </div>

  );
}

export default Header;