import './App.css'
import Header from './components/Header/Header.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Metaads from './pages/MetaLandingPage.jsx'
import Contact from './pages/Contact.jsx'
import Footer from './components/Footer/Footer.jsx'
import Portfolio from './pages/Portfolio.jsx'
import GoogleLead from './pages/GoogleLead.jsx'
import GMB from './pages/GMB.jsx'
import WebsiteDesignPage from './pages/WebDesign.jsx'
import { Routes, Route, useLocation } from "react-router-dom"
import LeadGenerationPage from './pages/LeadGeneration.jsx'
import RealEstatePage from './pages/RealEstate.jsx'
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";
import AnimatedLayoutComponent from './components/AnimatedLayoutComponent/AnimatedLayoutComponent.jsx'
import HealthCare from './pages/HealthCare.jsx'
import SaloonSpa from './pages/Saloon&Spa.jsx'
import Food from './pages/Food.jsx'
import D2C from './pages/D2C.jsx'
import MobilePortfolio from './pages/MobilePortfolio.jsx'
import WebPortfolio from './pages/WebPortfolio.jsx'
import MetaPortfolio from './pages/MetaPortfolio.jsx'
import GooglePortfolio from './pages/GooglePortfolio.jsx'
import GMBPortfolio from './pages/GMBPortfolio.jsx'
import LeadPortfolio from './pages/LeadPortfolio.jsx'
import Career from './pages/Career.jsx'



import "bootstrap/dist/css/bootstrap.min.css";



function App() {

  const location = useLocation();

  const hideFooterRoutes = ["/app-portfolio", "/portfolio/web", "/portfolio/meta-ads", "/portfolio/google-ads", "/portfolio/gmb-optimization", "/portfolio/lead-generation"];

  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <>
      <Header />
      <ScrollToTop />

      <AnimatedLayoutComponent>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/services/google-ads" element={<GoogleLead />} />
          <Route path="/services/gmb" element={<GMB />} />
          <Route path="/services/meta-ads" element={<Metaads />} />
          <Route path="/services/website-design" element={<WebsiteDesignPage />} />
          <Route path="/services/lead-generation" element={<LeadGenerationPage />} />
          <Route path="/industries/real-estate" element={<RealEstatePage />} />
          <Route path="/industries/healthcare" element={<HealthCare />} />
          <Route path="/industries/salon" element={<SaloonSpa />} />
          <Route path="/industries/food" element={<Food />} />
          <Route path="/industries/food" element={<Food />} />
          <Route path="/industries/d2c" element={<D2C />} />
          <Route path="/app-portfolio" element={<MobilePortfolio />} />
          <Route path="/portfolio/web" element={<WebPortfolio />} />
          <Route path="/portfolio/meta-ads" element={<MetaPortfolio />} />
          <Route path="/portfolio/google-ads" element={<GooglePortfolio />} />
          <Route path="/portfolio/gmb-optimization" element={<GMBPortfolio />} />
          <Route path="/portfolio/lead-generation" element={<LeadPortfolio />} />
          <Route path="/career" element={<Career />} />
        </Routes>
      </AnimatedLayoutComponent>

      {!shouldHideFooter && <Footer />}
    </>
  )
}

export default App