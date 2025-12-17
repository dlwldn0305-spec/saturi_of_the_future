// mainpage.js

// ================================
// 1. 지역별 상태 정의
// ================================
const DIALECTS = {
  ks: {
    titleSrc: "./mainpage/ks/ks_title.svg",
    firstTransforms: [0, 0, 0, -60, -120, -60, -60, -60],
    secondTransforms: [-60, -120, -60, -120, -180, -180, -120, -180],
    triangleSrcs: [
      "./mainpage/ks/up.svg",
      "./mainpage/ks/down.svg",
      "./mainpage/ks/up.svg",
      "./mainpage/ks/up.svg",
      "./mainpage/ks/up.svg",
      "./mainpage/ks/down.svg",
      "./mainpage/ks/up.svg",
      "./mainpage/ks/down.svg"
    ],
    triangleTransforms: [-60, -120, -60, -120, -180, -180, -120, -180],
    trianglePattern: ["up", "down", "up", "up", "up", "down", "up", "down"],
    audio: [
      "./mainpage/audio/toypiano_5.wav",
      "./mainpage/audio/toypiano_3.wav",
      "./mainpage/audio/toypiano_5.wav",
      "./mainpage/audio/toypiano_6.wav",
      "./mainpage/audio/toypiano_7.wav",
      "./mainpage/audio/toypiano_4.wav",
      "./mainpage/audio/toypiano_5.wav",
      "./mainpage/audio/toypiano_4.wav"
    ]
  },

  jr: {
    titleSrc: "./mainpage/jr/jr_title.svg",
    firstTransforms: [0, 0, -60, -120, -60, -120, -60, -60],
    secondTransforms: [-120, -60, -120, -180, -180, -180, -180, -120],
    triangleSrcs: [
      "./mainpage/jr/down.svg",
      "./mainpage/jr/up.svg",
      "./mainpage/jr/up.svg",
      "./mainpage/jr/up.svg",
      "./mainpage/jr/down.svg",
      "./mainpage/jr/up.svg",
      "./mainpage/jr/down.svg",
      "./mainpage/jr/up.svg"
    ],
    triangleTransforms: [-120, -60, -120, -180, -180, -180, -180, -120],
    trianglePattern: ["down", "up", "up", "up", "down", "up", "down", "up"],
    audio: [
      "./mainpage/audio/toypiano_4.wav",
      "./mainpage/audio/toypiano_5.wav",
      "./mainpage/audio/toypiano_6.wav",
      "./mainpage/audio/toypiano_7.wav",
      "./mainpage/audio/toypiano_4.wav",
      "./mainpage/audio/toypiano_6.wav",
      "./mainpage/audio/toypiano_4.wav",
      "./mainpage/audio/toypiano_5.wav"
    ]
  },

  cc: {
    titleSrc: "./mainpage/cc/cc_title.svg",
    firstTransforms: [0, -60, 0, 0, -120, -60, 0, -60],
    secondTransforms: [-120, -120, -120, -120, -180, -180, -120, -120],
    triangleSrcs: [
      "./mainpage/cc/down.svg",
      "./mainpage/cc/up.svg",
      "./mainpage/cc/right.svg",
      "./mainpage/cc/right.svg",
      "./mainpage/cc/up.svg",
      "./mainpage/cc/down.svg",
      "./mainpage/cc/down.svg",
      "./mainpage/cc/up.svg"
    ],
    triangleTransforms: [-120, -120, -120, -120, -180, -180, -120, -120],
    trianglePattern: ["down", "up", "right", "right", "up", "down", "down", "up"],
    audio: [
      "./mainpage/audio/toypiano_4.wav",
      "./mainpage/audio/toypiano_5.wav",
      "./mainpage/audio/toypiano_5.wav",
      "./mainpage/audio/toypiano_5.wav",
      "./mainpage/audio/toypiano_7.wav",
      "./mainpage/audio/toypiano_5.wav",
      "./mainpage/audio/toypiano_4.wav",
      "./mainpage/audio/toypiano_5.wav"
    ]
  },

  kw: {
    titleSrc: "./mainpage/kw/kw_title.svg",
    firstTransforms: [-60,-60,-60,-60,-60,-60,-60,-60],
    secondTransforms: [-120, -180,-120, -180,-120, -180, -120, -180],
    triangleSrcs: [
      "./mainpage/kw/up.svg",
      "./mainpage/kw/down.svg",
      "./mainpage/kw/up.svg",
      "./mainpage/kw/down.svg",
      "./mainpage/kw/up.svg",
      "./mainpage/kw/down.svg",
      "./mainpage/kw/up.svg",
      "./mainpage/kw/down.svg"
    ],
    triangleTransforms: [-120, -180, -120, -180,-120, -180, -120, -180],
    trianglePattern: ["up", "down", "up", "down", "up", "down", "up", "down"],
    audio: [
      "./mainpage/audio/toypiano_5.wav",
      "./mainpage/audio/toypiano_4.wav",
      "./mainpage/audio/toypiano_5.wav",
      "./mainpage/audio/toypiano_4.wav",
      "./mainpage/audio/toypiano_5.wav",
      "./mainpage/audio/toypiano_4.wav",
      "./mainpage/audio/toypiano_5.wav",
      "./mainpage/audio/toypiano_4.wav"
    ]
  },

  jj: {
    titleSrc: "./mainpage/jj/jj_title.svg",
    firstTransforms: [0, 0, 0, -60,  -60,  -60,  -60, 0],
    secondTransforms: [-120, -120, -120, -120, -180, -120, -180, -120],
    triangleSrcs: [
      "./mainpage/jj/right.svg",
      "./mainpage/jj/right.svg",
      "./mainpage/jj/right.svg",
      "./mainpage/jj/up.svg",
      "./mainpage/jj/down.svg",
      "./mainpage/jj/up.svg",
      "./mainpage/jj/down.svg",
      "./mainpage/jj/down.svg"
    ],
    triangleTransforms: [-120, -120, -120, -120, -180, -120, -180, -120],
    trianglePattern: ["right", "right", "right", "up", "down", "up", "down", "down"],
    audio: [
      "./mainpage/audio/toypiano_4.wav",
      "./mainpage/audio/toypiano_4.wav",
      "./mainpage/audio/toypiano_4.wav",
      "./mainpage/audio/toypiano_5.wav",
      "./mainpage/audio/toypiano_4.wav",
      "./mainpage/audio/toypiano_5.wav",
      "./mainpage/audio/toypiano_4.wav",
      "./mainpage/audio/toypiano_3.wav"
    ]
  }
};

// 자동 순환 순서
const DIALECT_ORDER = ["ks", "jr", "cc", "kw", "jj"];

// ================================
// 2. 전역 상태
// ================================
let currentDialect = "ks";   // 자동 전환용 내부 상태
let visibleDialect = "ks";   // 화면에 실제로 보이는 상태
let selectedDialect = null;  // 스페이스로 최종 선택된 지역

let isAnimating = false;
let isLocked = false;
let cycleTimer = null;

let arrowGameActive = false;
let userInput = [];      // 이제는 거의 안 쓰지만 유지만 함
let currentIndex = 0;    // ▶ 현재 몇 번째 블럭을 풀고 있는지

// 방향키 피드백에 쓸 DOM 레퍼런스
let secondBlocksRef = [];
let keyLineImgsRef = [];

// ================================
// 3. 초기 세팅
// ================================
window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector(".canvas");
  const titleImg = document.getElementById("ks_title");
  const firstLineImgs = Array.from(document.querySelectorAll(".first_line img"));
  const secondBlocks = Array.from(document.querySelectorAll(".secound_line .block"));
  const keyLineImgs = Array.from(document.querySelectorAll(".key_line img"));
  const explainImg = document.querySelector(".explain");

  // 전역 레퍼런스 저장
  secondBlocksRef = secondBlocks;
  keyLineImgsRef = keyLineImgs;

  // 1) 처음 로드시 ks 상태로 세팅
  applyDialectInstant("ks", { titleImg, firstLineImgs, secondBlocks });

  // 2) 자동 전환 타이머
  cycleTimer = setInterval(() => {
    if (isLocked || isAnimating) return;
    const nextId = getNextDialectId(currentDialect);
    switchDialect(nextId, { titleImg, firstLineImgs, secondBlocks });
  }, 2000);

  // 3) 키보드 입력
  document.addEventListener("keydown", (e) => {
    // --- 스페이스 : 현재 떠있는 지역 선택 ---
    if (e.code === "Space") {
      if (isLocked || isAnimating) return;

      isLocked = true;
      clearInterval(cycleTimer);

      if (explainImg) explainImg.src = "./mainpage/explan.svg";

      selectedDialect = visibleDialect;

      showArrowsFor(selectedDialect, { canvas, keyLineImgs });

      arrowGameActive = true;
      userInput = [];
      currentIndex = 0;
      return;
    }

    // --- 방향키 입력 ---
    if (!arrowGameActive) return;

    // ✅ right까지 받기
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown" && e.key !== "ArrowRight") return;

    e.preventDefault();
    handleArrowInput(e.key);
  });
});

// ================================
// 4. 보조 함수들
// ================================

// 다음 지역 id
function getNextDialectId(currentId) {
  const idx = DIALECT_ORDER.indexOf(currentId);
  if (idx === -1) return DIALECT_ORDER[0];
  const nextIdx = (idx + 1) % DIALECT_ORDER.length;
  return DIALECT_ORDER[nextIdx];
}

// ✅ 블럭 안에서 특정 지역 이미지 얻기
function getDialectImg(block, id) {
  return block.querySelector(`.img-${id}`);
}

// ✅ 블럭 안 img-xx 전부 숨기고 active만 보여주기(즉시/초기용)
function setBlockDialectImages(block, activeId, opts = {}) {
  const { animate = false } = opts;

  const imgs = Array.from(block.querySelectorAll('img[class*="img-"]'));
  if (!imgs.length) return;

  imgs.forEach((img) => {
    img.style.transition = animate ? "transform 0.4s ease" : "none";
    img.style.transform = "translateY(100%)";
  });

  const active = getDialectImg(block, activeId);
  if (active) {
    active.style.transition = animate ? "transform 0.4s ease" : "none";
    active.style.transform = "translateY(0)";
  }
}

// ✅ from → to 슬라이드 (공통)
function slideBlockDialectImages(block, fromId, toId) {
  const fromImg = getDialectImg(block, fromId);
  const toImg = getDialectImg(block, toId);
  if (!fromImg || !toImg) return;

  // 나머지 지역 이미지는 아래로 숨김(깜빡임 방지)
  const others = Array.from(block.querySelectorAll('img[class*="img-"]'))
    .filter((img) => img !== fromImg && img !== toImg);

  others.forEach((img) => {
    img.style.transition = "none";
    img.style.transform = "translateY(100%)";
  });

  fromImg.style.transition = "transform 0.4s ease";
  toImg.style.transition = "transform 0.4s ease";

  // 들어올 애는 아래에서 시작
  toImg.style.transform = "translateY(100%)";

  requestAnimationFrame(() => {
    fromImg.style.transform = "translateY(-100%)";
    toImg.style.transform = "translateY(0)";
  });

  // 끝난 뒤 fromImg도 아래로 정리해서 다음 전환에 일관성 유지
  setTimeout(() => {
    if (getDialectImg(block, toId) === toImg) {
      fromImg.style.transition = "none";
      fromImg.style.transform = "translateY(100%)";
    }
  }, 420);
}

// 즉시 적용 (초기 세팅용, 애니메이션 없음)
function applyDialectInstant(id, els) {
  const d = DIALECTS[id];
  const { titleImg, firstLineImgs, secondBlocks } = els;

  if (titleImg) {
    titleImg.src = d.titleSrc;
    titleImg.style.opacity = 1;
    titleImg.style.transform = "translateY(0)";
  }

  // 첫째 줄 위치
  firstLineImgs.forEach((img, i) => {
    const ty = d.firstTransforms[i] ?? 0;
    img.style.transition = "none";
    img.style.transform = `translateY(${ty}px)`;
  });

  // 둘째 줄 프레임 위치 + 프레임 안 이미지 배치(5개 지역 공통)
  secondBlocks.forEach((block, i) => {
    const ty = d.secondTransforms[i] ?? 0;
    block.style.transition = "none";
    block.style.transform = `translateY(${ty}px)`;

    setBlockDialectImages(block, id, { animate: false });
  });

  currentDialect = id;
  visibleDialect = id;
}

// 자동 전환 (애니메이션)
function switchDialect(targetId, els) {
  const fromId = currentDialect;
  if (fromId === targetId) return;

  const to = DIALECTS[targetId];
  const { titleImg, firstLineImgs, secondBlocks } = els;

  isAnimating = true;
  currentDialect = targetId;

  // 1) 타이틀 이미지 교체
  if (titleImg) {
    titleImg.style.transition = "transform 0.25s ease, opacity 0.25s ease";
    titleImg.style.opacity = 0;
    titleImg.style.transform = "translateY(-10px)";

    setTimeout(() => {
      titleImg.src = to.titleSrc;
      titleImg.style.transition = "none";
      titleImg.style.transform = "translateY(10px)";
      titleImg.style.opacity = 0;

      requestAnimationFrame(() => {
        titleImg.style.transition = "transform 0.25s ease, opacity 0.25s ease";
        titleImg.style.transform = "translateY(0)";
        titleImg.style.opacity = 1;
      });
    }, 200);
  }

  // 2) 첫째 줄 위치 변경
  firstLineImgs.forEach((img, i) => {
    const ty = to.firstTransforms[i] ?? 0;
    img.style.transition = "transform 0.4s ease";
    img.style.transform = `translateY(${ty}px)`;
  });

  // 3) 둘째 줄 프레임 + 프레임 안 이미지 슬라이드(5개 지역 공통)
  secondBlocks.forEach((block, i) => {
    const ty = to.secondTransforms[i] ?? 0;
    block.style.transition = "transform 0.4s ease";
    block.style.transform = `translateY(${ty}px)`;

    slideBlockDialectImages(block, fromId, targetId);
  });

  setTimeout(() => {
    isAnimating = false;
    visibleDialect = targetId;
  }, 450);
}

// 선택된 지역에 맞는 화살표 이미지 + 높이 세팅 후 보이기
function showArrowsFor(id, els) {
  const d = DIALECTS[id];
  const { canvas, keyLineImgs } = els;

  if (!d || !d.triangleSrcs) return;

  keyLineImgs.forEach((img, i) => {
    const src = d.triangleSrcs[i];
    const ty = d.triangleTransforms ? d.triangleTransforms[i] : 0;

    if (src) img.src = src;
    img.style.opacity = 1;
    img.style.transform = `translateY(${ty}px)`;
  });

  if (canvas) canvas.classList.add("show-arrows");
}

// ================================
// 5. 방향키 입력 처리
// ================================

function handleArrowInput(key) {
  const d = DIALECTS[selectedDialect];
  if (!d || !d.trianglePattern) return;

  const dir =
    key === "ArrowUp" ? "up" :
    key === "ArrowDown" ? "down" :
    key === "ArrowRight" ? "right" :
    null;

  if (!dir) return;

  const pattern = d.trianglePattern;
  const idx = currentIndex;

  // 🔊 오디오 재생
  if (d.audio && d.audio[idx]) {
    const audio = new Audio(d.audio[idx]);
    audio.currentTime = 0;
    audio.play();
  }

  if (idx >= pattern.length) return;

  const block = secondBlocksRef[idx];
  const arrow = keyLineImgsRef[idx];

  const baseTyBlock = d.secondTransforms ? (d.secondTransforms[idx] ?? 0) : 0;
  const baseTyArrow = d.triangleTransforms ? (d.triangleTransforms[idx] ?? 0) : 0;

  // 오답
  if (pattern[idx] !== dir) {
    if (block) shakeBlockHorizontal(block, baseTyBlock);
    if (arrow) flashArrow(arrow, baseTyArrow);
    return;
  }

  
  // 정답
if (block && d.secondTransforms) {
  if (dir === "up") {
    flashBlockUp(block, baseTyBlock);
    d.secondTransforms[idx] = baseTyBlock - 60;
  } else if (dir === "down") {
    flashBlockDown(block, baseTyBlock);
    d.secondTransforms[idx] = baseTyBlock + 60;
  } else {
    // right 는 그대로 제자리 움찔 유지
    flashBlockRight(block, baseTyBlock);
  }
}


  if (arrow) {
    flashArrow(arrow, baseTyArrow);
    setTimeout(() => {
      arrow.style.opacity = 0;
    }, 100);
  }

  currentIndex++;

  if (currentIndex === pattern.length) {
    arrowGameActive = false;

    const BEFORE_REPLAY_DELAY = 400;
    const AFTER_REPLAY_DELAY = 1000;

    setTimeout(() => {
      playSuccessSequence(selectedDialect, () => {
        setTimeout(() => {
          window.location.href = "index2.html";
        }, AFTER_REPLAY_DELAY);
      });
    }, BEFORE_REPLAY_DELAY);
  }
}

// ================================
// 6. 블럭 / 화살표 애니메이션들
// ================================

function flashBlockUp(block, fromY) {
  block.style.transition = "transform 0.18s ease, filter 0.18s ease";
  block.style.filter = "brightness(1.4)";
  block.style.transform = `translateY(${fromY - 60}px)`;

  setTimeout(() => {
    block.style.filter = "brightness(1)";
  }, 200);
}

function flashBlockDown(block, fromY) {
  block.style.transition = "transform 0.18s ease, filter 0.18s ease";
  block.style.filter = "brightness(1.4)";
  block.style.transform = `translateY(${fromY + 60}px)`;

  setTimeout(() => {
    block.style.filter = "brightness(1)";
  }, 200);
}

function flashBlockRight(block, baseY) {
  const upY = baseY - 10;

  block.style.transition = "transform 0.12s ease, filter 0.12s ease";
  block.style.filter = "brightness(1.4)";
  block.style.transform = `translateY(${upY}px)`;

  setTimeout(() => {
    block.style.transform = `translateY(${baseY}px)`;
    block.style.filter = "brightness(1)";
  }, 120);
}


// ================================
// 7. 전체 시퀀스 재생 + 블럭 애니메이션
// ================================
function playSuccessSequence(dialectId, onComplete) {
  const d = DIALECTS[dialectId];
  if (!d || !d.audio || !d.trianglePattern) {
    if (typeof onComplete === "function") onComplete();
    return;
  }

  const length = d.trianglePattern.length;
  const interval = 220;

  let i = 0;

  function step() {
    if (i >= length) {
      if (typeof onComplete === "function") onComplete();
      return;
    }

    const src = d.audio[i];
    if (src) {
      const audio = new Audio(src);
      audio.currentTime = 0;
      audio.play();
    }

    const block = secondBlocksRef[i];
    if (block && d.secondTransforms) {
      const baseY = d.secondTransforms[i] ?? 0;

      block.style.transition = "transform 0.18s ease, filter 0.18s ease";
      block.style.filter = "brightness(1.4)";
      block.style.transform = `translateY(${baseY - 15}px)`;

      setTimeout(() => {
        block.style.transform = `translateY(${baseY}px)`;
        block.style.filter = "brightness(1)";
      }, interval - 40);
    }

    i++;
    setTimeout(step, interval);
  }

  step();
}

// 오답: 가로 흔들기
function shakeBlockHorizontal(block, baseY) {
  if (!block) return;

  const shakeDistance = 10;
  const duration = 250;
  const steps = [-1, 1, -1, 1, -0.5, 0];

  let i = 0;
  block.style.transition = "transform 0.04s ease";

  const timer = setInterval(() => {
    const dx = steps[i] * shakeDistance;
    block.style.transform = `translateY(${baseY}px) translateX(${dx}px)`;
    i++;

    if (i >= steps.length) {
      clearInterval(timer);
      block.style.transform = `translateY(${baseY}px)`;
    }
  }, duration / steps.length);
}

// 화살표 움찔
function flashArrow(arrow, baseY) {
  arrow.style.transition = "transform 0.10s ease";
  arrow.style.transform = `translateY(${baseY - 8}px) scale(1.1)`;

  setTimeout(() => {
    arrow.style.transform = `translateY(${baseY}px) scale(1)`;
  }, 100);
}
