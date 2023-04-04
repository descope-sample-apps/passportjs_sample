function SignupPrompt() {
  const navigate = ReactRouterDOM.useNavigate();
  const auth = useAuth();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');
    await auth.signUp(username, password);
    navigate('/');
  }
  
  
  return (
    <section className="prompt">
      <h3>todos</h3>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <section>
          <label htmlFor="username">Username</label>
          <input id="username" name="username" type="text" autoComplete="username" required />
        </section>
        <section>
          <label htmlFor="new-password">Password</label>
          <input id="new-password" name="password" type="password" autoComplete="new-password" required />
        </section>
        <button type="submit">Sign up</button>
      </form>
      <hr />
      <p className="help">Already have an account? <ReactRouterDOM.Link to="/login">Sign in</ReactRouterDOM.Link></p>
    </section>
  );
}

window.SignupPrompt = SignupPrompt;
