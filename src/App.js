import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from './components/shared/loader/Loader';
import { ReactComponent as PageBorder } from './images/border.svg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useSelector } from 'react-redux';
import { getWeek } from './components/screens/diary/dayCard/date';

const Home = lazy(() => import('./components/screens/home/Home'))
const Notes = lazy(() => import('./components/screens/notes/Notes'))
const Diary = lazy(() => import('./components/screens/diary/Diary'))

function App() {

  const updateDates = useSelector(state => state.diaryReducer.updateDates)
  const days = useSelector(state => state.diaryReducer.days)
  const currentDates = getWeek()

  const isCurrentDates = days.map((el, i) => el.date === currentDates[i])
  !isCurrentDates.every(true) && updateDates(currentDates)

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
