function Header({ children }) {
  return (
    <header className="header">
      <h1>todos</h1>
      {children}
    </header>
  );
}

window.Header = Header;
