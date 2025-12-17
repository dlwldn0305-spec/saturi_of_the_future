console.log("interactive.js loaded");
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') window.location.href = "index.html";
  if (e.key === 'ArrowLeft') window.location.href = "jj_zine.html";
});
/* =========================
   AUDIO CONFIG
   ========================= */
const AUDIO_BASE = "./mainpage/audio/";

// 🔥 여기만 줄이면 빨라짐 (ms)
const SOUND_GAP = 200;

// ✅ key: "이미지 src(상대경로 그a대로)"
// ✅ value: "재생할 m4a 파일명 배열" (AUDIO_BASE 기준)
const AUDIO_MAP = {
  /* =========================
     BASIC (서울말)
     ========================= */
  "./interactive/decision_to_leave/basic/1.svg":  ["e.m4a"],
  "./interactive/decision_to_leave/basic/2.svg":  ["e.m4a"],
  "./interactive/decision_to_leave/basic/3.svg": ["e.m4a","e.m4a", "e.m4a"],
  "./interactive/decision_to_leave/basic/4.svg": ["e.m4a","e.m4a","e.m4a","e.m4a"],
  "./interactive/decision_to_leave/basic/5.svg":  ["e.m4a","e.m4a","e.m4a"],
  "./interactive/decision_to_leave/basic/6.svg": ["e.m4a","e.m4a"],
  "./interactive/decision_to_leave/basic/7.svg":  ["e.m4a"],
  "./interactive/decision_to_leave/basic/8.svg":  ["e.m4a","e.m4a","e.m4a","e.m4a","e.m4a"],
  "./interactive/decision_to_leave/basic/9.svg":  ["e.m4a","e.m4a","e.m4a"],
  "./interactive/decision_to_leave/basic/10.svg": ["e.m4a","e.m4a","e.m4a","e.m4a"],
  "./interactive/decision_to_leave/basic/11.svg": ["e.m4a","e.m4a","e.m4a"],
  "./interactive/decision_to_leave/basic/12.svg": ["e.m4a"],
  "./interactive/decision_to_leave/basic/13.svg": ["e.m4a","e.m4a","e.m4a","e.m4a","e.m4a"],

  /* =========================
     KS (경상도)
     ========================= */
  "./interactive/decision_to_leave/ks/1.svg":  ["e.m4a"],
  "./interactive/decision_to_leave/ks/2.svg":  ["d.m4a"],
  "./interactive/decision_to_leave/ks/3.svg":  ["e.m4a","f.m4a"],
  "./interactive/decision_to_leave/ks/4.svg":  ["e.m4a","e.m4a","f.m4a","e.m4a"],
  "./interactive/decision_to_leave/ks/5.svg":  ["f.m4a","e.m4a","c.m4a"],
  "./interactive/decision_to_leave/ks/6.svg":  ["f.m4a","e.m4a"],
  "./interactive/decision_to_leave/ks/7.svg":  ["f.m4a"],
  "./interactive/decision_to_leave/ks/8.svg":  ["c.m4a","d.m4a","e.m4a","e.m4a","d.m4a"],
  "./interactive/decision_to_leave/ks/9.svg":  ["c.m4a","d.m4a","e.m4a"],
  "./interactive/decision_to_leave/ks/10.svg": ["d.m4a","e.m4a","f.m4a","e.m4a","d.m4a","c.m4a"],
  "./interactive/decision_to_leave/ks/11.svg": ["e.m4a","f.m4a"],
  "./interactive/decision_to_leave/ks/12.svg": ["d.m4a"],
  "./interactive/decision_to_leave/ks/13.svg": ["c.m4a","d.m4a","d.m4a","d.m4a","c.m4a"],

 /* =========================
   JR (전라도)
   ========================= */
"./interactive/decision_to_leave/jr/1.svg":  ["e.m4a"],
"./interactive/decision_to_leave/jr/2.svg":  ["f.m4a"],
"./interactive/decision_to_leave/jr/3.svg":  ["e.m4a","d.m4a"],
"./interactive/decision_to_leave/jr/4.svg":  ["e.m4a","e.m4a","f.m4a","d.m4a"],
"./interactive/decision_to_leave/jr/5.svg":  ["e.m4a","e.m4a"],

"./interactive/decision_to_leave/jr/6.svg":  ["f.m4a","f.m4a"],
"./interactive/decision_to_leave/jr/7.svg":  ["d.m4a"],
"./interactive/decision_to_leave/jr/8.svg":  ["e.m4a","e.m4a","e.m4a","d.m4a"],
"./interactive/decision_to_leave/jr/9.svg":  ["e.m4a","e.m4a","f.m4a","e.m4a","f.m4a"],
"./interactive/decision_to_leave/jr/10.svg": ["e.m4a","e.m4a","f.m4a","e.m4a","d.m4a"],

"./interactive/decision_to_leave/jr/11.svg": ["e.m4a","d.m4a"],
"./interactive/decision_to_leave/jr/12.svg": ["e.m4a"],
"./interactive/decision_to_leave/jr/13.svg": ["f.m4a","e.m4a","f.m4a","g.m4a","g.m4a"],


  /* =========================
   CC (충청도)
   ========================= */
"./interactive/decision_to_leave/cc/1.svg":  ["e.m4a","e.m4a"],
"./interactive/decision_to_leave/cc/2.svg":  ["f.m4a"],
"./interactive/decision_to_leave/cc/3.svg":  ["e.m4a","f.m4a"],
"./interactive/decision_to_leave/cc/4.svg":  ["f.m4a","e.m4a","e.m4a","d.m4a"],
"./interactive/decision_to_leave/cc/5.svg":  ["e.m4a","d.m4a","c.m4a"],

"./interactive/decision_to_leave/cc/6.svg":  ["e.m4a","e.m4a","e.m4a"],
"./interactive/decision_to_leave/cc/7.svg":  ["d.m4a"],
"./interactive/decision_to_leave/cc/8.svg":  ["d.m4a","c.m4a","c.m4a"],
"./interactive/decision_to_leave/cc/9.svg":  ["e.m4a","e.m4a","e.m4a"],
"./interactive/decision_to_leave/cc/10.svg": ["f.m4a","f.m4a","e.m4a","f.m4a","f.m4a","f.m4a","e.m4a"],

"./interactive/decision_to_leave/cc/11.svg": ["f.m4a","e.m4a"],
"./interactive/decision_to_leave/cc/12.svg": ["e.m4a"],
"./interactive/decision_to_leave/cc/13.svg": ["e.m4a","d.m4a","c.m4a","c.m4a"],


/* =========================
   KW (강원도)
   ========================= */
"./interactive/decision_to_leave/kw/1.svg":  ["f.m4a"],
"./interactive/decision_to_leave/kw/2.svg":  ["e.m4a"],
"./interactive/decision_to_leave/kw/3.svg":  ["e.m4a","d.m4a"],
"./interactive/decision_to_leave/kw/4.svg":  ["e.m4a","f.m4a","e.m4a","d.m4a"],
"./interactive/decision_to_leave/kw/5.svg":  ["d.m4a","c.m4a","d.m4a"],

"./interactive/decision_to_leave/kw/6.svg":  ["e.m4a","e.m4a","e.m4a"],
"./interactive/decision_to_leave/kw/7.svg":  ["d.m4a"],
"./interactive/decision_to_leave/kw/8.svg":  ["e.m4a","d.m4a","e.m4a","d.m4a","d.m4a"],
"./interactive/decision_to_leave/kw/9.svg":  ["d.m4a","e.m4a","d.m4a"],
"./interactive/decision_to_leave/kw/10.svg": ["e.m4a","d.m4a","e.m4a","d.m4a","e.m4a","d.m4a","f.m4a"],

"./interactive/decision_to_leave/kw/11.svg": ["f.m4a","e.m4a","f.m4a"],
"./interactive/decision_to_leave/kw/12.svg": ["e.m4a"],
"./interactive/decision_to_leave/kw/13.svg": ["d.m4a","e.m4a","d.m4a","e.m4a","d.m4a"],


/* =========================
   JJ (제주도)
   ========================= */
"./interactive/decision_to_leave/jj/1.svg":  ["f.m4a","e.m4a"],
"./interactive/decision_to_leave/jj/2.svg":  ["e.m4a"],
"./interactive/decision_to_leave/jj/3.svg":  ["e.m4a","d.m4a"],
"./interactive/decision_to_leave/jj/4.svg":  ["f.m4a","e.m4a","e.m4a","e.m4a"],
"./interactive/decision_to_leave/jj/5.svg":  ["f.m4a","e.m4a"],

"./interactive/decision_to_leave/jj/6.svg":  ["d.m4a","d.m4a","d.m4a"],
"./interactive/decision_to_leave/jj/7.svg":  ["e.m4a"],
"./interactive/decision_to_leave/jj/8.svg":  ["e.m4a","e.m4a","e.m4a","e.m4a","d.m4a"],
"./interactive/decision_to_leave/jj/9.svg":  ["e.m4a","f.m4a","e.m4a"],
"./interactive/decision_to_leave/jj/10.svg": ["f.m4a","e.m4a","e.m4a","e.m4a","e.m4a","e.m4a"],

"./interactive/decision_to_leave/jj/11.svg": ["f.m4a"],
"./interactive/decision_to_leave/jj/12.svg": ["f.m4a","e.m4a"],
"./interactive/decision_to_leave/jj/13.svg": ["e.m4a","e.m4a","e.m4a","d.m4a","c.m4a"]
};


/* =========================
   AUDIO ENGINE
   ========================= */
const audioProtoCache = new Map();

// 같은 파일 여러 번 연타해도 겹쳐서 나게 cloneNode 사용
function getAudioInstance(url){
  let proto = audioProtoCache.get(url);
  if (!proto){
    proto = new Audio(url);
    proto.preload = "auto";
    audioProtoCache.set(url, proto);
  }
  const a = proto.cloneNode(true);
  a.preload = "auto";
  return a;
}

function sleep(ms){
  return new Promise((r) => setTimeout(r, ms));
}

// 사운드 날 때마다 카드 바운스
function triggerSoundAnim(wrap){
  wrap.classList.remove("sound-active");
  void wrap.offsetWidth;
  wrap.classList.add("sound-active");
}

// 카드 1개에 매핑된 음절 배열 재생
async function playCard(wrap, tokenKey, myToken){
  const img = wrap.querySelector("img.word.current");
  if (!img) return;

  const src = img.getAttribute("src"); // ✅ 상대경로 유지
  const list = AUDIO_MAP[src] || [];
  if (list.length === 0) return;

  for (const file of list){
    if (playToken[tokenKey] !== myToken) return;

    triggerSoundAnim(wrap);

    const url = AUDIO_BASE + file;
    const a = getAudioInstance(url);

    try { await a.play(); } catch (e) {}

    // 🔥 여기 간격이 “속도” 체감임
    await sleep(SOUND_GAP);
  }
}

// 줄 단위 재생 취소 토큰
const playToken = { line1: 0, line2: 0, line3: 0 };

function getLineWraps(lineIndex){
  const selector =
    lineIndex === 1 ? ".first_line .word-slot" :
    lineIndex === 2 ? ".second_line .word-slot" :
    ".third_line .word-slot";
  return Array.from(document.querySelectorAll(selector));
}

async function playLine(lineIndex){
  const tokenKey = lineIndex === 1 ? "line1" : lineIndex === 2 ? "line2" : "line3";
  playToken[tokenKey] += 1;
  const myToken = playToken[tokenKey];

  const lineWraps = getLineWraps(lineIndex);

  // 카드 순서대로 재생
  for (const wrap of lineWraps){
    if (playToken[tokenKey] !== myToken) return;
    await playCard(wrap, tokenKey, myToken);
  }
}

/* =========================
   CARD / ANIMATION (기존)
   ========================= */
const TOTAL_SLOTS = 13;
// ✅ basic 포함
const REGIONS = ["basic", "ks", "jr", "cc", "kw", "jj"];

const BOUNCE_DUR = 420;
const SWAP_AT = 0.35;

let wraps = [];

function getRandomRegion(){
  return REGIONS[Math.floor(Math.random() * REGIONS.length)];
}
function getLineIndex(slot){
  if (slot <= 4) return 1;
  if (slot <= 9) return 2;
  return 3;
}
function getWordSrc(region, slot){
  return `./interactive/decision_to_leave/${region}/${slot}.svg`;
}

function bounceAndSwap(wrap, newRegion, delayMs = 0){
  const slot = Number(wrap.dataset.slot);
  const img = wrap.querySelector("img.word.current");
  if (!img) return;

  wrap.classList.remove("bounce");
  void wrap.offsetWidth;

  setTimeout(() => {
    wrap.classList.add("bounce");

    setTimeout(() => {
      img.dataset.region = newRegion;
      img.src = getWordSrc(newRegion, slot);
      wrap.dataset.region = newRegion;
    }, Math.floor(BOUNCE_DUR * SWAP_AT));

    setTimeout(() => {
      wrap.classList.remove("bounce");
    }, BOUNCE_DUR + 10);
  }, delayMs);
}

function initCards(){
  const firstLine = document.querySelector(".first_line");
  const secondLine = document.querySelector(".second_line");
  const thirdLine = document.querySelector(".third_line");

  if (!firstLine || !secondLine || !thirdLine){
    console.warn("[init] line containers not found");
    return;
  }

  firstLine.innerHTML = "";
  secondLine.innerHTML = "";
  thirdLine.innerHTML = "";
  wraps = [];

  for (let slot = 1; slot <= TOTAL_SLOTS; slot++){
    const region = getRandomRegion();

    const wrap = document.createElement("span");
    wrap.className = "word-slot";
    wrap.dataset.slot = String(slot);
    wrap.dataset.region = region;

    const img = document.createElement("img");
    img.className = "word current";
    img.alt = `${region} ${slot}`;
    img.dataset.region = region;
    img.src = getWordSrc(region, slot);

    wrap.appendChild(img);

    const lineIndex = getLineIndex(slot);
    if (lineIndex === 1) firstLine.appendChild(wrap);
    else if (lineIndex === 2) secondLine.appendChild(wrap);
    else thirdLine.appendChild(wrap);

    wraps.push(wrap);
  }

  wraps.forEach((wrap, i) => {
    const region = wrap.dataset.region;
    bounceAndSwap(wrap, region, i * 18);
  });

  console.log("[init] wraps:", wraps.length);
}

function createRandomSentence(){
  wraps.forEach((wrap, i) => {
    const newRegion = getRandomRegion();
    bounceAndSwap(wrap, newRegion, i * 18);
  });
}

function renderRegionSequence(region){
  wraps.forEach((wrap, i) => {
    bounceAndSwap(wrap, region, i * 18);
  });
}

function bindUI(){
  const tryMoreBtn = document.querySelector(".trymore");
  if (tryMoreBtn){
    tryMoreBtn.addEventListener("click", createRandomSentence);
  }

  const firstLine = document.querySelector(".first_line");
  const secondLine = document.querySelector(".second_line");
  const thirdLine = document.querySelector(".third_line");

  // ✅ 줄 클릭하면 그 줄만 순서대로 재생
  if (firstLine) firstLine.addEventListener("click", () => playLine(1));
  if (secondLine) secondLine.addEventListener("click", () => playLine(2));
  if (thirdLine) thirdLine.addEventListener("click", () => playLine(3));

  window.addEventListener("keydown", (e) => {
    const active = document.activeElement;
    const isTyping =
      (active && active.isContentEditable) ||
      (active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA"));
    if (isTyping) return;

    if (e.key === "1") renderRegionSequence("basic");
    if (e.key === "2") renderRegionSequence("ks");
    if (e.key === "3") renderRegionSequence("jr");
    if (e.key === "4") renderRegionSequence("cc");
    if (e.key === "5") renderRegionSequence("kw");
    if (e.key === "6") renderRegionSequence("jj");
  });
}

window.addEventListener("load", () => {
  initCards();
  bindUI();
});
