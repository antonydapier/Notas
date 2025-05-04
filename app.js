const editor = document.getElementById('editor');
const preview = document.getElementById('preview');
const clearBtn = document.getElementById('clear');
const exportBtn = document.getElementById('export');

function renderMarkdown(text) {
  preview.innerHTML = marked.parse(text);
}

editor.addEventListener('input', () => {
  renderMarkdown(editor.value);
});

clearBtn.addEventListener('click', () => {
  if (confirm('¿Seguro que quieres borrar la nota?')) {
    editor.value = '';
    renderMarkdown('');
  }
});

exportBtn.addEventListener('click', () => {
  const text = editor.value;
  const blob = new Blob([text], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'nota.txt';
  link.click();
});

// Render inicial vacío
renderMarkdown('');