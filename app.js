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

let preferredVoice = null;

function setPreferredVoice() {
  const voices = speechSynthesis.getVoices();
  preferredVoice = voices.find(v =>
    v.lang.startsWith('es') &&
    (v.name.toLowerCase().includes('female') ||
     v.name.toLowerCase().includes('mujer') ||
     v.name.toLowerCase().includes('google español') ||
     v.name.toLowerCase().includes('sabina') ||
     v.name.toLowerCase().includes('mónica') ||
     v.name.toLowerCase().includes('paulina'))
  ) || voices.find(v => v.lang.startsWith('es'));
}

speechSynthesis.onvoiceschanged = setPreferredVoice;
setPreferredVoice();

readBtn.addEventListener('click', () => {
  const text = editor.value;
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = 'es-ES';
  if (preferredVoice) msg.voice = preferredVoice;
  speechSynthesis.speak(msg);
});

stopBtn.addEventListener('click', () => {
  speechSynthesis.cancel();
});
