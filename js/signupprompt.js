const { SignUpFlow } = Descope;

function SignupPrompt() {
  const navigate = ReactRouterDOM.useNavigate();
  return (
    <section className="prompt">
      <h3>todos</h3>
      <h1>Sign up</h1>
      <SignUpFlow
        onSuccess = {() => navigate('/')}
        onError={(e) => console.log('Could not log in!')}
        theme="light"
      />
      <hr />
      <p className="help">Already have an account? <ReactRouterDOM.Link to="/login">Sign in</ReactRouterDOM.Link></p>
    </section>
  );
}

window.SignupPrompt = SignupPrompt;
