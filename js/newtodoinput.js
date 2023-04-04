'use strict';

function NewTodoInput({ value, onChange, onSubmit }) {
  const ENTER_KEY = 13;
  
  const handleKeyDown = (event) => {
    switch (event.keyCode) {
    case ENTER_KEY:
      const val = event.target.value.trim();
      if (val) { onSubmit(); }
      break;
    }
  };
  
  return (
    <input className="new-todo"
      value={value} placeholder="What needs to be done?"
      onChange={event => onChange(event.target.value)}
      onKeyDown={handleKeyDown}
      autoFocus
    />
  );
}

window.NewTodoForm = NewTodoInput;
