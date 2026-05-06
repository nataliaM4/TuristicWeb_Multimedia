/* ── CARRUSEL ── */
const imagenes = ["img/mezquita.jpg", "img/madrasa.jpg", "img/calles.jpg"];
let i = 0;

document.querySelector(".mk-arrow-l").onclick = () => cambiar(-1);
document.querySelector(".mk-arrow-r").onclick = () => cambiar(1);

function cambiar(n) {
  i += n;
  if (i < 0) i = imagenes.length - 1;
  if (i >= imagenes.length) i = 0;
  document.getElementById("hero-img").src = imagenes[i];
}

setInterval(() => cambiar(1), 4000);


/* ── MODALES ── */
function abrirVideo() {
  cerrarTodo();
  document.getElementById("modalVideo").style.display = "flex";
}

function abrirAudio() {
  cerrarTodo();
  document.getElementById("modalAudio").style.display = "flex";
  setTimeout(iniciarSubtitulosAudio, 200);
}

function abrirFormulario() {
  cerrarTodo();
  document.getElementById("modalForm").style.display = "flex";
}

function cerrarTodo() {
  const video = document.getElementById("miVideo");
  video.pause(); video.currentTime = 0;

  const audio = document.getElementById("miAudio");
  audio.pause(); audio.currentTime = 0;

  document.getElementById("modalVideo").style.display = "none";
  document.getElementById("modalAudio").style.display = "none";
  document.getElementById("modalForm").style.display = "none";
}

// Cerrar al hacer clic en el fondo oscuro
document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", function(e) {
    if (e.target === this) cerrarTodo();
  });
});


/* ── PREVIEW IMAGEN ── */
function previsualizarImagen(input) {
  const archivo = input.files[0];
  if (!archivo) return;

  document.getElementById("nombre-archivo").textContent = archivo.name;
  document.getElementById("texto-archivo").textContent = "Imagen seleccionada:";

  const reader = new FileReader();
  reader.onload = function(e) {
    const preview = document.getElementById("preview-img");
    preview.src = e.target.result;
    preview.style.display = "block";
  };
  reader.readAsDataURL(archivo);
}


/* ── SUBTÍTULOS AUDIO ── */
function iniciarSubtitulosAudio() {
  const audio = document.getElementById("miAudio");
  const caja = document.getElementById("subtitulo-audio");
  const tracks = audio.textTracks;

  if (!tracks || tracks.length === 0) return;

  const track = tracks[0];
  track.mode = "hidden"; // procesamos manualmente para mostrarlo en el div

  audio.addEventListener("timeupdate", () => {
    const cues = track.activeCues;
    caja.textContent = cues && cues.length > 0 ? cues[0].text : "";
  });
}

/* ── ENVÍO FORMULARIO + TOAST ── */
function enviarPostal(e) {
  e.preventDefault();

  cerrarTodo();

  document.getElementById("formPostal").reset();
  document.getElementById("preview-img").style.display = "none";
  document.getElementById("nombre-archivo").textContent = "";
  document.getElementById("texto-archivo").textContent = "Seleccionar imagen de tu dispositivo…";

  const toast = document.getElementById("toast");
  toast.classList.add("visible");

  setTimeout(() => toast.classList.remove("visible"), 3000);
}