interface EmptyStateProps {
  title?: string;
  description?: string;
}
export function EmptyState({
  title = 'No records yet',
  description = 'Content will be added in a later phase.',
}: EmptyStateProps) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
