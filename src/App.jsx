import { createContext, useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Routing from './Approuter/Routing'
import Footer from './components/Footer'

export const loginData = createContext();

function App() {

  const [login, setLogin] = useState({
    status: false,
    user: null,
  });

  // ✅ Restore login after refresh
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser) {
      setLogin({
        status: true,
        user: savedUser
      });
    }
  }, []);

  return (
    <loginData.Provider value={{ login, setLogin }}>
      <Navbar />
      <Routing />
      <Footer />
    </loginData.Provider>
  )
}

export default App