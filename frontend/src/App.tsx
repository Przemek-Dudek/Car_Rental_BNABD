import './App.css'
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import MainPage from './pages/MainPage/MainPage.tsx'
import CarAddPage from './pages/CarAddPage/CarAddPage.tsx'
import Navbar from './components/Navbar/Navbar'
import { mainPagePath, loginPagePath, carAddPagePath, usersPagePath, reservationsPagePath, registerPagePath, usersRentingsPagePath } from './shared/pagesPaths.ts';
import UsersPage from './pages/UsersPage/UsersPage.tsx';
import ReservationPage from './pages/ReservationPage/ReservationPage.tsx';
import RegisterPage from './pages/RegisterPage/RegisterPage.tsx';
import LoginPage from './pages/LoginPage/LoginPage.tsx';
import UsersRentingsPage from './pages/UsersRentingsPage/UsersRentingsPage.tsx';

function AppContent() {
  const location = useLocation();

  return (  
    <>
      {location.pathname !== loginPagePath && location.pathname !== registerPagePath && <Navbar />}
      <Routes>
        <Route path={mainPagePath} element={<MainPage />} />
        <Route path={carAddPagePath} element={<CarAddPage />} />
        <Route path={usersPagePath} element={<UsersPage/>} />
        <Route path ={reservationsPagePath} element={<ReservationPage />} />
        <Route path={loginPagePath} element={<LoginPage/>} />
        <Route path={registerPagePath} element={<RegisterPage/>} />
        <Route path={usersRentingsPagePath} element={<UsersRentingsPage />} />
      </Routes>
    </>
  )
}

function App() {

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
