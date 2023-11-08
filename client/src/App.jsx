import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PaymentPage from './pages/PaymentPage'
import Header from './components/Header'
import Footer from './components/Footer'
import EspacioFormPage from './pages/EspacioFormPage'
import EspaciosPage from './pages/EspaciosPage'
import { UserContextProvider } from './UserContext'
import EspacioPage from './pages/EspacioPage'

function App() {

  // app
  return (
    <UserContextProvider>
    <BrowserRouter> 
      <Header />
        <Routes>
          <Route path='/'>
            <Route index element={<IndexPage />}></Route>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/register' element={<RegisterPage />}></Route>
            <Route path='/payment' element={<PaymentPage />}></Route>
            <Route path='/account/espacios/new' element={<EspacioFormPage />}></Route>
            <Route path='/account/espacios/:id' element={<EspacioFormPage/>}></Route>
            <Route path='/account/espacios' element={<EspaciosPage/>}></Route>
            <Route path='/espacio/:id' element={<EspacioPage/>}></Route>
          </Route>
        </Routes>
      <Footer />
    </BrowserRouter>
    </UserContextProvider>
  )
}

export default App