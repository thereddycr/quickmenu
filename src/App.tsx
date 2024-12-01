import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { menudata } from './assets/data';

import Home from './components/Home';
import DigitalMenu from './components/DigitalMenu';
import CategoryList from './components/CategoryList';

// -------------------------------------------------------------------
const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:clientName" element={<DigitalMenu menuData={menudata} />} />
      <Route path="/:clientName/:category" element={<CategoryList menuData={menudata} />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
