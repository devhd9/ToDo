import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/Home';
import ToDoEdior from './components/ToDoEdior/ToDoEdior';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route index element={<ToDoEdior />} />
      {/* <Route path='/todo' element={<ToDoEdior/>}/> */}
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
