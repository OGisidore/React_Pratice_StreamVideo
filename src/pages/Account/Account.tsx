/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 09/03/2024 11:37:20
*/
import React, { FC, useEffect,Fragment, useState } from 'react';
// import Loading from '../Loading/Loading';
import './Account.css';
import Loading from '../../components/Loading/Loading';
import Content from '../../components/Content/Content';


interface AccountProps {
 
}


const Account : FC<AccountProps> = () =>{


    // const [state, setState] = useState<any>(null)
    const [loading, setLoading] = useState(true);
    // const [value, setValue] = useState('');

    useEffect(() => {
      window.scrollTo(0,0)
      const runLocalData = async () => {

        setLoading(false)
      }
      runLocalData()
    },[])

  return (
    <Fragment>
    {
      loading ?
      <Loading />
      :
     <Content/>
    }
    </Fragment>
  );
}

export default Account;