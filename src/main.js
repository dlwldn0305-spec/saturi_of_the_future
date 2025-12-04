// mainpage.js

// ================================
// 1. 지역별 상태 정의
// ================================
const DIALECTS = {
  ks: {
    titleSrc: "./mainpage/ks/ks_title.svg",

    // 첫 줄 위치
    firstTransforms: [0, 60, 0, -60, -120, 0, -60, 0],

    // 둘째 줄 프레임 위치
    secondTransforms: [-60, -60, -60, -120, -180, -120, -120, -120],

    // 경상도 화살표 이미지
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

    // 경상도 화살표 높이
    triangleTransforms: [-60, -60, -60, -120, -180, -120, -120, -120],

    // 경상도 정답 패턴
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

    // 전라도 첫 줄 위치
    firstTransforms: [60, 0, -60, -120, 0, -120, 0, -60],

    // 전라도 둘째 줄 프레임 위치
    secondTransforms: [-60, -60, -120, -180, -120, -180, -120, -120],

    // 전라도 화살표 이미지
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

    // 전라도 화살표 높이 (원하는 대로 조절)
    triangleTransforms: [-60, -60, -120, -180, -120, -180, -120, -120],

    // 전라도 정답 패턴
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
  }
};

// 자동 순환 순서
const DIALECT_ORDER = ["ks", "jr"];

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
  const firstLineImgs = Array.from(
    document.querySelectorAll(".first_line img")
  );
  const secondBlocks = Array.from(
    document.querySelectorAll(".secound_line .block")
  );
  const keyLineImgs = Array.from(
    document.querySelectorAll(".key_line img")
  );
  const explainImg = document.querySelector(".explain");

  // 전역 레퍼런스 저장
  secondBlocksRef = secondBlocks;
  keyLineImgsRef = keyLineImgs;

  // 1) 처음 로드시 경상도 상태로 세팅
  applyDialectInstant("ks", { titleImg, firstLineImgs, secondBlocks });

  // 2) 자동 전환 타이머
  //    🔸 속도 바꾸고 싶으면 여기 2000을 수정 (ms 단위)
  cycleTimer = setInterval(() => {
    if (isLocked || isAnimating) return;
    const nextId = getNextDialectId(currentDialect);
    switchDialect(nextId, { titleImg, firstLineImgs, secondBlocks });
  }, 2000);

  // 3) 키보드 입력
  document.addEventListener("keydown", (e) => {
    // --- 스페이스 : 현재 떠있는 지역 선택 ---
    if (e.code === "Space") {
      if (isLocked || isAnimating) return;   // 애니 중이면 무시

      isLocked = true;
      clearInterval(cycleTimer);

      if (explainImg) {
        explainImg.src = "./mainpage/explan.svg";
      }

      // 지금 화면에 보이는 지역을 선택으로 고정
      selectedDialect = visibleDialect;

      // 선택된 지역 기준으로 화살표 세팅
      showArrowsFor(selectedDialect, { canvas, keyLineImgs });

      arrowGameActive = true;
      userInput = [];
      currentIndex = 0;   // ▶ 첫 블럭부터 시작
      return;
    }

    // --- 방향키 입력 ---
    if (!arrowGameActive) return;
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;

    e.preventDefault(); // 스크롤 방지
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

  // 둘째 줄 프레임 위치 + 프레임 안 이미지 배치
  secondBlocks.forEach((block, i) => {
    const ty = d.secondTransforms[i] ?? 0;
    block.style.transition = "none";
    block.style.transform = `translateY(${ty}px)`;

    const ksImg = block.querySelector(".img-ks");
    const jrImg = block.querySelector(".img-jr");

    if (ksImg && jrImg) {
      if (id === "ks") {
        ksImg.style.transition = "none";
        jrImg.style.transition = "none";
        ksImg.style.transform = "translateY(0)";
        jrImg.style.transform = "translateY(100%)";
      } else {
        ksImg.style.transition = "none";
        jrImg.style.transition = "none";
        ksImg.style.transform = "translateY(-100%)";
        jrImg.style.transform = "translateY(0)";
      }
    }
  });

  currentDialect = id;
  visibleDialect = id;
}

// 경상도 ↔ 전라도 자동 전환 (애니메이션)
function switchDialect(targetId, els) {
  const fromId = currentDialect;
  if (fromId === targetId) return;

  const to = DIALECTS[targetId];
  const { titleImg, firstLineImgs, secondBlocks } = els;

  isAnimating = true;
  currentDialect = targetId;   // 논리 상태는 바로 바꾸고

  // 1) 타이틀 이미지 교체 + 슉슉 애니메이션
  if (titleImg) {
    // 위로 사라졌다가 아래에서 올라오는 느낌
    titleImg.style.transition = "transform 0.25s ease, opacity 0.25s ease";
    titleImg.style.opacity = 0;
    titleImg.style.transform = "translateY(-10px)";

    setTimeout(() => {
      titleImg.src = to.titleSrc;
      // 아래에서 시작
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

  // 3) 둘째 줄 프레임 + 프레임 안 이미지 슬라이드
  secondBlocks.forEach((block, i) => {
    const ty = to.secondTransforms[i] ?? 0;
    block.style.transition = "transform 0.4s ease";
    block.style.transform = `translateY(${ty}px)`;

    const ksImg = block.querySelector(".img-ks");
    const jrImg = block.querySelector(".img-jr");
    if (!ksImg || !jrImg) return;

    if (targetId === "jr") {
      // ks → jr
      ksImg.style.transition = "transform 0.4s ease";
      jrImg.style.transition = "transform 0.4s ease";
      ksImg.style.transform = "translateY(-100%)";
      jrImg.style.transform = "translateY(0)";
    } else {
      // jr → ks
      ksImg.style.transition = "transform 0.4s ease";
      jrImg.style.transition = "transform 0.4s ease";
      ksImg.style.transform = "translateY(0)";
      jrImg.style.transform = "translateY(100%)";
    }
  });

  setTimeout(() => {
    isAnimating = false;
    visibleDialect = targetId;   // 애니 끝난 시점에 화면 상태 확정
  }, 450);
}

// 선택된 지역에 맞는 화살표 이미지 + 높이 세팅 후 보이기
function showArrowsFor(id, els) {
  const d = DIALECTS[id];
  const { canvas, keyLineImgs } = els;

  if (!d || !d.triangleSrcs) return;

  keyLineImgs.forEach((img, i) => {
    const src = d.triangleSrcs[i];
    const ty  = d.triangleTransforms ? d.triangleTransforms[i] : 0;

    if (src) img.src = src;
    img.style.opacity = 1; // 다시 보이게
    img.style.transform = `translateY(${ty}px)`;
  });

  if (canvas) {
    canvas.classList.add("show-arrows");
  }
}

// ================================
// 5. 방향키 입력 처리
// ================================

// 방향키 입력 처리 → 패턴 맞으면 다음 페이지
function handleArrowInput(key) {
  const d = DIALECTS[selectedDialect];
  if (!d || !d.trianglePattern) return;

  const dir = key === "ArrowUp" ? "up" : "down";
  const pattern = d.trianglePattern;

  // 현재 풀어야 할 인덱스
  const idx = currentIndex;

  // 🔊 오디오 재생
if (d.audio && d.audio[idx]) {
  const audio = new Audio(d.audio[idx]);
  audio.currentTime = 0;  // 처음부터 재생
  audio.play();
}


  if (idx >= pattern.length) return;

  const block = secondBlocksRef[idx];
  const arrow = keyLineImgsRef[idx];

  const baseTyBlock = d.secondTransforms ? (d.secondTransforms[idx] ?? 0) : 0;
  const baseTyArrow = d.triangleTransforms ? (d.triangleTransforms[idx] ?? 0) : 0;

  // ---- 오답 처리: 가로 흔들기, 다음 블럭으로 안 넘어감 ----
  if (pattern[idx] !== dir) {
    if (block) {
      shakeBlockHorizontal(block, baseTyBlock);
    }
    // 화살표는 안 사라지고 제자리에서 살짝 움찔만 (원래 함수 재사용)
    if (arrow) {
      flashArrow(arrow, baseTyArrow);
    }
    // currentIndex 그대로 유지 → 같은 블럭 다시 시도
    return;
  }

  // ---- 정답 처리 ----
  // 블럭 애니메이션
  if (block && d.secondTransforms) {
    if (dir === "up") {
      // 위 방향키 → 60px 위로 올라가서 그 위치 유지 + 반짝
      flashBlockUp(block, baseTyBlock);
      d.secondTransforms[idx] = baseTyBlock - 60;
    } else {
      // 아래 방향키 → 제자리에서 살짝 움찔 + 반짝
      flashBlockDown(block, baseTyBlock);
      // 내려가는 건 위치 유지 (원래 base 그대로)
    }
  }

  // 화살표 움찔 + 정답이면 사라지기
  if (arrow) {
    flashArrow(arrow, baseTyArrow);
    setTimeout(() => {
      arrow.style.opacity = 0;
    }, 100);
  }

  // 다음 블럭으로 인덱스 이동
  currentIndex++;

  // 모든 패턴을 다 맞추면 → 잠깐 쉬고 전체 음 재생, 또 쉬고 다음 페이지
  if (currentIndex === pattern.length) {
    arrowGameActive = false;  // 더 이상 입력 못 하게 잠금

    const BEFORE_REPLAY_DELAY = 400;  // 마지막 키 입력 후 딜레이(ms) - 취향껏 조절 가능
    const AFTER_REPLAY_DELAY  = 1000; // 전체 시퀀스가 끝난 뒤 1초 대기

    setTimeout(() => {
      playSuccessSequence(selectedDialect, () => {
        setTimeout(() => {
          window.location.href = "1p.html";
        }, AFTER_REPLAY_DELAY);
      });
    }, BEFORE_REPLAY_DELAY);
  }
}




// ================================
// 6. 블럭 / 화살표 애니메이션들
// ================================

// 블럭 위로 올라가서 그 자리 유지 + 반짝
function flashBlockUp(block, fromY) {
  block.style.transition = "transform 0.18s ease, filter 0.18s ease";
  block.style.filter = "brightness(1.4)";
  block.style.transform = `translateY(${fromY - 60}px)`;

  setTimeout(() => {
    block.style.filter = "brightness(1)";
    // 위치는 유지 (fromY - 60 상태 유지)
  }, 200);
}

// 블럭 제자리에서 움찔 + 반짝 (원위치 복귀)
function flashBlockDown(block, baseY) {
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
  const interval = 220; // 음 사이 간격(ms) — 따다다닥 느낌

  let i = 0;

  function step() {
    if (i >= length) {
      // 다 돌았으면 콜백 호출
      if (typeof onComplete === "function") onComplete();
      return;
    }

    // 1) 오디오 재생
    const src = d.audio[i];
    if (src) {
      const audio = new Audio(src);
      audio.currentTime = 0;
      audio.play();
    }

    // 2) 해당 블럭에 애니메이션 주기
    const block = secondBlocksRef[i];
    if (block && d.secondTransforms) {
      const baseY = d.secondTransforms[i] ?? 0;

      block.style.transition = "transform 0.18s ease, filter 0.18s ease";
      block.style.filter = "brightness(1.4)";
      block.style.transform = `translateY(${baseY - 15}px)`; // 살짝 위로 튕기기

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


// ▶ 오답일 때 가로로 흔들리는 애니메이션
function shakeBlockHorizontal(block, baseY) {
  if (!block) return;

  const shakeDistance = 10;   // 좌우 흔들리는 폭(px)
  const duration = 250;       // 전체 흔들리는 시간(ms)
  const steps = [-1, 1, -1, 1, -0.5, 0]; // 진동 패턴

  let i = 0;
  block.style.transition = "transform 0.04s ease";

  const timer = setInterval(() => {
    const dx = steps[i] * shakeDistance;
    block.style.transform = `translateY(${baseY}px) translateX(${dx}px)`;
    i++;

    if (i >= steps.length) {
      clearInterval(timer);
      // 원래 위치로 복귀
      block.style.transform = `translateY(${baseY}px)`;
    }
  }, duration / steps.length);
}

// 화살표 움찔 애니메이션
function flashArrow(arrow, baseY) {
  arrow.style.transition = "transform 0.10s ease";
  arrow.style.transform = `translateY(${baseY - 8}px) scale(1.1)`;

  setTimeout(() => {
    arrow.style.transform = `translateY(${baseY}px) scale(1)`;
  }, 100);
}
