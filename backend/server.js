const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let todos = [
  { id: 1, text: 'Watch Bleach. Again ? Yes', done: false },
  { id: 2, text: 'Finish reading Berserk', done: false },
  { id: 3, text: 'Read Vagabond', done: false },
  { id: 4, text: 'Read No Longer Human', done: false}
];
let nextId = 5;

app.get('/api/todos', (req, res) => {
    res.json(todos);
});

app.post('/api/todos', (req, res) => {
    const todo = {
        id: nextId++,
        text: req.body.text,
        done: false
    };

    todos.push(todo);
    res.json(todo);
});

app.put('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (todo) {
    todo.done = !todo.done;
    res.json(todo);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

app.delete('/api/todos/:id', (req, res) => {
  todos = todos.filter(t => t.id !== parseInt(req.params.id));
  res.json({ success: true });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});