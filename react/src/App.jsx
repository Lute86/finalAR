import { useEffect, useState } from 'react'
import './index.scss'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { useGlobalState } from './context/context';
import Server from './pages/server/Server';
import ServerlessList from './pages/serverlessList/ServerlessList';
import { FaMoon, FaSun } from 'react-icons/fa'
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const {choice } = useGlobalState()
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useLocalStorage('dark-mode', false);
  
  function handleDarkMode() {
    setDarkMode(prevDarkMode => {
      document.getElementById('root').classList.add(!prevDarkMode ? 'dark-mode' : 'light-mode');
      document.getElementById('root').classList.remove(!prevDarkMode ? 'light-mode' : 'dark-mode');
      return !prevDarkMode;
    });
  }

  //Setea local/server
  useEffect(()=>{
    if (choice == "listaLocal") return navigate("/");
    if (choice == "listaServer") return navigate("/server");
  },[choice])

  //Setea modo diurno/nocturo
  useEffect(()=>{
    handleDarkMode()
  }, [])
  


  return (
    <div className='app'>
      <Header/>
      <section className='main-container'>  
        <h1>Lista de tareas</h1>
        <span className='dark-toggle' onClick={handleDarkMode}>{darkMode?<FaSun className='icons-view icon-sun'/>:<FaMoon className='icons-view icon-moon'/>}</span>
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
