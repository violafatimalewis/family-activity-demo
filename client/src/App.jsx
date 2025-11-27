import { useState } from 'react';
import SearchForm from './components/SearchForm';
import Results from './components/Results';
import { fetchActivities } from './services/api';
import './App.css';

function App() {
  const [showResults, setShowResults] = useState(false);
  const [searchParams, setSearchParams] = useState(null);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (formData) => {
    try {
      // Clear previous error
      setError(null);

      // Store search parameters
      setSearchParams(formData);

      // Set loading state
      setIsLoading(true);

      // Call backend API (replaces dummy data)
      const response = await fetchActivities(formData);

      // Store activities from API response
      setActivities(response.activities);

      // Show results view
      setShowResults(true);

    } catch (err) {
      // Handle error
      setError(err.message);
      setShowResults(false);
    } finally {
      // Always clear loading state
      setIsLoading(false);
    }
  };

  const handleSearchAgain = () => {
    setShowResults(false);
    setError(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎉 Family Activity Finder</h1>
        <p>Discover amazing activities for your family</p>
      </header>

      <main className="app-main">
        {/* Loading State */}
        {isLoading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <h2>🔍 Searching for amazing activities...</h2>
            <p>Using AI to find the best activities for your family!</p>
            <p className="loading-note">This may take up to 10-15 seconds...</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h2>Oops! Something went wrong</h2>
            <p className="error-message">{error}</p>
            <button onClick={handleSearchAgain} className="try-again-button">
              Try Again
            </button>
          </div>
        )}

        {/* Search Form (when not loading/error) */}
        {!isLoading && !error && !showResults && (
          <div className="search-view">
            <SearchForm onSearch={handleSearch} />
          </div>
        )}

        {/* Results View */}
        {!isLoading && !error && showResults && (
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
