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
import ReservaPage from './pages/ReservaPage'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import FavoritosPage from './pages/FavoritosPage'
import ListaReservas from './pages/ReservasPage'

function App() {

  // app
  return (
    <UserContextProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/'>
              <Route index element={<IndexPage />}></Route>
              <Route path='/login' element={<LoginPage />}></Route>
              <Route path='/register' element={<RegisterPage />}></Route>
              <Route path='/payment' element={<PaymentPage />}></Route>
              <Route path='/account/espacios/new' element={<EspacioFormPage />}></Route>
              <Route path='/account/espacios/:id' element={<EspacioFormPage />}></Route>
              <Route path='/account/espacios' element={<EspaciosPage />}></Route>
              <Route path='/espacio/:id' element={<EspacioPage />}></Route>
              <Route path='/account/reservas/:id' element={<ReservaPage />}></Route>
              <Route path='/account/reservas' element={<ListaReservas />}></Route>
              <Route path='/account/favoritos' element={<FavoritosPage />}></Route>
            </Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </LocalizationProvider>
    </UserContextProvider>
  )
}

export default App