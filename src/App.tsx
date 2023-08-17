import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Products } from './components/Products';
import { Cart } from './components/Cart';


import "@aws-amplify/ui-react/styles.css";
import {
  Authenticator
} from "@aws-amplify/ui-react";


function App() {
  return (
    // We wrap the entire app in the Authenticator component to enable authentication
    <Authenticator>
      {() => (
        <BrowserRouter>

          <Header />
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

export default App;
