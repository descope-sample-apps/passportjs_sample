function Home() {
  return (
    <section className="todohome">
      <header>
        <h1>todos</h1>
      </header>
      <section>
        <h2>todos helps you get things done</h2>
        <ReactRouterDOM.Link className="button" to="/login">Sign in</ReactRouterDOM.Link>
      </section>
    </section>
  );
}

window.Home = Home;
