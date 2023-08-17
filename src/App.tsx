// src/App.tsx
//import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { Amplify } from 'aws-amplify';
// import awsconfig from './aws-exports'; // Import your Amplify configuration
import { AuthProvider, useAuth } from './AuthContext';
import { Header } from './components/Header';
import { Products } from './components/Products';
import { Cart } from './components/Cart';
import { Login } from './components/Login';
import { Register } from './components/Register'; // Import the Register component


import "@aws-amplify/ui-react/styles.css";

import {
  withAuthenticator,
  Authenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";
// Configure Amplify
//Amplify.configure(awsconfig);

function App({ signOut }) {
  return (
    <Authenticator>
     {({ signOut, user }) => (
    <BrowserRouter>
     
        
        <Header/>
        <main>
          <Routes>
            <Route path="/" element={<Products />} />
            {/* <Route path="/cart" element={<PrivateRoute path="/cart" element={<Cart />} />} /> */}
            <Route path="/cart" element={<Cart />} />
            {/* <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> Add the Register route */}
          </Routes>

        </main>
        
        
    </BrowserRouter>
    )}
    </Authenticator>
  );
}

// PrivateRoute component for protected routes
// const PrivateRoute: React.FC<{ path: string; element: JSX.Element }> = ({
//   path,
//   element,
// }) => {
//   const { user } = useAuth();

//   return user ? <Route path={path} element={element} /> : null;
// };

export default App;
