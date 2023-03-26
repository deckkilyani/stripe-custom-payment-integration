import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CheckoutPage from './pages/CheckoutPage'
import PaymentSuccess from './pages/PaymentSuccess'


const App = () => {
  return (

    <BrowserRouter>
    <Routes>
      <Route path='/checkout' element={<CheckoutPage/>}/>
      <Route path='/success' element={<PaymentSuccess/>}/>

    </Routes>
    </BrowserRouter>
  
  )
}

export default App