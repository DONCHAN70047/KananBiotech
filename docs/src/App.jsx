import React from 'react';
import Header from './Components/Header'; 
import Footer from './Components/Footer'; 
import ServicesSection from './Components/ServicesSection';
import { LanguageProvider } from './context/LanguageContext';


const PageStyles = () => (
  <style>{`
    /* --- Basic Setup & Variables --- */
    :root {
        --primary-color: #3A8D9C;
        --secondary-color: #2e717e;
        --text-color: #ffffff;
        --button-bg: #f0f8ff; /* AliceBlue */
        --button-text: #333333;
        --font-family: 'Poppins', sans-serif;
    }

    /* Basic reset and body styles */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        font-family: var(--font-family);
        background-color: var(--primary-color);
        color: var(--text-color);
        overflow-x: hidden;
    }

    /* --- Header & Navigation --- */
.header { 
  padding: 1.5rem 5%; 
  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
  width: 80%;
  z-index: 20;
  transition: all 0.4s ease;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1190px;
  margin: 0 auto;
}

.nav-logo {
  font-size: 1.5rem;
  font-weight: 1000;
  color: var(--text-color);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  animation: fadeInDown 0.8s ease-out;
}

/* Align menu items neatly */
.nav-menu {
  display: flex;
  align-items: center;
  list-style: none;
  gap: 3.5rem;
  animation: fadeInDown 0.8s ease-out 0.2s;
  animation-fill-mode: backwards;
}

/* Center text links visually */
.nav-link {
  color: var(--text-color);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-link:hover { color: var(--button-bg); }

/* Search Button */
.search-btn {
  background-color: var(--button-bg);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.search-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.search-btn .icon {
  color: var(--primary-color);
  font-size: 1rem;
}

/* Login Button Styling */
.login-btn {
  background-color: var(--button-bg);
  color: white;
  font-weight: 600;
  padding: 0.6rem 1rem;
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.login-btn:hover {
  background-color: var(--primary-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Mobile menu toggle */
.hamburger { 
  display: none; 
  cursor: pointer; 
}
.bar {
  display: block;
  width: 25px;
  height: 1px;
  margin: 4px auto;
  transition: all 0.3s ease-in-out;
  background-color: var(--text-color);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .nav-menu {
    flex-direction: column;
    background: white;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    padding: 1.5rem 0;
    gap: 1.5rem;
    display: none;
  }
  .nav-menu.active { display: flex; }
  .hamburger { display: block; }
}


    /* --- Hero Section --- */
    .hero {
        position: relative;
        padding: 2rem 5%;
        min-height: calc(100vh - 90px);
        display: flex;
        align-items: center;
    }
    .hero-content {
        display: grid;
        grid-template-columns: 1fr 1.2fr;
        align-items: center;
        gap: 2rem;
        max-width: 1400px;
        margin: 0 auto;
        width: 100%;
    }
    .hero-bg-shapes {
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        overflow: hidden;
        z-index: -1;
    }
    .shape {
        position: absolute;
        border-radius: 50%;
        background-color: var(--secondary-color);
        opacity: 0.8;
    }
    .shape-1 { width: 700px; height: 700px; top: -150px; left: -200px; }
    .shape-2 { width: 500px; height: 500px; top: 20%; left: 15%; }
    .hero-text { animation: slideInFromLeft 1s ease-out; }
    .hero-text h1 {
        font-size: 5rem;
        font-weight: 700;
        line-height: 1.1;
        margin-bottom: 1.5rem;
    }
    .hero-text p {
        font-size: 1.1rem;
        line-height: 1.6;
        margin-bottom: 2.5rem;
        max-width: 450px;
    }
    .cta-button {
        background-color: var(--button-bg);
        color: var(--button-text);
        text-decoration: none;
        padding: 1rem 2.5rem;
        border-radius: 50px;
        font-weight: 700;
        font-size: 1rem;
        display: inline-block;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .cta-button:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    }

    /* --- Hero Image Grid --- */
    .hero-images { animation: slideInFromRight 1s ease-out; }
    .image-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto;
        gap: 1rem;
    }
    .image-grid img {
        width: 100%; height: 100%;
        object-fit: cover;
        border-radius: 15px;
        transition: transform 0.4s ease, filter 0.4s ease;
    }
    .image-grid img:hover {
        transform: scale(1.05);
        filter: brightness(1.1);
    }
    .img-large { grid-column: 1 / 3; height: 350px; }
    .img-small-1, .img-small-2 { height: 200px; }

    /* --- Animations --- */
    @keyframes fadeInDown {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideInFromLeft {
        from { opacity: 0; transform: translateX(-50px); }
        to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideInFromRight {
        from { opacity: 0; transform: translateX(50px); }
        to { opacity: 1; transform: translateX(0); }
    }

    /* --- Responsive & Mobile Menu Logic --- */
    @media (max-width: 992px) {
        .hero-content { grid-template-columns: 1fr; text-align: center; }
        .hero-text { order: 2; }
        .hero-images { order: 1; margin-bottom: 2rem; }
        .hero-text p { margin: 0 auto 2.5rem auto; }
        .hero-text h1 { font-size: 3.5rem; }
        .shape-1 { width: 500px; height: 500px; left: -150px; }
        .shape-2 { display: none; }
        
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 80px;
            flex-direction: column;
            background-color: var(--secondary-color);
            width: 100%;
            text-align: center;
            transition: 0.3s;
            gap: 0;
            z-index: 100;
        }
        .nav-menu.active { left: 0; }
        .nav-item { padding: 1rem 0; }
        .hamburger { display: block; z-index: 101; }
        .hamburger.active .bar:nth-child(2) { opacity: 0; }
        .hamburger.active .bar:nth-child(1) { transform: translateY(8px) rotate(45deg); }
        .hamburger.active .bar:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }
    }
    @media (max-width: 576px) {
        .hero-text h1 { font-size: 2.8rem; }
        .img-large { height: 250px; }
        .img-small-1, .img-small-2 { height: 150px; }
    }
    /* Login button styles */
    .login-btn {
      background-color: var(--button-bg);
      color: var(--button-text);
      text-decoration: none;
      padding: 0.6rem 1.1rem;
      border-radius: 50px;
      font-weight: 700;
      font-size: 0.8rem;
      display: inline-block;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .login-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }
    /* --- Footer Section --- */
.footer-container {
  background-color: var(--secondary-color);
  padding: 4rem 5% 2rem;
  color: #e0e0e0;
}
.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}
.footer-column h3, .footer-column h4 {
  color: var(--text-color);
  margin-bottom: 1rem;
}
.footer-logo {
  font-size: 1.5rem;
  font-weight: 700;
}
.footer-column p {
  line-height: 1.7;
}
.footer-links {
  list-style: none;
}
.footer-links li {
  margin-bottom: 0.75rem;
}
.footer-links a {
  color: #e0e0e0;
  text-decoration: none;
  transition: color 0.3s ease;
}
.footer-links a:hover {
  color: var(--button-bg);
}
.contact-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}
.contact-icon {
  color: var(--primary-color);
}
.social-icons {
  display: flex;
  gap: 1rem;
}
.social-icons a {
  color: var(--secondary-color);
  background-color: var(--text-color);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  text-decoration: none;
  transition: transform 0.3s ease, background-color 0.3s ease;
}
.social-icons a:hover {
  transform: translateY(-3px);
  background-color: var(--button-bg);
}
.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid var(--primary-color);
  font-size: 0.9rem;
}
  /* --- Quick Options Section --- */
.quick-options-container {
  display: flex;
  flex-wrap: wrap; /* Allows buttons to wrap on smaller screens */
  justify-content: center; /* Center the buttons */
  gap: 0.75rem; /* Space between buttons */
  padding: 1.5rem 5%; /* Padding around the container */
  background-color: var(--primary-color); /* Match the body background */
  border-bottom: 2px solid var(--secondary-color); /* Adds a nice separation */
}
.quick-option-box {
  display: inline-flex; /* Use flex to align icon and text */
  align-items: center;
  gap: 0.5rem; /* Space between icon and text */
  background-color: var(--button-bg);
  color: var(--button-text);
  padding: 0.6rem 1.2rem; /* Similar to login button */
  border-radius: 50px; /* This creates the rounded pill shape */
  text-decoration: none;
  font-weight: 600;
  font-size: 0.85rem; /* Slightly smaller for more text */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.quick-option-box:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.15);
}
.quick-option-box .icon {
  color: var(--primary-color);
  font-size: 1rem;
}
  /* --- Services Section (Cards) --- */
.services-container {
  display: grid;
  /* This creates a responsive grid: */
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 2.5rem 5%; /* Add some space around the cards */
  background-color: var(--secondary-color); /* Darker background for contrast */
}

.service-card {
  background-color: var(--button-bg); /* Use the light card color */
  color: var(--button-text); /* Use the dark text color */
  border-radius: 15px; /* Rounded corners like your images */
  padding: 2rem 1.5rem;
  text-align: center;
  text-decoration: none;
  
  /* Flex to stack icon and text vertically */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem; /* Space between icon and text */
  
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px); /* Lift effect on hover */
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}

.service-card .icon {
  font-size: 2.5rem; /* Make the icon much larger */
  color: var(--primary-color); /* Use your main theme color */
}

.service-card span {
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.4;
}
  .header { 
  padding: 1.5rem 5%; 
  position: sticky; /* Makes the header stick to the top */
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* Ensures it's on top of other content */
  background-color: var(--primary-color); /* Gives it a solid background */
  transition: transform 0.3s ease-in-out; /* Smooth slide animation */
}
.header--hidden {
  transform: translateY(-100%); /* Slides the header up and out of view */
}
  /* --- Under Construction Page (New Style) --- */

}
  /* ........................... Weather .......................*/
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
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
      </main>
      
      <Footer />
    </>
    </LanguageProvider>
  );
}

export default App;