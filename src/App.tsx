import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import Loading from './components/Loading/Loading';


function App() {
  return (
    <div className="container">
      <Header/>
      <Content/>
      
    </div>
  );
}

export default App;
