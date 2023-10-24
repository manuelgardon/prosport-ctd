import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PaymentPage from './pages/PaymentPage'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {

  // app
  return (
    <BrowserRouter> 
      <Header />
        <Routes>
          <Route path='/'>
            <Route index element={<IndexPage />}></Route>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/register' element={<RegisterPage />}></Route>
            <Route path='/payment' element={<PaymentPage />}></Route>
          </Route>
        </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App
