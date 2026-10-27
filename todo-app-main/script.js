const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const itemsLeft = document.getElementById('items-left');

function updateCount() {
  const count = list.querySelectorAll('li:not(.completed)').length;
  itemsLeft.textContent = count + ' items left';
}

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const text = input.value.trim();
  if (text === '') return;

  const item = document.createElement('li');
  item.innerHTML = `
    <button class="check" aria-label="Mark complete"></button>
    <span class="todo-text"></span>
    <button class="delete" aria-label="Delete todo">✕</button>
  `;
  item.querySelector('.todo-text').textContent = text;
  list.appendChild(item);

  input.value = '';
  updateCount();
});

list.addEventListener('click', function (event) {
  const item = event.target.closest('li');
  if (!item) return;

  if (event.target.classList.contains('delete')) {
    item.remove();
  }

  if (event.target.classList.contains('check')) {
    item.classList.toggle('completed');
  }

  updateCount();
});
document.getElementById('clear-completed').addEventListener('click', function () {
  list.querySelectorAll('li.completed').forEach(function (item) {
    item.remove();
  });
  updateCount();
});
document.getElementById('filters').addEventListener('click', function (event) {
  const filter = event.target.dataset.filter;
  if (!filter) return;

  list.querySelectorAll('li').forEach(function (item) {
    const done = item.classList.contains('completed');
    if (filter === 'all') item.style.display = 'flex';
    if (filter === 'active') item.style.display = done ? 'none' : 'flex';
    if (filter === 'completed') item.style.display = done ? 'flex' : 'none';
  });
});
document.getElementById('theme-toggle').addEventListener('click', function () {
  document.body.classList.toggle('dark');
  this.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});