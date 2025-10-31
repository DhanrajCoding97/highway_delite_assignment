import { useState, useEffect } from 'react';
import { getAllExperiences } from '../services/api';
import { IExperience } from '../types';
import ExperienceCard from '../components/ExperienceCard';
import Navbar from '../components/Navbar';
const HomePage = () => {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [filteredExperiences, setFilteredExperiences] = useState<IExperience[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const data = await getAllExperiences();
      setExperiences(data);
      setFilteredExperiences(data);
    } catch (error: any) {
      setError(error.message || 'Failed to fetch experiences');
    } finally {
      setLoading(false);
    }
  };

  //trigger filteredExperiences when searchQuery changes
  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredExperiences(experiences);
      return;
    }

    const filtered = experiences.filter((exp) => {
      const title = exp.title?.toLowerCase() || '';
      const location = exp.location?.toLowerCase() || '';
      const category = exp.category?.toLowerCase() || '';
      const query = searchQuery.toLowerCase();

      // ✅ Make sure to return a boolean
      return (
        title.includes(query) ||
        location.includes(query) ||
        category.includes(query)
      );
    });

    setFilteredExperiences(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F9F9]">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading experiences...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={handleSearch}
        />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
            <button onClick={fetchExperiences} className="mt-4 btn-primary">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <Navbar
        value={searchQuery}
        onChange={setSearchQuery}
        onSearch={handleSearch}
      />
      <main className="pt-12 px-[124px]">
        {filteredExperiences.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No experiences found</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {filteredExperiences.map((exp) => (
              <ExperienceCard key={exp._id} experience={exp} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
