/* ============================
   VibeWave — full functional
   ============================ */

const tracks = [
  { title: "Teri Ore", artist: "Rahat Fateh Ali", src: "songs/music-1.mp3", cover: "covers/music-1.jpg" },
  { title: "Behti Hawa Sa Tha", artist: "Shan & Shantanu", src: "songs/music-2.mp3", cover: "covers/music-2.jpg" },
  { title: "Tujh Mein Rab Dikhta", artist: "Roop Kumar Rathod", src: "songs/music-3.mp3", cover: "covers/music-3.jpg" },
  { title: "Besabriyaan", artist: "Armaan Malik", src: "songs/music-4.mp3", cover: "covers/music-4.jpg" },
  { title: "Mere Nishaan", artist: "Khailsh kher & Meet bros", src: "songs/music-5.mp3", cover: "covers/music-5.jpg" },
  { title: "Bhagwan Hai Kahen Re", artist: "Sonu Nigam", src: "songs/music-6.mp3", cover: "covers/music-6.jpg" },
  { title: "Tu Hi Tu", artist: "Mohammed Irfan", src: "songs/music-7.mp3", cover: "covers/music-7.jpg" },
  { title: "Namo Namo", artist: "Amit Trivedi", src: "songs/music-8.mp3", cover: "covers/music-8.jpg" },
  { title: "Zing Zingaat", artist: "Ajay & Atul", src: "songs/music-9.mp3", cover: "covers/music-9.jpg" },
  { title: "Kombadi Padali", artist: "Vaishali Samant", src: "songs/music-10.mp3", cover: "covers/music-10.jpg" },
  { title: "Apsara Ali", artist: "Ajay & Atul", src: "songs/music-11.mp3", cover: "covers/music-11.jpg" },
  { title: "Man Udhan Varyache", artist: "Shankar Mahadevan", src: "songs/music-12.mp3", cover: "covers/music-12.jpg" },
  { title: "I Am a Rider", artist: "Imran Khan", src: "songs/music-13.mp3", cover: "covers/music-13.jpg" },
  { title: "Sia - Unstoppable", artist: "Sia Furler", src: "songs/music-14.mp3", cover: "covers/music-14.jpg" },
  { title: "Love Me Like You Do", artist: "Ellie Goulding", src: "songs/music-15.mp3", cover: "covers/music-15.jpg" },
  { title: "Broken Angel", artist: "Arash", src: "songs/music-16.mp3", cover: "covers/music-16.jpg" },
  { title: "Bolo Ta Ra Ra", artist: "Daler Mehndi", src: "songs/music-17.mp3", cover: "covers/music-17.jpg" },
  { title: "Bapu Zimidar", artist: "Jassi Gill", src: "songs/music-18.mp3", cover: "covers/music-18.jpg" },
  { title: "Laung Da Lashkara", artist: "Jasbir Jassi & Hard Kaur", src: "songs/music-19.mp3", cover: "covers/music-19.jpg" },
  { title: "Ho Jayegi Balle Balle", artist: "Daler Mehndi", src: "songs/music-20.mp3", cover: "covers/music-20.jpg" },
  { title: "Sandese Aate Hain", artist: "Anu Malik & Sonu Nigam", src: "songs/music-21.mp3", cover: "covers/music-21.jpg" },
  { title: "Watan Walo", artist: "Roop Kumar Rathod", src: "songs/music-22.mp3", cover: "covers/music-22.jpg" },
  { title: "Lehra Do", artist: "Pritam & Arjit Singh", src: "songs/music-23.mp3", cover: "covers/music-23.jpg" },
  { title: "Teri Mitti", artist: "Manoj Muntashir & B Praak", src: "songs/music-24.mp3", cover: "covers/music-24.jpg" },
  { title: "Kar Har Maidaan Fateh", artist: "Shreya Ghosal & Sukhwinder", src: "songs/music-25.mp3", cover: "covers/music-25.jpg" },
  { title: "Dangal Title Track", artist: "Daler Mehndi", src: "songs/music-26.mp3", cover: "covers/music-26.jpg" },
  { title: "Chak Lein De", artist: "Kailash Kher", src: "songs/music-27.mp3", cover: "covers/music-27.jpg" },
  { title: "Zinda", artist: "Siddharth Mahadevan", src: "songs/music-28.mp3", cover: "covers/music-28.jpg" },
];

const audio = document.getElementById('audio');
const cover = document.getElementById('cover');
const bg = document.getElementById('bg');
const titleEl = document.getElementById('title');
const artistEl = document.getElementById('artist');
const seek = document.getElementById('seek');
const cur = document.getElementById('cur');
const dur = document.getElementById('dur');
const playBtn = document.getElementById('play');
const playIcon = document.getElementById('playIcon');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const shuffleBtn = document.getElementById('shuffle');
const repeatBtn = document.getElementById('repeat');
const repeatIcon = document.getElementById('repeatIcon');
const repeatBadge = document.getElementById('repeatBadge');
const volume = document.getElementById('volume');
const btnPlaylist = document.getElementById('btnPlaylist');

const playlistPanel = document.getElementById('playlistPanel');
const playlistList = document.getElementById('playlistList');
const btnCloseList = document.getElementById('btnCloseList');

const canvas = document.getElementById('viz');
const ctx = canvas.getContext('2d');

let current = 0;
let order = tracks.map((_, i) => i);
let isShuffle = false;
let repeatMode = 0;

function formatTime(s) { if (!isFinite(s)) return '0:00'; const m = Math.floor(s / 60), sec = Math.floor(s % 60).toString().padStart(2, '0'); return `${m}:${sec}`; }
function shuffleArray(a) { const arr = a.slice(); for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; }

function renderPlaylist() {
  playlistList.innerHTML = '';
  order.forEach((idx, i) => {
    const t = tracks[idx];
    const el = document.createElement('div'); el.className = 'track'; el.dataset.idx = idx;
    el.innerHTML = `<div class="track-thumb"><img src="${t.cover || 'covers/default.jpg'}" alt=""></div>
                    <div class="track-meta"><div class="t">${t.title}</div><div class="a">${t.artist}</div></div>
                    <div class="playing-wrap"></div>`;
    el.addEventListener('click', () => { loadTrack(idx); play(); togglePanel(false); });
    playlistList.appendChild(el);
  });
  highlightPlaying();
}

function loadTrack(idx) {
  current = idx;
  const t = tracks[current];
  audio.src = t.src;
  titleEl.textContent = t.title;
  artistEl.textContent = t.artist;
  cover.src = t.cover || 'covers/default.jpg';
  bg.style.backgroundImage = `url('${t.cover || 'covers/default.jpg'}')`;
  audio.load();
  highlightPlaying();
}

function play() {
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume().catch(() => { });
  audio.play().then(() => {
    document.body.classList.add('playing');
    playIcon.textContent = 'pause';
    playBtn.setAttribute('aria-pressed', 'true');
  }).catch(e => console.warn('play blocked', e));
}
function pause() {
  audio.pause();
  document.body.classList.remove('playing');
  playIcon.textContent = 'play_arrow';
  playBtn.setAttribute('aria-pressed', 'false');
}

function next() {
  let i = order.indexOf(current);
  i = (i + 1) % order.length;
  const nxt = order[i];
  loadTrack(nxt); play();
}
function prev() {
  let i = order.indexOf(current);
  i = (i - 1 + order.length) % order.length;
  const prv = order[i];
  loadTrack(prv); play();
}

function highlightPlaying() {
  Array.from(playlistList.children).forEach(el => {
    const idx = Number(el.dataset.idx);
    const wrap = el.querySelector('.playing-wrap');
    wrap.innerHTML = '';
    el.classList.toggle('active', idx === current);
    if (idx === current && !audio.paused && audio.currentTime > 0) {
      const b = document.createElement('div'); b.className = 'playing-badge'; b.textContent = 'playing'; wrap.appendChild(b);
    }
    el.style.opacity = idx === current ? '1' : '0.95';
  });
}

audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    const pct = (audio.currentTime / audio.duration) * 100;
    seek.value = pct;
    cur.textContent = formatTime(audio.currentTime);
    dur.textContent = formatTime(audio.duration);
  }
  highlightPlaying();
});
seek.addEventListener('input', () => { if (audio.duration) audio.currentTime = (seek.value / 100) * audio.duration; });

volume.addEventListener('input', () => audio.volume = volume.value);

shuffleBtn.addEventListener('click', () => {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle('active', isShuffle);
  if (isShuffle) {
    const rest = tracks.map((_, i) => i).filter(i => i !== current);
    order = [current, ...shuffleArray(rest)];
  } else {
    order = tracks.map((_, i) => i);
  }
  renderPlaylist();
});

repeatBtn.addEventListener('click', () => {
  repeatMode = (repeatMode + 1) % 3;
  updateRepeatUI();
});
function updateRepeatUI() {
  repeatBtn.classList.toggle('active', repeatMode > 0);
  if (repeatMode === 0) { repeatIcon.textContent = 'repeat'; repeatBadge.style.display = 'none'; repeatBtn.title = 'Repeat Off'; }
  else if (repeatMode === 1) { repeatIcon.textContent = 'repeat'; repeatBadge.style.display = 'none'; repeatBtn.title = 'Repeat All'; }
  else { repeatIcon.textContent = 'repeat_one'; repeatBadge.style.display = 'flex'; repeatBtn.title = 'Repeat One'; }
}

audio.addEventListener('ended', () => {
  if (repeatMode === 2) { audio.currentTime = 0; play(); return; }
  let i = order.indexOf(current);
  i = (i + 1) % order.length;
  if (i === 0 && repeatMode === 0 && !isShuffle) { pause(); return; }
  const nxt = order[i];
  loadTrack(nxt); play();
});

function togglePanel(show) {
  if (show === undefined) show = !playlistPanel.classList.contains('active');
  playlistPanel.classList.toggle('active', show);
  playlistPanel.setAttribute('aria-hidden', !playlistPanel.classList.contains('active'));
}
btnPlaylist.addEventListener('click', () => togglePanel(true));
btnCloseList.addEventListener('click', () => togglePanel(false));

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') { e.preventDefault(); audio.paused ? play() : pause(); }
  if (e.code === 'ArrowRight') { audio.currentTime += 5; }
  if (e.code === 'ArrowLeft') { audio.currentTime -= 5; }
});

let audioCtx, analyser, dataArray, sourceNode, vizAnim;
function initVisualizer() {
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser(); analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount; dataArray = new Uint8Array(bufferLength);
    sourceNode = audioCtx.createMediaElementSource(audio);
    sourceNode.connect(analyser); analyser.connect(audioCtx.destination);
    resizeCanvas(); window.addEventListener('resize', resizeCanvas);
    drawViz();
  } catch (e) { console.warn('viz init failed', e); }
}
function resizeCanvas() { const r = canvas.getBoundingClientRect(); canvas.width = r.width * devicePixelRatio; canvas.height = r.height * devicePixelRatio; ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0); }
function drawViz() {
  vizAnim = requestAnimationFrame(drawViz);
  if (!analyser) return;
  analyser.getByteFrequencyData(dataArray);
  const w = canvas.clientWidth, h = canvas.clientHeight;
  ctx.clearRect(0, 0, w, h);
  const bars = 28;
  const bw = w / bars;
  for (let i = 0; i < bars; i++) {
    const v = dataArray[i] / 255;
    
    const bh = Math.pow(v, 1.2) * h * 0.95;
    const x = i * bw;
    const grad = ctx.createLinearGradient(x, h - bh, x, h);
    grad.addColorStop(0, 'rgba(255,107,159,0.9)');
    grad.addColorStop(0.6, 'rgba(122,252,255,0.8)');
    grad.addColorStop(1, 'rgba(255,255,255,0.06)');
    ctx.fillStyle = grad;
    ctx.fillRect(x + bw * 0.12, h - bh, bw * 0.76, bh);
    ctx.globalAlpha = 0.08;
    ctx.fillRect(x + bw * 0.12, h - bh + 6, bw * 0.76, 4);
    ctx.globalAlpha = 1;
  }
}

function start() {
  renderPlaylist();
  loadTrack(0);

  playBtn.addEventListener('click', function onceInit() {
    if (!audioCtx) initVisualizer();
    this.removeEventListener('click', onceInit);
  });

  playBtn.addEventListener('click', () => { audio.paused ? play() : pause(); });

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  window.VibeWave = { play, pause, next, prev, loadTrack, tracks };
}
start();