import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormList from './components/FormList/FormList';
import FormRenderer from './components/FormRenderer/FormRenderer';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormList />} />
        <Route path="/form" element={<FormRenderer />} />
      </Routes>
    </Router>
  );
}

export default App;
