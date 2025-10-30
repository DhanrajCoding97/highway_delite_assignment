import './App.css';
import Navbar from './components/Navbar';
import ExperienceCard from './components/ExperienceCard';
import SearchInput from './components/searchInput';
import ExperienceDetails from './components/ExpereienceDetails';
import ExperienceDetailsPriceCard from './components/ExperienceDetailsPriceCard';
function App() {
  return (
    <main>
      <Navbar />
      <ExperienceCard />
      <ExperienceDetails />
      <ExperienceDetailsPriceCard />
    </main>
  );
}

export default App;
