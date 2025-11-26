import { useState } from 'react';
import SearchForm from './components/SearchForm';
import Results from './components/Results';
import { dummyActivities } from './data/dummyData';
import './App.css';

function App() {
  const [showResults, setShowResults] = useState(false);
  const [searchParams, setSearchParams] = useState(null);
  const [activities, setActivities] = useState([]);

  const handleSearch = (formData) => {
    // Store search parameters
    setSearchParams(formData);

    // For Milestone 1, we use dummy data
    // In Milestone 2, this will call the Claude API
    setActivities(dummyActivities);

    // Show results view
    setShowResults(true);
  };

  const handleSearchAgain = () => {
    setShowResults(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎉 Family Activity Finder</h1>
        <p>Discover amazing activities for your family</p>
      </header>

      <main className="app-main">
        {!showResults ? (
          <div className="search-view">
            <SearchForm onSearch={handleSearch} />
          </div>
        ) : (
          <div className="results-view">
            <div className="results-layout">
              <div className="search-form-sidebar">
                <SearchForm onSearch={handleSearch} />
              </div>
              <div className="results-content">
                <Results
                  activities={activities}
                  searchParams={searchParams}
                  onSearchAgain={handleSearchAgain}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
