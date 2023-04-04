function Footer({ count, completed, onClearCompleted }) {
  const location = ReactRouterDOM.useLocation();
  
  return (
    <footer className="footer">
      <span className="todo-count"><strong>{count}</strong> {count == 1 ? 'item': 'items'} left</span>
      <ul className="filters">
        <li>
          <ReactRouterDOM.Link className={classNames({ selected: location.pathname == '/' })} to="/">All</ReactRouterDOM.Link>
        </li>
        <li>
          <ReactRouterDOM.Link className={classNames({ selected: location.pathname == '/active' })} to="/active">Active</ReactRouterDOM.Link>
        </li>
        <li>
          <ReactRouterDOM.Link className={classNames({ selected: location.pathname == '/completed' })} to="/completed">Completed</ReactRouterDOM.Link>
        </li>
      </ul>
      {completed &&
        <button className="clear-completed" onClick={onClearCompleted}>Clear completed</button>
      }
    </footer>
  );
}

window.Footer = Footer;
