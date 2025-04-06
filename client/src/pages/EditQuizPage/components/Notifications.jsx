export const Notifications = ({ success, error }) => {
  if (!success && !error) return null;

  return (
    <>
      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-error">{error}</div>}
    </>
  );
};
