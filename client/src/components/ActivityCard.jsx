function ActivityCard({ activity, city }) {
  return (
    <div className="activity-card">
      <div className="activity-emoji">{activity.emoji}</div>
      <div className="activity-content">
        <h3 className="activity-title">{activity.title}</h3>
        <p className="activity-description">{activity.description}</p>
        <div className="activity-meta">
          <span className="activity-distance">
            📍 {activity.distance} miles from {city}
          </span>
          {activity.source && (
            <a
              href={activity.source}
              target="_blank"
              rel="noopener noreferrer"
              className="activity-link"
            >
              Learn more →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ActivityCard;
