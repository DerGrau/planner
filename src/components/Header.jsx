export default function Header({ user, onLogout }) {
  return (
    <header className="header">
      <h1 className="header-title">Планировщик заданий</h1>

      <div className="header-right">
        <span className="user-email">{user.email}</span>
        <button className="logout-btn" onClick={onLogout}>
          Выход
        </button>
      </div>
    </header>
  );
}
