/* =========================================================
   CONFIGURACIÓN — textos, actividades y vales (editá acá)
   ========================================================= */

// 📅 Fecha fija de inicio del contador: 17 de junio de 2026 (mes 5 = junio). Solo se cambia desde el código.
const FECHA_INICIO = new Date(2026, 7, 17, 0, 0, 0);

// ☁️ Base de datos compartida (Firebase Realtime Database) para las actividades.
// Pegá acá la URL de tu base, sin barra final. Ejemplo: "https://mi-regalo-default-rtdb.firebaseio.com"
// Si queda vacía, las actividades se guardan solo en este dispositivo (localStorage).
const BACKEND_URL = "";

// 💌 Mensajes de las tarjetas de Inicio
const MENSAJES = [
  "Entre tantas personas, qué lindo coincidir con vos.",
  "Hay personas que hacen que los días sean un poquito más bonitos.",
  "No necesito un día especial para recordarte lo importante que sos.",
  "A veces, una persona puede convertirse en nuestro lugar favorito.",
  "Si pudiera elegir nuevamente, me gustaría volver a coincidir con vos."
];
// ✨ Mensajes extra para "Descubrir otro mensaje"
const EXTRAS = [
  "Tu voz tiene el don de calmarme el día.",
  "Con vos hasta lo cotidiano se siente especial.",
  "Me gusta pensar en vos cuando todo está en silencio.",
  "Lo mejor de mi día suele tener tu nombre."
];

// 🌷 Actividades: id único, icono, título y descripción
const ACTIVIDADES = [
  { id: "picnic",   ico: "🌻", titulo: "Hacer un picnic",        desc: "Una manta, algo rico y toda la tarde." },
  { id: "atardecer",ico: "🌅", titulo: "Ver el atardecer",       desc: "Quedarnos en silencio mientras el cielo cambia de color." },
  { id: "peliculas",ico: "🎬", titulo: "Noche de películas",     desc: "Mantita, pochoclos y elegir juntos qué ver." },
  { id: "cocinar",  ico: "🍓", titulo: "Preparar algo rico",     desc: "Cocinar entre risas, aunque salga raro." },
  { id: "caminar",  ico: "🌷", titulo: "Salir a caminar",        desc: "Sin apuro y sin rumbo, solo charlando." },
  { id: "cafe",     ico: "☕", titulo: "Ir a tomar un café",     desc: "Una mesa tranquila y tiempo para nosotros." },
  { id: "pintar",   ico: "🎨", titulo: "Hacer algo creativo",    desc: "Pintar, dibujar o inventar lo que se nos ocurra." },
  { id: "estrellas",ico: "🌙", titulo: "Mirar las estrellas",    desc: "Acostarnos a buscar constelaciones." },
  { id: "juegos",   ico: "🎮", titulo: "Jugar videojuegos",      desc: "Un rato de equipo (o de competencia amistosa)." },
  { id: "fotos",    ico: "📸", titulo: "Sacarnos fotografías",   desc: "Guardar momentos que después nos hagan sonreír." },
  { id: "musica",   ico: "🎶", titulo: "Escuchar música juntos", desc: "Armar una lista con canciones que nos representen." },
  { id: "helado",   ico: "🍦", titulo: "Ir por un helado",       desc: "Elegir sabores y probar el del otro." }
];

// 🎟️ Vales: id único, icono, nombre y descripción
const VALES = [
  { id: "beso",     ico: "💋", nombre: "Vale por un beso",              desc: "Canjeable en cualquier momento del día." },
  { id: "abrazo",   ico: "🫂", nombre: "Vale por un abrazo",            desc: "De los largos, de los que arreglan todo." },
  { id: "salida",   ico: "🌹", nombre: "Vale por una salida especial",  desc: "Vos elegís el lugar, yo me encargo del resto." },
  { id: "pelis",    ico: "🍿", nombre: "Vale por una noche de películas", desc: "Con la película que quieras." },
  { id: "helado",   ico: "🍦", nombre: "Vale por un helado",            desc: "Del sabor que más te guste." },
  { id: "picnic",   ico: "🌻", nombre: "Vale por un picnic",            desc: "Preparado con mucho cariño." },
  { id: "carta",    ico: "💌", nombre: "Vale por una carta escrita a mano", desc: "Con tinta, tiempo y buenas palabras." },
  { id: "sorpresa", ico: "🎁", nombre: "Vale por una sorpresa",         desc: "No puedo contarte más, es sorpresa." },
  { id: "merienda", ico: "☕", nombre: "Vale por una merienda juntos",  desc: "Con algo dulce, claro." },
  { id: "charlas",  ico: "🌙", nombre: "Vale por una noche de charlas", desc: "Hasta que el sueño nos gane." }
];

/* =========================================================
   UTILIDADES
   ========================================================= */
const $ = (id) => document.getElementById(id);
const reducir = matchMedia("(prefers-reduced-motion: reduce)").matches;
const azar = (a, b) => a + Math.random() * (b - a);

// localStorage con protección (por si el navegador lo bloquea)
const guardar = (k, v) => { try { localStorage.setItem("regalo:" + k, JSON.stringify(v)); } catch (e) {} };
const cargar = (k, def) => { try { const v = JSON.parse(localStorage.getItem("regalo:" + k)); return v ?? def; } catch (e) { return def; } };

const CORAZON = '<svg viewBox="0 0 100 100" width="100%" height="100%"><path fill="currentColor" d="M50 88C20 64 6 46 6 30 6 16 17 8 29 8c10 0 17 6 21 13 4-7 11-13 21-13 12 0 23 8 23 22 0 16-14 34-44 58z"/></svg>';

// Aviso breve inferior
let tAviso;
function aviso(texto) {
  const a = $("aviso");
  a.textContent = texto; a.classList.add("ver");
  clearTimeout(tAviso); tAviso = setTimeout(() => a.classList.remove("ver"), 3200);
}

// Lluvia de corazones desde un punto (para botones)
function explosion(x, y, n = 22) {
  if (reducir) return;
  for (let i = 0; i < n; i++) {
    const el = document.createElement("span"), t = azar(10, 26), ang = azar(0, 6.28), d = azar(90, 240);
    el.className = "chispa"; el.innerHTML = CORAZON;
    el.style.cssText = `left:${x - t / 2}px;top:${y - t / 2}px;width:${t}px;height:${t}px`;
    document.body.appendChild(el);
    el.animate([{ transform: "scale(.4)", opacity: 1 },
      { transform: `translate(${Math.cos(ang) * d}px,${Math.sin(ang) * d - 40}px) scale(1) rotate(${azar(-45, 45)}deg)`, opacity: 0 }],
      { duration: azar(1400, 2200), easing: "cubic-bezier(.22,1,.36,1)" }).onfinish = () => el.remove();
  }
}
const explotarDesde = (el) => { const r = el.getBoundingClientRect(); explosion(r.left + r.width / 2, r.top + r.height / 2); };

/* =========================================================
   FLORES (ilustraciones SVG dibujadas con código)
   Cada una se dibuja en un cuadro de 100x100.
   ========================================================= */
const FLORES = {
  girasol() {
    let p = "";
    for (let i = 0; i < 16; i++) p += `<ellipse cx="50" cy="20" rx="6.5" ry="18" fill="${i % 2 ? "#f7c948" : "#fbdc6e"}" transform="rotate(${i * 22.5} 50 50)"/>`;
    return p + '<circle cx="50" cy="50" r="17" fill="#7a4a2e"/><circle cx="50" cy="50" r="11" fill="#5c3620"/><circle cx="46" cy="46" r="2.2" fill="#a06a45"/><circle cx="55" cy="52" r="2.2" fill="#a06a45"/><circle cx="48" cy="56" r="2" fill="#a06a45"/>';
  },
  rosa() {
    let p = '<circle cx="50" cy="50" r="40" fill="#f4a8b9"/>';
    for (let i = 0; i < 6; i++) p += `<ellipse cx="50" cy="29" rx="17" ry="21" fill="#f8c0cd" stroke="#f1a0b3" stroke-width=".8" transform="rotate(${i * 60 + 15} 50 50)"/>`;
    return p + '<circle cx="50" cy="50" r="22" fill="#ee8fa3"/><path d="M50 36c10-4 17 6 10 13-6 6-17 4-17-5 0-6 5-9 11-8" fill="none" stroke="#d9566f" stroke-width="2.6" stroke-linecap="round"/><circle cx="50" cy="50" r="7" fill="#e06f88"/>';
  },
  lirio() {
    let p = "";
    for (let i = 0; i < 6; i++) p += `<g transform="rotate(${i * 60} 50 50)"><path d="M50 50C36 32 41 12 50 2 59 12 64 32 50 50z" fill="#fff" stroke="#f1c3cf" stroke-width="1.2"/><path d="M50 46V14" stroke="#f6cdd7" stroke-width="1.4"/></g>`;
    for (let i = 0; i < 5; i++) { const a = i * 1.257 + .3, x = 50 + Math.cos(a) * 20, y = 50 + Math.sin(a) * 20; p += `<path d="M50 50L${x} ${y}" stroke="#e8a34a" stroke-width="1.4"/><circle cx="${x}" cy="${y}" r="3" fill="#d9822b"/>`; }
    return p + '<circle cx="50" cy="50" r="4" fill="#f3d57a"/>';
  }
};
const dibujarFlor = (tipo, x, y, s) => `<g transform="translate(${x - s / 2} ${y - s / 2}) scale(${s / 100})">${FLORES[tipo]()}</g>`;
const mini = (tipo, estilo) => `<svg class="adorno" viewBox="0 0 100 100" style="${estilo}">${FLORES[tipo]()}</svg>`;

// Orden fijo del ciclo: lirios → girasoles → rosas → (vuelve a lirios)
const ORDEN_FLORES = ["lirio", "girasol", "rosa"];

// Ramo para una esquina: hojas fijas + una capa de flores por cada tipo (solo una visible a la vez)
function rincon(clase, fx, fy) {
  const pos = [[66, 66, 84], [140, 36, 46], [34, 142, 62], [122, 120, 36]];
  const hojas = '<path d="M0 0C45 4 92 30 118 80 62 74 14 48 0 0z" fill="#9cc4a4" opacity=".9"/><path d="M0 0C4 45 30 92 80 118 74 62 48 14 0 0z" fill="#86b392" opacity=".9"/><path d="M0 0C50 40 90 70 150 96" stroke="#7fae8b" stroke-width="2" fill="none"/><path d="M0 0C40 50 70 90 96 150" stroke="#7fae8b" stroke-width="2" fill="none"/>';
  const capas = ORDEN_FLORES.map((t, k) =>
    `<g class="capa${k === 0 ? " on" : ""}" data-flor="${t}">${pos.map((p) => dibujarFlor(t, p[0], p[1], p[2])).join("")}</g>`).join("");
  const g = `translate(${fx ? 200 : 0} ${fy ? 200 : 0}) scale(${fx ? -1 : 1} ${fy ? -1 : 1})`;
  return `<svg class="rincon ${clase}" viewBox="0 0 200 200"><g transform="${g}">${hojas}${capas}</g></svg>`;
}
$("flores").innerHTML = rincon("tl", 0, 0) + rincon("tr", 1, 0) + rincon("bl", 0, 1) + rincon("br", 1, 1);

// Cambio automático cada 5 segundos, con fundido suave
let idxFlor = 0;
setInterval(() => {
  idxFlor = (idxFlor + 1) % ORDEN_FLORES.length;
  document.querySelectorAll(".rincon .capa").forEach((c) => c.classList.toggle("on", c.dataset.flor === ORDEN_FLORES[idxFlor]));
}, 5000);

/* =========================================================
   PARTÍCULAS: pétalos, corazones ocasionales y destellos
   ========================================================= */
const caja = $("particulas");
const COLORES_PETALO = ["#fbd0da", "#ffffff", "#f7a8b8", "#fbe08a"];

function particula() {
  const el = document.createElement("span"), r = Math.random();
  const comun = `left:${azar(0, 100)}%;--dur:${azar(14, 26)}s;--op:${azar(.35, .75)};--x:${azar(-120, 120)}px;--rot:${azar(-200, 200)}deg;`;
  if (r < .75) {            // pétalo que cae
    const t = azar(10, 20);
    el.className = "petalo";
    el.innerHTML = `<svg viewBox="0 0 20 20" width="${t}" height="${t}"><path d="M10 1C16 6 17 14 10 19 3 14 4 6 10 1z" fill="${COLORES_PETALO[Math.floor(azar(0, 4))]}"/></svg>`;
  } else {                  // corazón que sube (poco frecuente)
    const t = azar(8, 16);
    el.className = "flota"; el.innerHTML = CORAZON; el.style.width = el.style.height = t + "px";
  }
  el.style.cssText += comun;
  caja.appendChild(el);
  el.addEventListener("animationend", () => el.remove());
}
function destello() {
  const el = document.createElement("span");
  el.className = "destello"; el.textContent = "✦";
  el.style.cssText = `left:${azar(5, 95)}%;top:${azar(5, 95)}%;font-size:${azar(10, 20)}px`;
  caja.appendChild(el);
  el.addEventListener("animationend", () => el.remove());
}
if (!reducir) {
  for (let i = 0; i < 6; i++) setTimeout(particula, i * 600);
  setInterval(particula, 1800);       // frecuencia de pétalos/corazones
  setInterval(destello, 1400);        // frecuencia de destellos
}

/* =========================================================
   INICIO: mensaje especial y tarjetas
   ========================================================= */
const velo = $("velo"), textoModal = $("modal-texto"), pool = [...MENSAJES, ...EXTRAS];
let ultimo = -1;

function mostrarMensaje(animar = true) {
  let i; do { i = Math.floor(Math.random() * pool.length); } while (i === ultimo);
  ultimo = i;
  if (!animar) return void (textoModal.textContent = pool[i]);
  textoModal.classList.add("cambia");
  setTimeout(() => { textoModal.textContent = pool[i]; textoModal.classList.remove("cambia"); }, 400);
}
$("btn-regalo").onclick = (e) => {
  explotarDesde(e.currentTarget); mostrarMensaje(false);
  setTimeout(() => { velo.classList.add("abierto"); velo.setAttribute("aria-hidden", "false"); }, 450);
};
$("btn-otro").onclick = (e) => { explotarDesde(e.currentTarget); mostrarMensaje(); };
$("btn-seguir").onclick = () => {
  velo.classList.remove("abierto"); velo.setAttribute("aria-hidden", "true");
  setTimeout(() => $("mensajes").scrollIntoView({ behavior: "smooth" }), 200);
};

MENSAJES.forEach((m, i) => {
  const t = document.createElement("article");
  t.className = "tarjeta vidrio revelar"; t.style.transitionDelay = `${i * 120}ms`; t.textContent = m;
  $("rejilla").appendChild(t);
});

/* =========================================================
   NUESTROS RECUERDOS: la foto es fija (assets/recuerdo.jpg) y la ven todos igual.
   ========================================================= */
// Flores decorativas en el marco
$("marco").insertAdjacentHTML("beforeend",
  mini("girasol", "top:-20px;left:-18px") + mini("rosa", "top:-16px;right:-14px") + mini("lirio", "bottom:-20px;right:-16px;width:62px;height:62px"));

/* =========================================================
   ACTIVIDADES COMPARTIDAS
   Con BACKEND_URL configurada se guardan en Firebase Realtime Database (REST) y se
   sincronizan entre dispositivos. Sin URL, quedan solo en este dispositivo.
   Estructura en la base: /elegidas/<id> = true  y  /personalizadas/<id> = {ico, titulo, desc}
   ========================================================= */
const API = BACKEND_URL.replace(/\/$/, "");
let estado = { elegidas: [], custom: [] };
let escribiendo = 0, primeraVez = true;
if (!API) console.warn("BACKEND_URL vacía: las actividades se guardan solo en este dispositivo.");

async function nube(metodo, ruta, cuerpo) {
  const r = await fetch(`${API}/${ruta}.json`, { method: metodo, headers: { "Content-Type": "application/json" }, body: cuerpo === undefined ? undefined : JSON.stringify(cuerpo) });
  if (!r.ok) throw new Error(r.status);
  return r.json();
}
const normalizar = (d) => ({
  elegidas: Object.keys((d && d.elegidas) || {}).sort(),
  custom: Object.entries((d && d.personalizadas) || {}).map(([id, v]) => ({ id, ...v })).sort((x, y) => x.id.localeCompare(y.id))
});
const huella = (e) => JSON.stringify([[...e.elegidas].sort(), e.custom.map((c) => [c.id, c.ico, c.titulo]).sort()]);
const todas = () => [...ACTIVIDADES, ...estado.custom.map((c) => ({ ...c, propia: true }))];

async function leerEstado() {
  if (!API) return void (estado = cargar("act-local", estado));
  try { estado = normalizar(await nube("GET", "")); } catch (e) { aviso("No se pudo conectar con la base de datos"); }
}
// Guarda un cambio (la pantalla ya se actualizó antes; si falla, avisa)
async function escribir(operaciones) {
  if (!API) return guardar("act-local", estado);
  escribiendo++;
  try { for (const [m, ruta, cuerpo] of operaciones) await nube(m, ruta, cuerpo); }
  catch (e) { aviso("No se pudo sincronizar. Probá de nuevo"); }
  finally { escribiendo--; }
}

function pintarAventura() {
  const lista = todas().filter((a) => estado.elegidas.includes(a.id));
  $("aventura").innerHTML = lista.length
    ? lista.map((a) => `<li>${a.ico} ${a.titulo}</li>`).join("")
    : '<li class="vacia">Todavía no elegiste nada. Tocá “Me gustaría” en lo que te tiente.</li>';
}

function pintarActividades(animar) {
  const g = $("grilla-act"); g.innerHTML = "";
  todas().forEach((a, i) => {
    const t = document.createElement("article");
    t.className = "tarjeta act vidrio"; t.dataset.id = a.id;
    if (primeraVez) { t.classList.add("revelar"); t.style.transitionDelay = `${(i % 4) * 90}ms`; obs.observe(t); }
    t.innerHTML = `<div class="ico">${a.ico}</div><h3>${a.titulo}</h3><p>${a.desc}</p><button class="boton suave" type="button"></button>` + (a.propia ? '<button class="quitar-act" type="button" aria-label="Eliminar actividad" title="Eliminar">×</button>' : "");
    const on = estado.elegidas.includes(a.id), b = t.querySelector(".boton");
    t.classList.toggle("elegida", on);
    b.textContent = on ? "Elegida ✓" : "Me gustaría"; b.className = on ? "boton" : "boton suave";
    b.onclick = () => {
      const ahora = !estado.elegidas.includes(a.id);
      estado.elegidas = ahora ? [...estado.elegidas, a.id] : estado.elegidas.filter((x) => x !== a.id);
      if (ahora) { explotarDesde(b); aviso(`${a.ico} “${a.titulo}” quedó elegida`); } else aviso(`Quitaste “${a.titulo}”`);
      pintarActividades(ahora ? a.id : null);
      escribir([[ahora ? "PUT" : "DELETE", `elegidas/${a.id}`, ahora ? true : undefined]]);
    };
    const q = t.querySelector(".quitar-act");
    if (q) q.onclick = () => {
      if (!confirm(`¿Eliminar “${a.titulo}”?`)) return;
      estado.custom = estado.custom.filter((x) => x.id !== a.id);
      estado.elegidas = estado.elegidas.filter((x) => x !== a.id);
      pintarActividades(); aviso("Actividad eliminada");
      escribir([["DELETE", `personalizadas/${a.id}`], ["DELETE", `elegidas/${a.id}`]]);
    };
    g.appendChild(t);
  });
  primeraVez = false;
  if (animar) { const c = g.querySelector(`[data-id="${animar}"]`); if (c) c.classList.add("pop"); }
  pintarAventura();
}

// Formulario para proponer una actividad nueva
$("nueva").onsubmit = (e) => {
  e.preventDefault();
  const titulo = $("n-tit").value.trim(); if (!titulo) return;
  const a = { ico: $("n-ico").value.trim() || "🌸", titulo, desc: "Una idea nueva para hacer juntos." };
  const id = "c" + Date.now().toString(36);
  estado.custom.push({ id, ...a });
  $("n-tit").value = ""; pintarActividades(); aviso(`${a.ico} Agregaste “${titulo}”`);
  escribir([["PUT", `personalizadas/${id}`, a]]);
};

// Inicio + sincronización: consulta la base cada 5 s y actualiza si otra persona cambió algo
async function iniciarActividades() {
  await leerEstado(); pintarActividades();
  if (!API) return;
  setInterval(async () => {
    if (document.hidden || escribiendo) return;
    try { const nuevo = normalizar(await nube("GET", "")); if (huella(nuevo) !== huella(estado)) { estado = nuevo; pintarActividades(); } } catch (e) {}
  }, 5000);
}

/* =========================================================
   VALES (estado guardado en localStorage)
   ========================================================= */
let canjeados = cargar("vales", []);

function cuentaVales() {
  const n = VALES.length - canjeados.length;
  $("cuenta-vales").textContent = n === 0 ? "Ya canjeaste todos los vales 💛" : `Te quedan ${n} de ${VALES.length} vales disponibles`;
}

VALES.forEach((v, i) => {
  const w = document.createElement("div");
  w.className = "vale-wrap revelar"; w.style.transitionDelay = `${(i % 2) * 100}ms`;
  w.innerHTML = `<div class="vale"><span class="ico">${v.ico}</span><div class="txt"><h3>${v.nombre}</h3><p>${v.desc}</p></div><button class="boton" type="button">Canjear vale</button><span class="sello">Canjeado</span>${mini(["rosa", "girasol", "lirio"][i % 3], "")}</div>`;
  const caja = w.firstChild, b = w.querySelector("button");
  const estado = () => {
    const usado = canjeados.includes(v.id);
    caja.classList.toggle("canjeado", usado);
    b.disabled = usado; b.textContent = usado ? "Canjeado ✓" : "Canjear vale";
  };
  b.onclick = () => {
    canjeados.push(v.id); guardar("vales", canjeados); estado(); cuentaVales();
    explotarDesde(b); aviso(`🎟️ ¡Vale canjeado! ${v.nombre}`);
  };
  estado(); $("grilla-vales").appendChild(w);
});
cuentaVales();

$("reiniciar").onclick = () => {
  if (!canjeados.length) return aviso("Todos los vales ya están disponibles");
  if (!confirm("¿Querés que todos los vales vuelvan a estar disponibles?")) return;
  canjeados = []; guardar("vales", canjeados);
  document.querySelectorAll(".vale").forEach((v) => { v.classList.remove("canjeado"); const b = v.querySelector("button"); b.disabled = false; b.textContent = "Canjear vale"; });
  cuentaVales(); aviso("✨ Los vales están disponibles otra vez");
};

/* =========================================================
   CONTADOR: tiempo real desde FECHA_INICIO (meses calendario + días, horas, min, seg)
   ========================================================= */
function contador() {
  const ahora = new Date(), ini = FECHA_INICIO;
  const desde = (m) => { const d = new Date(ini); d.setMonth(ini.getMonth() + m); return d; };
  let meses = (ahora.getFullYear() - ini.getFullYear()) * 12 + ahora.getMonth() - ini.getMonth();
  if (desde(meses) > ahora) meses--;
  if (meses < 0) meses = 0;
  const ms = Math.max(0, ahora - desde(meses));
  $("c-meses").textContent = meses;
  $("c-dias").textContent = Math.floor(ms / 864e5);
  $("c-horas").textContent = Math.floor(ms / 36e5) % 24;
  $("c-min").textContent = Math.floor(ms / 6e4) % 60;
  $("c-seg").textContent = Math.floor(ms / 1e3) % 60;
}
contador(); setInterval(contador, 1000);

/* =========================================================
   APARICIÓN AL HACER SCROLL + MENÚ ACTIVO
   ========================================================= */
const obs = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("activo"); obs.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll(".revelar").forEach((el) => obs.observe(el));

const enlaces = [...document.querySelectorAll(".menu a")];
const espia = new IntersectionObserver((es) => es.forEach((e) => {
  if (!e.isIntersecting) return;
  enlaces.forEach((a) => {
    const on = a.getAttribute("href") === "#" + e.target.id;
    a.classList.toggle("on", on);
    if (on) a.scrollIntoView({ inline: "center", block: "nearest" });   // en celular, centra el enlace activo
  });
}), { rootMargin: "-45% 0px -50% 0px" });
["inicio", "recuerdos", "actividades", "vales", "final"].forEach((id) => espia.observe($(id)));

iniciarActividades();
