import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PaymentPage from './pages/PaymentPage'

function App() {


  return (
    <BrowserRouter>
    <Routes>
       <Route path='/'>
        <Route index element={<IndexPage/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/register' element={<RegisterPage/>}></Route>
        <Route path='/payment' element={<PaymentPage/>}></Route>
       </Route>

    </Routes>
    </BrowserRouter>
  )
}

export default App
