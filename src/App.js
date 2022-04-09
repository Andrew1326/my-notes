import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from './components/shared/loader/Loader';
import { ReactComponent as PageBorder } from './images/border.svg';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = lazy(() => import('./components/screens/home/Home'))
const Notes = lazy(() => import('./components/screens/notes/Notes'))
const Diary = lazy(() => import('./components/screens/diary/Diary'))

function App() {

  //* AOS init
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, [])

  return (
    <>
    <PageBorder />
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/notes' element={<Notes />} />
          <Route path='/diary' element={<Diary />} />
        </Routes>
      </Suspense>
    </Router>
    </>
  );
}

export default App;
