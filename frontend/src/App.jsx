import { Route, Routes } from 'react-router-dom';
import Home from './Home.jsx';
import LandingPage from './LandingPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/home" element={<Home/>} />
    </Routes>
  )
}

export default App;
