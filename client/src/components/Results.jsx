import ActivityCard from './ActivityCard';

function Results({ activities, searchParams, onSearchAgain }) {
  return (
    <div className="results-container">
      <div className="results-header">
        <h2>Top 5 Recommendations</h2>
        <div className="search-summary">
          <p>
            <strong>City:</strong> {searchParams.city} |
            <strong> Ages:</strong> {searchParams.ages} |
            <strong> When:</strong> {searchParams.availability} |
            <strong> Distance:</strong> {searchParams.distance} miles
          </p>
          {searchParams.preferences && (
            <p><strong>Preferences:</strong> {searchParams.preferences}</p>
          )}
        </div>
      </div>

      <div className="activities-list">
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <div key={activity.id} className="activity-number-wrapper">
              <div className="activity-number">{index + 1}</div>
              <ActivityCard
                activity={activity}
                city={searchParams.city}
              />
            </div>
          ))
        ) : (
          <p className="no-results">No activities found. Please try a different search.</p>
        )}
      </div>

      <button onClick={onSearchAgain} className="search-again-button">
        ← Search Again
      </button>
    </div>
  );
}

export default Results;
