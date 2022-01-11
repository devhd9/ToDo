import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToDoEdior from './components/ToDoEdior/ToDoEdior';

function App() {
  console.log(process.env.REACT_APP_URL)
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route index element={<ToDoEdior />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
