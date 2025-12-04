/* --------- 방향키 이벤트 --------- */
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") window.location.href = "2p.html";
  if (e.key === "ArrowLeft") window.location.href = "main.html";
});

// 여기부터 Matter.js
console.log("1p-matter.js top reached");

const {
  Engine,
  Runner,
  Bodies,
  Body,
  Composite,
  Mouse,
  MouseConstraint,
  Events,
  Sleeping
} = Matter;

window.addEventListener("load", () => {
  console.log("window load in 1p-matter.js");

  // 0. 기본 DOM 요소 찾기
  const canvasEl = document.querySelector(".canvas");
  const newsImgs = Array.from(
    document.querySelectorAll("#news_container img")
  );

  console.log("canvasEl:", !!canvasEl, "newsImgs:", newsImgs.length);

  if (!canvasEl) {
    console.warn("canvas (.canvas) 못 찾음");
    return;
  }
  if (newsImgs.length === 0) {
    console.warn("#news_container img 없음");
    return;
  }

  const canvasRect = canvasEl.getBoundingClientRect();
  const width = canvasEl.clientWidth || window.innerWidth;
  const height = canvasEl.clientHeight || window.innerHeight;

  // 1. Matter 엔진 세팅 (렌더러는 아예 안 씀!)
  const engine = Engine.create();
  const world = engine.world;
  world.gravity.y = 3;

  const runner = Runner.create();
  Runner.run(runner, engine);

  // 2. 뉴스 이미지 → 복제 + 물리 바디 매핑
  const sprites = [];

  console.log("원본 이미지 개수:", newsImgs.length);

  const baseDelay = 1500; // 전체 시작 딜레이
  const stepDelay = 180;  // 박스 사이 간격

  newsImgs.forEach((img, index) => {
    const rect = img.getBoundingClientRect();

    const w = rect.width;
    const h = rect.height;

    // .canvas 기준 좌표 (최종적으로 가야 할 위치)
    const targetX = rect.left - canvasRect.left + w / 2;
    const targetY = rect.top - canvasRect.top + h / 2;

    console.log(
      `img #${index} => targetX:${targetX}, targetY:${targetY}, w:${w}, h:${h}`
    );

    // 2-1. 복제 img 만들기 (.canvas 안으로 이동, 처음엔 화면 아래에 숨김)
    const clone = img.cloneNode(true);
    clone.style.position = "absolute";
    clone.style.left = `${targetX - w / 2}px`;
    clone.style.top = `${height + 500}px`;
    clone.style.margin = "0";
    clone.style.zIndex = "3";
    clone.style.pointerEvents = "none";
    clone.style.transformOrigin = "center center";

    // 처음엔 안 보이게
    clone.style.opacity = "0";
    clone.style.visibility = "hidden";
    clone.style.transition = "opacity 0.4s ease";

    canvasEl.appendChild(clone);

    // 원래 #news_container 안의 이미지는 숨김
    img.style.visibility = "hidden";

    // 2-2. 물리 바디 생성 (처음엔 화면 아래에서 대기)
    const body = Bodies.rectangle(
      targetX,
      height + 200,
      w,
      h,
      {
        restitution: 0.7,
        friction: 0.4,
        frictionAir: 0.02,
        render: {
          visible: false // 어차피 우리가 직접 그려서, Matter 바디는 안 보이게
        }
      }
    );

    Sleeping.set(body, true);

    const randomAngle = (Math.random() - 0.5) * -0.2;
    const randomVX = (Math.random() - 0.5) * 0.7;

    const delay = baseDelay + index * stepDelay;

    setTimeout(() => {
      Body.setPosition(body, { x: targetX, y: -50 });
      Body.setAngle(body, randomAngle);
      Body.setVelocity(body, { x: randomVX, y: 0 });

      Sleeping.set(body, false);

      const { x, y } = body.position;
      clone.style.left = `${x - w / 2}px`;
      clone.style.top = `${y - h / 2}px`;
      clone.style.visibility = "visible";
      clone.style.opacity = "1";
    }, delay);

    Composite.add(world, body);
    sprites.push({ element: clone, body, width: w, height: h });
  });

  console.log("생성된 바디 개수:", sprites.length);

  // 3. 화면 가장자리에 "멀리 떨어진" 보이지 않는 벽 만들기
  const wallSize = 6000;

  Composite.add(world, [
    Bodies.rectangle(
      width / 2,
      height + wallSize,
      width * 3,
      wallSize * 2,
      { isStatic: true, render: { visible: false } }
    ),
    Bodies.rectangle(
      width / 2,
      -wallSize,
      width * 3,
      wallSize * 2,
      { isStatic: true, render: { visible: false } }
    ),
    Bodies.rectangle(
      -wallSize,
      height / 2,
      wallSize * 2,
      height * 3,
      { isStatic: true, render: { visible: false } }
    ),
    Bodies.rectangle(
      width + wallSize,
      height / 2,
      wallSize * 2,
      height * 3,
      { isStatic: true, render: { visible: false } }
    )
  ]);

  // 4. 마우스 드래그 (DOM 요소에 직접 이벤트만 듣기)
  const mouse = Mouse.create(canvasEl);

  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 0.2,
      render: { visible: false }
    }
  });

  Composite.add(world, mouseConstraint);

  // 5. 매 프레임마다 바디 위치 → 복제 img 위치/각도 동기화
  Events.on(engine, "afterUpdate", () => {
    sprites.forEach(({ element, body, width, height }) => {
      const { x, y } = body.position;
      const angle = body.angle;

      element.style.left = `${x - width / 2}px`;
      element.style.top = `${y - height / 2}px`;
      element.style.transform = `rotate(${angle}rad)`;
    });
  });
});
