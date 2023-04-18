const { useSession, useUser, useDescope } = Descope;
function Todos() {
  const location = ReactRouterDOM.useLocation();
  const { isAuthenticated, isSessionLoading } = useSession();
  const { user, isUserLoading } = useUser();
  const { logout } = useDescope();
  const [todos, setTodos] = React.useState([]);
  const [editingTodo, setEditingTodo] = React.useState(null);
  const [newTitle, setNewTitle] = React.useState('');
  
  const activeCount = todos.reduce((c, i) => !i.completed ? c + 1 : c, 0);
  const completedCount = todos.length - activeCount;
  let filtered = todos;
  switch (location.pathname) {
  case '/active':
    filtered = todos.filter(todo => !todo.completed);
    break;
  case '/completed':
    filtered = todos.filter(todo => todo.completed);
    break;
  }
  
  React.useEffect(() => {
    console.log('FETCHING TODOS...');
    
    if (!isAuthenticated) { return; }
    
    async function fetchData() {
      let response = await fetch('/todos');
      // TODO: error handling
      let json = await response.json();
      console.log(json);
      setTodos(json);
    }
    fetchData();
  }, [ user?.userId ]);// TODO: put empty array here }, []);
  
  const handleCreate = async () => {
    const response = await fetch('/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: newTitle })
    });
    // TODO: error handling
    const todo = await response.json();
    setTodos(todos => todos.concat([todo]));
    setNewTitle('');
  };
  
  const handleUpdate = async (todo) => {
    const response = await fetch(todo.url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: todo.title })
    });
    // TODO: error handling
    const updatedTodo = await response.json();
    setEditingTodo(null);
    setTodos(todos => todos.map(todo => todo.id !== updatedTodo.id ? todo : updatedTodo));
  };
  
  const handleDestroy = async (deletedTodo) => {
    const response = await fetch(deletedTodo.url, {
      method: 'DELETE'
    });
    // TODO: error handling
    setEditingTodo(null);
    setTodos(todos => todos.filter(todo => todo.id !== deletedTodo.id));
  };
  
  const handleToggle = async (todo) => {
    const response = await fetch(todo.url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ completed: todo.completed })
    });
    // TODO: error handling
    const updatedTodo = await response.json();
    setTodos(todos => todos.map(todo => todo.id !== updatedTodo.id ? todo : updatedTodo));
  };
  
  const handleToggleAll = async (event) => {
    // TODO: error handling
    Promise.all(todos.map(todo => fetch(todo.url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ completed: event.target.checked })
    })))
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(setTodos);
  };
  
  const handleClearCompleted = async () => {
    var completed = todos.filter(todo => todo.completed);
    Promise.all(completed.map(todo => fetch(todo.url, {
      method: 'DELETE'
    })))
    .then(() => setTodos(todos.filter(todo => completed.indexOf(todo) == -1)));
  };
  
  const handleLogOut = async (event) => {
    logout();
  };
  
  if (isSessionLoading || isUserLoading) {
    return <p>Loading...</p>
  }
  
  if (!isAuthenticated) {
    return <Home />
  }  

  return (
    <section className="todoapp">
      <nav className="nav">
        <ul>
          <li className="user">{user.name}</li>
          <li>
            <button className="logout" onClick={handleLogOut}>Sign out</button>
          </li>
        </ul>
      </nav>
      <Header>
        <NewTodoInput value={newTitle} onChange={value => setNewTitle(value)} onSubmit={handleCreate} />
      </Header>
      {todos.length > 0 &&
        <section className="main">
          <input id="toggle-all" className="toggle-all" type="checkbox" checked={activeCount == 0 ? true : false} onChange={handleToggleAll} />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {filtered.map((todo) =>
              <TodoItem key={todo.id.toString()}
                        value={todo}
                        onToggle={handleToggle}
                        onUpdate={handleUpdate}
                        onDestroy={handleDestroy}
                        onBeginEditing={todo => setEditingTodo(todo)}
                        onCancelEditing={todo => setEditingTodo(null)}
                        editing={(editingTodo && editingTodo.id) === todo.id} />
            )}
          </ul>
        </section>
      }
      {todos.length > 0 &&
        <Footer count={activeCount} completed={completedCount > 0} onClearCompleted={handleClearCompleted} />
      }
    </section>
  );
}

window.Todos = Todos;
