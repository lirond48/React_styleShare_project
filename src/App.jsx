import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import Feed from './components/feed/Feed';
import Upload from './components/upload/Upload';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/feed" element={<Feed />} />
        <Route path="/upload" element={<Upload />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/" element={<Navigate to="/feed" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

