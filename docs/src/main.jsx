import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Use 'react-router-dom'
import { UserContextProvider } from './context/UserContext.jsx';
import { LanguageProvider } from './context/LanguageContext'; // <-- Language Provider
import './index.css'

// Import components and the main App
import App from './App.jsx'
import { Contact } from './Components/Contact.jsx';
import UnderConstruction from './Components/UnderConstruction.jsx';
import WeatherApp from './Components/WeatherApp.jsx';
import FarmerSellingComunityPage from './pages/FarmerSellingComunityPage.jsx';


createRoot(document.getElementById('root')).render(
  // 1. BrowserRouter must be the outermost wrapper for routing to work
  <BrowserRouter>
    {/* 2. Context Providers wrap the entire App content (Routes) */}
    <LanguageProvider> 
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/FarmerSellingComunityPage" element={<FarmerSellingComunityPage />} />
          <Route path="/UnderConstruction" element={<UnderConstruction />} />
          <Route path="/WeatherApp" element={<WeatherApp />} />
          
        </Routes>
      </UserContextProvider>
    </LanguageProvider>
  </BrowserRouter>
)