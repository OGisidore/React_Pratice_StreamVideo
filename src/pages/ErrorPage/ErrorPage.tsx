/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 09/03/2024 13:09:10
*/
import React, { FC, useEffect,Fragment,  } from 'react';
import './ErrorPage.css';


interface ErrorPageProps {
 
}


const ErrorPage : FC<ErrorPageProps> = () =>{


    // const [state, setState] = useState<any>(null)
   
    // const [value, setValue] = useState('');

    useEffect(() => {
      window.scrollTo(0,0)
      const runLocalData = async () => {

        
      }
      runLocalData()
    },[])

  return (
      <Fragment>
        <div className="ErrorPage">
         <h2> Errord 404</h2>
         <p>page not found !</p>
      </div>
      </Fragment>
    
 
  );
}

export default ErrorPage;