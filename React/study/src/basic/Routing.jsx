import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// BrowserRouter는 웹주소를, HashRouter는 #주소를 사용할 수 있다. 웹주소를 사용하는게 더 일반적이다.

// 성능을 위해 페이지단위는 lazy() loading 한 모습이다.
const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  </Router>
);