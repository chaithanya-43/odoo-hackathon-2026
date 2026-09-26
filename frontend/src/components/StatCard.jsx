function StatCard({ title, value, description }) {
  return (
    <div className="stat-card">
      <p className="stat-card-title">{title}</p>
      <h2 className="stat-card-value">{value ?? 0}</h2>
      {description && (
        <p className="stat-card-description">{description}</p>
      )}
    </div>
  );
}

export default StatCard;
