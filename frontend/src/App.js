import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import HomeCostCalculator from './components/calculator/HomeCostCalculator';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';
import StateCostTable from './components/ui/StateCostTable';
import SEOContent from './components/ui/SEOContent';
import FAQSection from './components/ui/FAQSection';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import TermsOfService from './components/pages/TermsOfService';
import StatePage from './components/pages/StatePage';
import { getPathname } from './utils/routes';
import './App.css';

const pathname = getPathname();
const isAbout = pathname === '/about';
const isContact = pathname === '/contact';
const isPrivacy = pathname === '/privacy-policy';
const isTerms = pathname === '/terms-of-service';
const isStatePage = pathname.startsWith('/housing-cost/');

function Page({ children }) {
  return (
    <div className="app">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      {isAbout && <Page><About /></Page>}
      {isContact && <Page><Contact /></Page>}
      {isPrivacy && <Page><PrivacyPolicy /></Page>}
      {isTerms && <Page><TermsOfService /></Page>}
      {isStatePage && <Page><StatePage slug={pathname.replace('/housing-cost/', '')} /></Page>}
      {!isAbout && !isContact && !isPrivacy && !isTerms && !isStatePage && (
        <Page>
          <HomeCostCalculator />
          <StateCostTable />
          <SEOContent />
          <FAQSection />
        </Page>
      )}
    </HelmetProvider>
  );
}
