import { useEffect, useState } from 'react'
import axios from 'axios'
import './index.scss'
import { Routes, Route, useNavigate } from 'react-router-dom';
import TareaFormulario from './components/TareaFormulario';
import Header from './components/Header';
import Footer from './components/Footer';
import { useGlobalState } from './context/context';
import Server from './pages/server/Server';
import ServerlessList from './pages/serverlessList/ServerlessList';

function App() {
  const {choice} = useGlobalState()
  const navigate = useNavigate()

  useEffect(()=>{
    if (choice == "listaLocal") return navigate("/");
    if (choice == "listaServer") return navigate("/server");
  },[choice])

  return (
    <div className='app'>
      <Header/>
      <section className='main-container'>  
        <h1>Lista de tareas</h1>
        <Routes>
          <Route path="/" element={<ServerlessList />} />
          <Route path="/server" element={<Server/>} />
          <Route path="*" element={<div>Oops nothing to display</div>} />
        </Routes>
      </section>
      <Footer/>
    </div>
  )
}

export default App
