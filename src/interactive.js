// src/interactive.js

// -------------------------------------
// 1. 카드 높낮이 정보 (px 단위)
// -------------------------------------
const Y_OFFSETS = {
  ks: {
    1: -30,
    3: -30,
    4: -30,

    7: -30,
    8: 30,
    9: 30,
    10: 30,

    12: 30,
    13: 60
  },
  jr: {
    1: -30,
    2: -60,
    5: -30,

    6: -30,
    7: 30,
    8: 30,
    10: 30,

    11: 30
  }
  // basic은 전부 0이라고 보면 됨
};

// 슬롯별 텍스트
const TEXT_MAP = {
  basic: {
    1: "나",
    2: "너",
    3: "때문에",
    4: "고생깨나",
    5: "했지만",
    6: "사실",
    7: "너",
    8: "아니었으면",
    9: "내 인생",
    10: "공허했다",
    11: "이렇게",
    12: "좀",
    13: "전해주세요"
  },
  ks: {
    1: "내",
    2: "니",
    3: "땜에",
    4: "고생깨나",
    5: "했지만",
    6: "사실",
    7: "니",
    8: "아니었으믄",
    9: "내 인생",
    10: "공허했을끼다",
    11: "이래",
    12: "쫌",
    13: "전해주이소"
  },
  jr: {
    1: "나",
    2: "너",
    3: "땜시",
    4: "고생깨나",
    5: "했제",
    6: "사실은",
    7: "니",
    8: "아니었음",
    9: "내 인생",
    10: "공허했어야",
    11: "일케",
    12: "좀",
    13: "전해주쇼잉"
  }
};

const REGION_FOLDERS = ["basic", "ks", "jr"];
const TOTAL_SLOTS = 13;

// 현재 화면에 깔린 카드들 (slot 1~13)
const cards = [];

// -------------------------------------
// 2. 유틸 함수들
// -------------------------------------
function getRandomRegion() {
  const idx = Math.floor(Math.random() * REGION_FOLDERS.length);
  return REGION_FOLDERS[idx];
}

function getLineIndex(slot) {
  if (slot <= 5) return 1;
  if (slot <= 10) return 2;
  return 3;
}

// 카드 하나의 Y 오프셋 계산
function computeOffsetY(region, slot) {
  const regionOffsets = Y_OFFSETS[region] || {};
  let offsetY = regionOffsets[slot] || 0;

  const lineIndex = getLineIndex(slot);

  // 줄별로 너무 튀지 않게 약간만 가드
  if (lineIndex === 1) {
    if (offsetY > 0) offsetY = 0;
    const MIN = -80;
    if (offsetY < MIN) offsetY = MIN;
  } else if (lineIndex === 2) {
    if (offsetY < 0) offsetY = 0;
    const MAX = 80;
    if (offsetY > MAX) offsetY = MAX;
  } else {
    if (offsetY < 0) offsetY = 0;
    const MAX = 100;
    if (offsetY > MAX) offsetY = MAX;
  }

  return offsetY;
}



// 음성 재생
// 현재 화면 문장을 텍스트로 만들기
function getCurrentSentenceText() {
  const ordered = [...cards].sort(
    (a, b) => Number(a.dataset.slot) - Number(b.dataset.slot)
  );

  const parts = ordered.map((img) => {
    const region = img.dataset.region;
    const slot = Number(img.dataset.slot);
    return TEXT_MAP[region]?.[slot] || "";
  });

  return parts.join(" ").trim();
}

// 🔥 여기만 구글 TTS 서버 호출 방식으로 변경
async function speakCurrentSentence() {
  const text = getCurrentSentenceText();
  if (!text) return;

  try {
    const res = await fetch("http://localhost:3001/api/tts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) {
      console.error("TTS 서버 에러", await res.text());
      return;
    }

    const data = await res.json();
    const audioUrl = data.url;
    if (!audioUrl) {
      console.error("TTS 응답에 url 없음");
      return;
    }

    const audio = new Audio(audioUrl);
    audio.play();
  } catch (err) {
    console.error("TTS 요청 중 오류", err);
  }
}


// -------------------------------------
// 3. “슬롯 안에서 아래→위 슉” 애니메이션
// -------------------------------------
function animateCardToRegion(img, newRegion) {
  const slot = Number(img.dataset.slot);
  const targetOffsetY = computeOffsetY(newRegion, slot);

  // 새 이미지 먼저 끼우고, "슬롯 아래"에서 시작
  img.src = `./interactive/decision_to_leave/${newRegion}/${slot}.svg`;
  img.dataset.region = newRegion;

  img.style.transition = "none";
  img.style.opacity = "0";
  img.style.transform = `translateY(${targetOffsetY + 18}px)`; // +18px 아래

  requestAnimationFrame(() => {
    img.style.transition = "transform 0.28s ease, opacity 0.28s ease";
    img.style.transform = `translateY(${targetOffsetY}px)`; // 슬롯 안 제자리
    img.style.opacity = "1";
  });
}

// -------------------------------------
// 4. 초기 카드 13장 만들기
// -------------------------------------
function initCards() {
  const firstLine = document.querySelector(".first_line");
  const secondLine = document.querySelector(".second_line");
  const thirdLine = document.querySelector(".third_line");

  if (!firstLine || !secondLine || !thirdLine) {
    console.warn("라인 요소를 찾을 수 없음");
    return;
  }

  firstLine.innerHTML = "";
  secondLine.innerHTML = "";
  thirdLine.innerHTML = "";

  for (let slot = 1; slot <= TOTAL_SLOTS; slot++) {
    const region = getRandomRegion();
    const img = document.createElement("img");

    img.src = `./interactive/decision_to_leave/${region}/${slot}.svg`;
    img.alt = `${region} ${slot}`;
    img.classList.add("word");

    img.dataset.slot = String(slot);
    img.dataset.region = region;

    const offsetY = computeOffsetY(region, slot);

    img.style.opacity = "0";
    img.style.transform = `translateY(${offsetY + 18}px)`;
    img.style.transition = "transform 0.3s ease, opacity 0.3s ease";

    const lineIndex = getLineIndex(slot);
    if (lineIndex === 1) {
      firstLine.appendChild(img);
    } else if (lineIndex === 2) {
      secondLine.appendChild(img);
    } else {
      thirdLine.appendChild(img);
    }

    cards.push(img);

    requestAnimationFrame(() => {
      img.style.transform = `translateY(${offsetY}px)`;
      img.style.opacity = "1";
    });
  }
}

// -------------------------------------
// 5. 문장 바꾸는 함수들
// -------------------------------------
function createRandomSentence() {
  cards.forEach((img) => {
    const newRegion = getRandomRegion();
    animateCardToRegion(img, newRegion);
  });
}

function renderRegionSequence(region) {
  cards.forEach((img) => {
    animateCardToRegion(img, region);
  });
}

// -------------------------------------
// 6. 초기화
// -------------------------------------
// -------------------------------------
// 6. 초기화
// -------------------------------------
function setup() {
  initCards();

  const tryMoreBtn = document.querySelector(".trymore");
  if (tryMoreBtn) {
    tryMoreBtn.addEventListener("click", () => {
      createRandomSentence();
    });
  }

  // 🔊 LISTEN 버튼들 클릭 시 음성 재생
  const listenTargets = [
    document.querySelector(".listen"),
    document.getElementById("listenBtn"),
  ].filter(Boolean); // null 제거

  listenTargets.forEach((el) => {
    el.style.cursor = "pointer"; // 마우스 올리면 손가락 모양
    el.addEventListener("click", () => {
      speakCurrentSentence();
    });
  });

  // 키보드 디버그
  document.addEventListener("keydown", (e) => {
    if (e.key === "1") renderRegionSequence("basic");
    if (e.key === "2") renderRegionSequence("ks");
    if (e.key === "3") renderRegionSequence("jr");
    if (e.key === "0") createRandomSentence();
    if (e.key === " ") speakCurrentSentence();
  });
}

// ✅ 이 줄이 꼭 필요!
document.addEventListener("DOMContentLoaded", setup);
