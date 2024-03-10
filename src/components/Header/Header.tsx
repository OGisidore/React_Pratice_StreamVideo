/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 07/03/2024 08:43:37
*/
import React, { FC, useEffect,  useState } from 'react';

import './Header.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';



interface HeaderProps {

}


const Header: FC<HeaderProps> = () => {


  const [state, setState] = useState<any>(null)
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState('');

const  handleAddMotif = ()=>{
 

}

  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {

      setLoading(false)
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
             <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
          <button className="btn btn-outline-success" type="submit">Add Modif</button>
          </div>


         
        </div>
      </nav>

    </div>

  );
}

export default Header;