import './App.css';
import Navbar from './components/Navbar';
import ExperienceCard from './components/ExperienceCard';
import SearchInput from './components/searchInput';
import ExperienceDetails from './components/ExpereienceDetails';
function App() {
  return (
    <main>
      <Navbar />
      <ExperienceCard />
      <SearchInput />
      <ExperienceDetails />
    </main>
  );
}

export default App;
