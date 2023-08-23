import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import PageNotFound from './components/PageNotFound';
import { ToastContainer } from "react-toastify";
import Profile from './components/Profile';
import Products from './components/Products';
import Cart from './components/Cart';

function App() {
  return (
    <Router>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/products' element={<Products />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>

  );
}

export default App;
