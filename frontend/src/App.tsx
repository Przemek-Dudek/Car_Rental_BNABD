import './App.css'
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import MainPage from './pages/MainPage/MainPage.tsx'
import CarAddPage from './pages/CarAddPage/CarAddPage.tsx'
import Navbar from './components/Navbar/Navbar'
import { mainPagePath, loginPagePath, carAddPagePath } from './shared/pagesPaths.ts';

function AppContent() {
  const location = useLocation();

  return (  
    <>
      {location.pathname !== loginPagePath && <Navbar />}
      <Routes>
        <Route path={mainPagePath} element={<MainPage />} />
        <Route path={carAddPagePath} element={<CarAddPage />} />
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
