import React from "react";
import Welcome from './pages/Welcome';
import Question from './pages/Question';
import Score from './pages/Score';
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Welcome />}/>
        <Route path='/questions' element={<Question />}/>
        <Route path='/score' element={<Score />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
