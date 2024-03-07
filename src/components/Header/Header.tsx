/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 07/03/2024 08:43:37
*/
import React, { FC, useEffect, Fragment, useState } from 'react';
// import Loading from '../Loading/Loading';
import './Header.css';


interface HeaderProps {

}


const Header: FC<HeaderProps> = () => {


  const [state, setState] = useState<any>(null)
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {

      setLoading(false)
    }
    runLocalData()
  })

  return (
    
          <div className="Header">
            <nav className="navbar">
              <div className="container-fluid">
                <a className="navbar-brand title" href='p'>Wetube</a>
                <form className="d-flex" role="search">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                  <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
              </div>
            </nav>

          </div>
      
  );
}

export default Header;