import React, { useState, useEffect, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { menudata } from './assets/data';

import Home from './components/Home';
import DigitalMenu from './components/DigitalMenu';
import CategoryList from './components/CategoryList';
import './styles/index.css';

// -------------------------------------------------------------------
const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const routesToShowLoader = ['/', '/:menu'];

    const shouldShowLoader = routesToShowLoader.some((route) => {
      const pattern = new RegExp(`^${route.replace(':menu', '[^/]+')}$`);
      return pattern.test(location.pathname);
    });

    if (shouldShowLoader) {
      setLoading(true);

      const timer = setTimeout(() => {
        setLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <Suspense fallback={<div className="loader"></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:menu" element={<DigitalMenu menuData={menudata} />} />
            <Route path="/:menu/:category" element={<CategoryList menuData={menudata} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      )}
    </>
  );
};

export default App;
