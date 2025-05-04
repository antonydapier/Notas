
const editor = document.getElementById("editor");
const clearBtn = document.getElementById("clear");
const exportBtn = document.getElementById("export");
const readBtn = document.getElementById("read");
const stopBtn = document.getElementById("stop");

// Autoguardado temporal (se borra al cerrar pestaña)
editor.value = sessionStorage.getItem("nota") || "";
editor.addEventListener("input", () => {
  sessionStorage.setItem("nota", editor.value);
});

clearBtn.onclick = () => {
  editor.value = "";
  sessionStorage.removeItem("nota");
};

exportBtn.onclick = () => {
  const blob = new Blob([editor.value], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "nota.txt";
  a.click();
  URL.revokeObjectURL(url);
};

let utterance;
readBtn.onclick = () => {
  if (!window.speechSynthesis) return alert("Tu navegador no soporta lectura de voz.");
  const voices = window.speechSynthesis.getVoices().filter(v => v.lang.startsWith("es") && v.name.toLowerCase().includes("femenina"));
  const voice = voices.length ? voices[0] : speechSynthesis.getVoices().find(v => v.lang.startsWith("es"));
  utterance = new SpeechSynthesisUtterance(editor.value);
  utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
};

stopBtn.onclick = () => {
  window.speechSynthesis.cancel();
};
