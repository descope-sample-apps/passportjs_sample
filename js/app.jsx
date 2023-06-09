'use strict';

const { AuthProvider } = Descope;
const DESCOPE_PROJECT_ID = 'P2NyeltBwxXl01AO1zxIRoqusres';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }
  
  componentDidMount() {
    console.log('mounted app');
  }

  render() {
    return (
      <AuthProvider projectId={DESCOPE_PROJECT_ID} sessionTokenViaCookie>
        <div className="App">
          <ReactRouterDOM.Routes>
            <ReactRouterDOM.Route path="/" element={<Todos />} />
            <ReactRouterDOM.Route path="/active" element={<Todos />} />
            <ReactRouterDOM.Route path="/completed" element={<Todos />} />
            <ReactRouterDOM.Route path="/login" element={<LoginPrompt />} />
            <ReactRouterDOM.Route path="/signup" element={<SignupPrompt />} />
          </ReactRouterDOM.Routes>
        </div>
        <footer className="info">
          <p>Double-click to edit a todo</p>
          <p>Created by <a href="https://www.jaredhanson.me">Jared Hanson</a></p>
          <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
          <p>Authentication powered by <a href="https://www.passportjs.org">Passport</a></p>
        </footer>
      </AuthProvider>
    );
  }
}
