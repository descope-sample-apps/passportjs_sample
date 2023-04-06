import { SignInFlow } from '@descope/react-sdk'

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
      <SignInFlow
        onSuccess = {(e) => console.log(e.detail.user)}
        onError={(e) => console.log('Could not log in!')}
        theme="light"
        //    debug=boolean // options are true or false. Default is false. Shows a debug widget when true
        //    tenant=<tenantId> //You can configure which tenant the signin/signup flow will sign the user into by providing the tenant ID
      />
      <hr />
      <p className="help">Don't have an account? <ReactRouterDOM.Link to="/signup">Sign up</ReactRouterDOM.Link></p>
    </section>
  );
}

window.LoginPrompt = LoginPrompt;
