const editor = document.getElementById('editor');
const clearBtn = document.getElementById('clear');
const exportBtn = document.getElementById('export');

function renderMarkdown(text) {
  editor.innerHTML = marked.parse(text);
}

editor.addEventListener('input', () => {
  const raw = editor.innerText;
  renderMarkdown(raw);
});

clearBtn.addEventListener('click', () => {
  if (confirm('¿Seguro que quieres borrar la nota?')) {
    editor.innerText = '';
  }
});

exportBtn.addEventListener('click', () => {
  const text = editor.innerText;
  const blob = new Blob([text], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'nota.txt';
  link.click();
});

// Render initial markdown if any (temporary)
renderMarkdown(editor.innerText);