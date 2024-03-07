/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 07/03/2024 08:44:18
*/
import React, { FC, useEffect,Fragment, useState } from 'react';
// import Loading from '../Loading/Loading';
import './Footer.css';


interface FooterProps {
 
}


const Footer : FC<FooterProps> = () =>{


    // const [state, setState] = useState<any>(null)
    // const [loading, setLoading] = useState(true);
    // const [value, setValue] = useState('');

    // useEffect(() => {
    //   window.scrollTo(0,0)
    //   const runLocalData = async () => {

    //     setLoading(false)
    //   }
    //   runLocalData()
    // },[value])

  return (
    <Fragment>
    {
      // loading ?
      // <Loading />
      // :
      <div className="Footer">
          Footer Component
      </div>
    }
    </Fragment>
  );
}

export default Footer;