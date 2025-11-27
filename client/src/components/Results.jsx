function Results({ activities, searchParams, onSearchAgain }) {
  // Convert markdown-style bold (**text**) to HTML <strong> tags
  const formatActivities = (text) => {
    if (!text) return '';
    // Replace **text** with <strong>text</strong>
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <h2>🎯 Top 5 Recommendations</h2>
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

      <div className="activities-content">
        {activities ? (
          <div
            className="activities-text"
            dangerouslySetInnerHTML={{ __html: formatActivities(activities) }}
          />
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
