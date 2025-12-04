  /* --------- 방향키 이벤트 --------- */

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') window.location.href = "4p.html";
  if (e.key === 'ArrowLeft') window.location.href = "2p.html";
});

// 타이핑 내용
const text = `
이처럼 지방에 머물던 사투리가<br>
서울이라는 제3의 공간에서 새로운<br>
변화를 겪는 가운데, 사투리의 미래는<br>
어떤 방향으로 흘러갈까?
`;

function startTyped() {
  if (!window.Typed) return;

  // 실제 타이핑 실행 부
  new Typed("#typed-3p", {
    strings: [text],
    typeSpeed: 70,
    backSpeed: 0,
    showCursor: false,
    smartBackspace: false,
    contentType: "html"
  });
}

// 타이핑 딜레이(원하면 조절 가능)
const TYPE_DELAY = 1300; // ms, 지금은 2초 딜레이

// 폰트 로딩 이후에 딜레이 주고 실행
window.addEventListener("load", () => {
  const target = document.getElementById("typed-3p");
  if (!target) return;

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      setTimeout(startTyped, TYPE_DELAY);
    });
  } else {
    setTimeout(startTyped, TYPE_DELAY);
  }
});
