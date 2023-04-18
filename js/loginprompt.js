const { SignInFlow } = Descope;

function LoginPrompt() {
  const navigate = ReactRouterDOM.useNavigate();

  
  return (
    <section className="prompt">
      <h3>todos</h3>
      <h1>Sign in</h1>
      <SignInFlow
        onSuccess = {() => navigate('/')}
        onError={(e) => console.log('Could not log in!')}
        theme="light"
      />
      <hr />
      <p className="help">Don't have an account? <ReactRouterDOM.Link to="/signup">Sign up</ReactRouterDOM.Link></p>
    </section>
  );
}

window.LoginPrompt = LoginPrompt;
