import './App.css';
import OpenAI from './OpenAI';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<OpenAI />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
