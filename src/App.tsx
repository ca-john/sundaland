import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react';

import { Header } from './components/Header'
import { Products } from './components/Products'
import { Cart } from './components/Cart'
import './app.module.scss'
import { AuthProvider } from './AuthContext'; // Import the AuthProvider


function App() {
  
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={<Products />}
          />
          <Route
            path="/cart"
            element={<Cart />}
          />
        </Routes>
      </main>
      
    </BrowserRouter>
  )
}

export default App