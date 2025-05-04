
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
    (
      v.name.toLowerCase().includes('female') ||
      v.name.toLowerCase().includes('mujer') ||
      v.name.toLowerCase().includes('sabina') ||
      v.name.toLowerCase().includes('paulina') ||
      v.name.toLowerCase().includes('mónica') ||
      v.name.toLowerCase().includes('helena') ||
      v.name.toLowerCase().includes('soledad')
    )
  );
  if (!preferredVoice) {
    preferredVoice = voices.find(v => v.lang.startsWith('es'));
  }
}

function speakText(text) {
  if (!preferredVoice) {
    alert('No se encontró una voz en español.');
    return;
  }
  const msg = new SpeechSynthesisUtterance(text);
  msg.voice = preferredVoice;
  msg.lang = preferredVoice.lang;
  speechSynthesis.speak(msg);
}

readBtn.addEventListener('click', () => {
  if (!preferredVoice) {
    setPreferredVoice();
    setTimeout(() => {
      speakText(editor.value);
    }, 500);
  } else {
    speakText(editor.value);
  }
});

stopBtn.addEventListener('click', () => {
  speechSynthesis.cancel();
});

speechSynthesis.onvoiceschanged = setPreferredVoice;
setPreferredVoice();
