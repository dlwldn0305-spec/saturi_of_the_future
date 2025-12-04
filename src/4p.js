/* global Matter */
// src/4p.js

const {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
  Mouse,
  MouseConstraint,
  Events,
  Body,
} = Matter;


/* -------------------------------------------------
 *  방향키 페이지 이동
 * ------------------------------------------------- */
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") window.location.href = "5p.html";
  if (e.key === "ArrowLeft") window.location.href = "3p.html";
});



/* -------------------------------------------------
 *  window load 이후 모든 연출 + Matter.js 실행
 * ------------------------------------------------- */
window.addEventListener("load", () => {
  /* --------- simbol 확대 연출 (없으면 자동 무시) --------- */
  const simbol = document.getElementById("simbol_4p");
  if (simbol) {
    setTimeout(() => {
      simbol.classList.add("expand");
    }, 2000);
  }

  /* --------- Matter.js 셋업 --------- */
  const container = document.querySelector(".block");
  const canvas = document.getElementById("matter-canvas");

  if (!container || !canvas) {
    console.warn("block 또는 matter-canvas 못 찾음");
    return;
  }

  const engine = Engine.create();
  const world = engine.world;

  const render = Render.create({
    canvas,
    engine,
    options: {
      background: "transparent",
      wireframes: false
    }
  });

  Render.run(render);
  const runner = Runner.create();
  Runner.run(runner, engine);

  /* --------- SVG 텍스처 경로들 (public 기준) --------- */
  const textureGroups = [
    // basic 줄
    [
      "./public/basic/1-1.svg",
      "./public/basic/1-2.svg",
      "./public/basic/1-3.svg",
      "./public/basic/1-4.svg",
      "./public/basic/1-5.svg",
      "./public/basic/1-6.svg",
      "./public/basic/1-7.svg"
    ],
    // ks 줄 (2-*)
    [
      "./public/ks/2-1.svg",
      "./public/ks/2-2.svg",
      "./public/ks/2-3.svg",
      "./public/ks/2-4.svg",
      "./public/ks/2-5.svg",
      "./public/ks/2-6.svg",
      "./public/ks/2-7.svg"
    ],
    // jr 줄 (3-*)
    [
      "./public/jr/3-1.svg",
      "./public/jr/3-2.svg",
      "./public/jr/3-3.svg",
      "./public/jr/3-4.svg",
      "./public/jr/3-5.svg",
      "./public/jr/3-6.svg",
      "./public/jr/3-7.svg"
    ],
    // kw 줄 (4-*)
    [
      "./public/kw/4-1.svg",
      "./public/kw/4-2.svg",
      "./public/kw/4-3.svg",
      "./public/kw/4-4.svg",
      "./public/kw/4-5.svg",
      "./public/kw/4-6.svg",
      "./public/kw/4-7.svg"
    ],
    // cc 줄 (5-*)
    [
      "./public/cc/5-1.svg",
      "./public/cc/5-2.svg",
      "./public/cc/5-3.svg",
      "./public/cc/5-4.svg",
      "./public/cc/5-5.svg",
      "./public/cc/5-6.svg",
      "./public/cc/5-7.svg"
    ],
    // jj 줄 (6-*)
    [
      "./public/jj/6-1.svg",
      "./public/jj/6-2.svg",
      "./public/jj/6-3.svg",
      "./public/jj/6-4.svg",
      "./public/jj/6-5.svg",
      "./public/jj/6-6.svg",
      "./public/jj/6-7.svg"
    ]
  ];

  /* --------- 블럭 / 월드 사이즈 --------- */
  const BLOCK_WIDTH = 90;
  const BLOCK_HEIGHT = 100;

  const totalCols = 7;
  const totalRows = textureGroups.length;

  const worldWidth = BLOCK_WIDTH * totalCols;
  const worldHeight = BLOCK_HEIGHT * totalRows;

  container.style.width = `${worldWidth}px`;
  container.style.height = `${worldHeight}px`;

  render.canvas.width = worldWidth;
  render.canvas.height = worldHeight;
  render.options.width = worldWidth;
  render.options.height = worldHeight;

  // 그리드 슬롯 좌표(오와열)
  const gridSlots = [];
  const bodies = [];

  const startX = BLOCK_WIDTH / 2;
  const startY = 0;

  /* --------- 블럭 생성 --------- */
  textureGroups.forEach((rowTextures, rowIndex) => {
    rowTextures.forEach((texture, colIndex) => {
      const x = startX + colIndex * BLOCK_WIDTH;
      const y = startY + rowIndex * BLOCK_HEIGHT;

      const slot = { x, y };
      gridSlots.push(slot);

      const body = Bodies.rectangle(x, y, BLOCK_WIDTH, BLOCK_HEIGHT, {
        restitution: 0.4,
        friction: 0.8,
        render: {
          sprite: {
            texture,
            xScale: 1,
            yScale: 1
          }
        }
      });

      Composite.add(world, body);
      bodies.push(body);
    });
  });

  /* --------- 바닥/벽 (보이지 않게) --------- */
  const ground = Bodies.rectangle(
    worldWidth / 2,
    worldHeight + 20,
    worldWidth,
    40,
    { isStatic: true, render: { visible: false } }
  );
  const wallLeft = Bodies.rectangle(
    -20,
    worldHeight / 2,
    40,
    worldHeight,
    { isStatic: true, render: { visible: false } }
  );
  const wallRight = Bodies.rectangle(
    worldWidth + 20,
    worldHeight / 2,
    40,
    worldHeight,
    { isStatic: true, render: { visible: false } }
  );

  Composite.add(world, [ground, wallLeft, wallRight]);

  /* --------- 마우스 드래그 가능 --------- */
  const mouse = Mouse.create(render.canvas);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 0.2,
      render: { visible: false }
    }
  });
  Composite.add(world, mouseConstraint);
  render.mouse = mouse;

  /* =================================================
   *   재조합(재정렬) 로직
   *   - 드래그로 흩트린 후 1초 지나면
   *     "가장 가까운 격자"로 스무스하게 정렬
   * ================================================= */

  let rearrangeTimer = null;
  let rearrangeAnim = null; // { startTime, duration, jobs[] }

  // 재정렬 애니메이션 시작
  function startRearrange() {
    // 그리드 슬롯 복사 (사용한 슬롯은 제거하며 할당)
    const availableSlots = gridSlots.map((s) => ({ ...s }));

    const jobs = bodies.map((body) => {
      // 가장 가까운 슬롯 찾기
      let bestIndex = 0;
      let bestDist = Infinity;

      availableSlots.forEach((slot, i) => {
        const dx = body.position.x - slot.x;
        const dy = body.position.y - slot.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < bestDist) {
          bestDist = d2;
          bestIndex = i;
        }
      });

      const target = availableSlots.splice(bestIndex, 1)[0];

      return {
        body,
        startPos: { x: body.position.x, y: body.position.y },
        startAngle: body.angle,
        targetPos: { x: target.x, y: target.y },
        targetAngle: 0
      };
    });

    rearrangeAnim = {
      startTime: null,
      duration: 1000, // 1초 동안
      jobs
    };
  }

  // 드래그 끝나고 1초 후 재정렬 예약
  function scheduleRearrange() {
    if (rearrangeTimer) clearTimeout(rearrangeTimer);
    rearrangeTimer = setTimeout(() => {
      startRearrange();
      rearrangeTimer = null;
    }, 500);
  }

  // MouseConstraint 이벤트
  Events.on(mouseConstraint, "enddrag", () => {
    scheduleRearrange();
  });

  // 매 프레임마다 재정렬 애니메이션 진행
  Events.on(engine, "beforeUpdate", () => {
    if (!rearrangeAnim) return;

    const now = performance.now();
    if (rearrangeAnim.startTime == null) {
      rearrangeAnim.startTime = now;
    }

    const tRaw =
      (now - rearrangeAnim.startTime) / rearrangeAnim.duration;
    const t = Math.min(Math.max(tRaw, 0), 1); // 0~1 클램프

    rearrangeAnim.jobs.forEach((job) => {
      const { body, startPos, targetPos, startAngle, targetAngle } =
        job;

      const x =
        startPos.x + (targetPos.x - startPos.x) * t;
      const y =
        startPos.y + (targetPos.y - startPos.y) * t;
      const angle =
        startAngle + (targetAngle - startAngle) * t;

      Body.setPosition(body, { x, y });
      Body.setAngle(body, angle);
      Body.setVelocity(body, { x: 0, y: 0 });
      Body.setAngularVelocity(body, 0);
    });

    if (t >= 1) {
      // 애니메이션 종료
      rearrangeAnim = null;
    }
  });
});
