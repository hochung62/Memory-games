const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const input = document.getElementById("answerInput");
const submitBtn = document.getElementById("submitBtn");
const resultDiv = document.getElementById("result");

let currentNumbers = [];   // 정답으로 쓸 숫자 배열
let level = 1;             // 현재 숫자 개수 (1개부터 시작)
let showing = false;       // 숫자가 보이는 중인지 여부
let score = 0;             // 점수

// 랜덤 숫자 생성 함수 (한 자리 숫자씩)
function generateNumbers(count) {
  const nums = [];
  for (let i = 0; i < count; i++) {
    nums.push(Math.floor(Math.random() * 10)); // 0~9 한 자리 숫자
  }
  return nums;
}

// 숫자 표시
function showNumbers(numbers) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "50px Arial";
  ctx.fillStyle = "blue";
  ctx.textAlign = "center";
  ctx.fillText(numbers.join(""), canvas.width / 2, canvas.height / 2);
}

// 숫자 지우기
function hideNumbers() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 게임 시작/다음 단계
function nextRound() {
  input.value = "";
  input.disabled = true;      // 입력창 잠금
  submitBtn.disabled = true;  // 버튼 잠금

  currentNumbers = generateNumbers(level);
  showNumbers(currentNumbers);
  showing = true;

  // 3초 뒤에 숫자 지우고 입력 가능하게 만들기
  setTimeout(() => {
    hideNumbers();
    showing = false;
    input.disabled = false;      // 입력창 활성화
    submitBtn.disabled = false;  // 버튼 활성화
    input.focus();               // 자동 포커스
  }, 3000);
}

// 정답 확인
function checkAnswer() {
  if (showing) return; // 숫자가 보이는 동안은 입력 불가

  const userAnswer = input.value.trim().replace(/\s+/g, ""); 
  const correctAnswer = currentNumbers.join("").trim();

  if (userAnswer === correctAnswer) {
    score += 10;
    resultDiv.textContent = `정답! 🎉 점수: ${score}`;
    level++;
    nextRound();
  } else {
    resultDiv.textContent = `틀렸습니다 ❌ 최종 점수: ${score}`;
    level = 1;
    score = 0;
    setTimeout(() => {
      resultDiv.textContent = `점수: ${score}`;
      nextRound();
    }, 2000);
  }
}

// 버튼 클릭 시 정답 확인
submitBtn.addEventListener("click", checkAnswer);

// Enter 키 입력 시 정답 확인
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkAnswer();
  }
});

// 첫 라운드 시작
nextRound();
