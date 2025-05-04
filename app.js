const editor = document.getElementById('editor');
const clearBtn = document.getElementById('clear');
const exportBtn = document.getElementById('export');
const readBtn = document.getElementById('read');
const stopBtn = document.getElementById('stop');

clearBtn.addEventListener('click', () => {
  if (confirm('¿Seguro que quieres borrar la nota?')) {
    editor.value = '';
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

readBtn.addEventListener('click', () => {
  const text = editor.value;
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = 'es-ES';
  speechSynthesis.speak(msg);
});

stopBtn.addEventListener('click', () => {
  speechSynthesis.cancel();
});