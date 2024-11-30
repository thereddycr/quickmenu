import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import menuData from './assets/MenuData.json';

import DigitalMenu from './components/DigitalMenu';
import Home from './components/Home';

// -------------------------------------------------------------------
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Default Home Route */}
        <Route path="/" element={<Home />} />

        {/* Dynamic Route */}
        <Route
          path="/:clientName"
          element={<DigitalMenu menuData={menuData} />}
        />

        {/* Catch-All Route: Redirect to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
