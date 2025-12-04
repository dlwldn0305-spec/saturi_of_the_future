// server.cjs  (프로젝트 루트에 위치)

// -------------------------------
// 1. 모듈 불러오기
// -------------------------------
const express = require("express");
const cors = require("cors");
const { TextToSpeechClient } = require("@google-cloud/text-to-speech");
const fs = require("fs");
const util = require("util");
const path = require("path");

// -------------------------------
// 2. 기본 셋업
// -------------------------------
const app = express();
const port = 3001; // interactive.js 에서도 이 포트를 사용 중

app.use(cors());
app.use(express.json());

// -------------------------------
// 3. Google TTS 클라이언트 (key.json 경로 중요!)
// -------------------------------
const ttsClient = new TextToSpeechClient({
  keyFilename: "./key.json", // server.cjs와 같은 폴더에 key.json 있어야 함
});

// -------------------------------
// 4. 오디오 저장 폴더 설정 및 정적 서빙
// -------------------------------
const AUDIO_DIR = path.join(__dirname, "temp_audio");

if (!fs.existsSync(AUDIO_DIR)) {
  fs.mkdirSync(AUDIO_DIR);
}

// 브라우저에서 mp3 파일을 직접 접근할 수 있도록 정적 경로 열어주기
app.use("/temp_audio", express.static(AUDIO_DIR));

// -------------------------------
// 5. TTS API 엔드포인트
// -------------------------------
app.post("/api/tts", async (req, res) => {
  const text = req.body.text;

  if (!text || typeof text !== "string") {
    return res.status(400).send("텍스트를 보내 주세요.");
  }

  console.log("🔥 TTS 요청 텍스트:", text.slice(0, 50), "...");

  // ✅ 여기 voice / audioConfig 부분이 네가 말한 “어디에 끼워?” 그 자리야
  const request = {
  input: { text },
  voice: {
    languageCode: "ko-KR",
    name: "ko-KR-Standard-E", // 일단 이걸로 테스트 (여자 음성)
  },
  audioConfig: {
    audioEncoding: "MP3",
    speakingRate: 1.1,
    pitch: -2.0,
  },
};


  try {
    const [response] = await ttsClient.synthesizeSpeech(request);

    const fileName = `tts-${Date.now()}.mp3`;
    const filePath = path.join(AUDIO_DIR, fileName);

    const writeFile = util.promisify(fs.writeFile);
    await writeFile(filePath, response.audioContent, "binary");

    console.log("✅ 생성된 파일:", filePath);

    // 브라우저에 이 mp3를 가리키는 URL 전달
    const publicUrl = `http://localhost:${port}/temp_audio/${fileName}`;
    res.json({ url: publicUrl });
  } catch (error) {
    console.error("❌ TTS 에러:", error);
    res.status(500).send("TTS 생성 중 오류가 발생했습니다.");
  }
});

// -------------------------------
// 6. 서버 시작
// -------------------------------
app.listen(port, () => {
  console.log(`🔥 TTS 서버가 http://localhost:${port} 에서 실행 중`);
});
