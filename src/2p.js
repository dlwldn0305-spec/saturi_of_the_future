  /* --------- 방향키 이벤트 --------- */


document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') window.location.href = "3p.html";
  if (e.key === 'ArrowLeft') window.location.href = "1p.html";
});

// src/2p-matter.js
import Matter from "matter-js";

const {
  Engine,
  Events,
  Render,
  Runner,
  Composites,
  Common,
  MouseConstraint,
  Mouse,
  Composite,
  Bodies
} = Matter;

window.addEventListener("load", () => {
  const container = document.getElementById("matter2p");
  if (!container) {
    console.warn("#matter2p 못 찾음");
    return;
  }

  // 컨테이너 크기 기준으로 생성
  const width = container.clientWidth || window.innerWidth;
  const height = 1080; 

  // 1) 엔진
  const engine = Engine.create({
    positionIterations: 25,
    velocityIterations: 35
  });
  const world = engine.world;

  // 2) 렌더러
  const render = Render.create({
    element: container,
    engine,
    options: {
      width,
      height,
      background: "transparent",
      wireframes: false,
      showStats: false,
      showPerformance: false
    }
  });

  Render.run(render);

  // 3) 러너
  const runner = Runner.create();
  Runner.run(runner, engine);

  // 4) 랜덤 블록 스택 함수 - 정사각형만 생성
const makeStack = (scale, columns, rows) =>
  Composites.stack(40, 40, columns, rows, 0, 0, (x, y) => {
    const color = Common.choose(["#00B7AB", "#FF0561", "#ffffff"]); // 민트/핑크/화이트

    // 한 변 길이 (조금씩 랜덤)
    const size = Common.random(30, 60) * scale;  // 예: 30~60px 정사각형

    return Bodies.rectangle(x, y, size, size, {
      render: { fillStyle: color }
    });
  });


  // 원본 stress4는 엄청 많아서 무거우니까 양을 줄여서 두 덩어리만
  const stack1 = makeStack(0.7, 9, 6);
  const stack2 = makeStack(0.5, 17, 6);

  Composite.add(world, [
    stack1,
    stack2,
    // 화면 경계 (보이지 않게)
    Bodies.rectangle(width / 2, -25, width, 50, {
      isStatic: true,
      render: { visible: false }
    }),
    Bodies.rectangle(width / 2, height + 25, width, 50, {
      isStatic: true,
      render: { visible: false }
    }),
    Bodies.rectangle(width + 25, height / 2, 50, height, {
      isStatic: true,
      render: { visible: false }
    }),
    Bodies.rectangle(-25, height / 2, 50, height, {
      isStatic: true,
      render: { visible: false }
    })
  ]);

    // 4-1) 컬러를 하나씩 #FFB7AB 로 바꾸는 애니메이션 (총 5초)
  const TARGET_COLOR = "#FFB7AB";
  const totalDuration = 15000; // ms

  // stack1, stack2 안에 들어있는 모든 도형들을 모아서 섞기
  const allBodies = [...stack1.bodies, ...stack2.bodies];
  const shuffled = Common.shuffle(allBodies.slice()); // 랜덤 순서

  const delayPerBody = totalDuration / shuffled.length;

  shuffled.forEach((body, index) => {
    setTimeout(() => {
      body.render.fillStyle = TARGET_COLOR;
    }, index * delayPerBody);
  });


// 5) gravity 애니메이션
engine.timing.timeScale = 0.7;       // 살짝 느긋하게
engine.gravity.scale = 0.006;        // 세기

Events.on(engine, "beforeUpdate", () => {
  // x축으로만 왔다 갔다 (좌우 휩쓸림 느낌)
  engine.gravity.x = Math.sin(engine.timing.timestamp * 0.001) * 0.8;
  // y축은 항상 아래 방향으로만 (위로 안 붙게)
  engine.gravity.y = 1;
});


  // 6) 마우스 드래그
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

  // 7) 뷰포트 맞추기
  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: width, y: height }
  });
});
