import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import HomePage from './pages/HomePage';
import ExperienceDetailsPage from './pages/ExperienceDetailsPage';
import Navbar from './components/Navbar';
import ExperienceCard from './components/ExperienceCard';
import SearchInput from './components/searchInput';
import ExperienceDetails from './components/ExperienceDetails';
import ExperienceDetailsPriceCard from './components/ExperienceDetailsPriceCard';
function App() {
  return (
    <Router>
      <BookingProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/experience/:id" element={<ExperienceDetailsPage />} />
        </Routes>
      </BookingProvider>
    </Router>
  );
}

export default App;
