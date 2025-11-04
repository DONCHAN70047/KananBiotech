import React from 'react';
import Header from './Components/Header'; 
import Footer from './Components/Footer'; 
import ServicesSection from './Components/ServicesSection';
import { LanguageProvider } from './context/LanguageContext';
import Informesstional from './Components/Informesstional';
import ChatBotWidget from "./pages/ChatBotWidget";


const PageStyles = () => (
  <style>{`
    
  `}</style>
);

function App() {
  
  return (
    <LanguageProvider>
    <>
      <PageStyles />
      <Header />  
      <ServicesSection />
      <main className="hero">
        <div className="hero-bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1>Explore Biotech</h1>
            <p>We have many products according to agriculture for you every day, don't miss out. Login! our web page for grow your agriculture.</p>
            <a href="#booking" className="cta-button">Visit & Details</a>
          </div>
          <div className="hero-images">
            <div className="image-grid">
              <video src="/Video1.mp4" alt="Biotech lab equipment" className="img-large" autoPlay loop muted></video>
              <img src="/Img5.webp" alt="Farmer in a field" className="img-small-1" />
              <img src="/Photo1.jpeg" alt="Close-up of a plant" className="img-small-2" />
            </div>
          </div>
        </div>
        <div>
          
        </div>
        <div>
      {/* your other page content */}
      <ChatBotWidget /> 
    </div>
      </main>
      <div>
        <br />
        <br />
      </div>
      
      <div>
        <br />
        <br />
        <br />
      </div>
      
      <Footer />
    </>
    </LanguageProvider>
  );
}

export default App;