import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './App.scss';
import 'swiper/swiper.min.css';
import Catalog from './pages/Catalog';
import Detail from './pages/detail/Detail';
import Home from './pages/Home';
import { useContext } from 'react';
import { AuthContext } from './pages/authContext/AuthContext';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import { Navigate } from 'react-router-dom'
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import Profile from './pages/profile/Profile';
import FaceLogin from './pages/faceLogin/FaceLogin';
import BuyPackage from './pages/BuyPackage/BuyPackage';
function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={
          user ? <Home /> : <Navigate to="/login" />}
        />
        <Route exact path='/register' element={
          !user ? <Register /> : <Navigate to="/" />}
        />
        <Route exact path='/login' element={
          !user ? <Login /> : <Navigate to="/" />}
        />

        <Route exact path='/newPassword' element={
          !user ? <ForgotPassword /> : <Navigate to="/" />}
        />

        <Route exact path='/loginAI' element={
          !user ? <FaceLogin /> : <Navigate to="/" />}
        />
        <Route path='/:category/search/:keyword' element={<Catalog />} />
        <Route path='/:category/:type' element={<Catalog />} />
        <Route path='/:category' element={<Catalog />} />
        <Route path='/flim/:Slug' element={<Detail />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path='/buyPackage' element={<BuyPackage/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;