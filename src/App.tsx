import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import HomePage from './pages/HomePage';
import ExperienceDetailsPage from './pages/ExperienceDetailsPage';
import CheckoutPage from './pages/CheckoutPage';
import ConfirmationPage from './pages/ConfirmationPage';
function App() {
  return (
    <Router>
      <BookingProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/experience/:id" element={<ExperienceDetailsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="confirmation/:bookingRef"
            element={<ConfirmationPage />}
          />
        </Routes>
      </BookingProvider>
    </Router>
  );
}

export default App;
