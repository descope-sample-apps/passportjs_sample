function LoginPrompt() {
  const navigate = ReactRouterDOM.useNavigate();
  const auth = useAuth();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');
    await auth.logIn(username, password);
    navigate('/');
  }
  
  return (
    <section className="prompt">
      <h3>todos</h3>
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit}>
        <section>
          <label htmlFor="username">Username</label>
          <input id="username" name="username" type="text" autoComplete="username" required autoFocus />
        </section>
        <section>
          <label htmlFor="current-password">Password</label>
          <input id="current-password" name="password" type="password" autoComplete="current-password" required />
        </section>
        <button type="submit">Sign in</button>
      </form>
      <hr />
      <p className="help">Don't have an account? <ReactRouterDOM.Link to="/signup">Sign up</ReactRouterDOM.Link></p>
    </section>
  );
}

window.LoginPrompt = LoginPrompt;
