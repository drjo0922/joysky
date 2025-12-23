document.getElementById("btn").addEventListener("click", async () => {
  const output = document.getElementById("output");
  output.innerHTML = "점치는 중...";

  // 숫자 점수를 등급 문자열로 변환
  const scoreToLabel = (s) => {
    const n = Number(s);
    switch (n) {
      case 1: return "대흉";
      case 2: return "흉함";
      case 3: return "보통";
      case 4: return "길함";
      case 5: return "대길";
      default: return "정보 없음";
    }
  };

  try {
    const res = await fetch("/.netlify/functions/getHexagram");

    // 응답 상태 확인
    if (!res.ok) {
      const errData = await res.json();
      output.innerHTML = "에러 발생: " + (errData?.error || "알 수 없는 오류");
      return;
    }

    const data = await res.json();
    const { mainHex, changingLine, derivedHex } = data;

    // 본괘 출력
    let html = `<h3>본괘</h3>
                <div class="hexagram">${mainHex.unicode ?? ""}</div>
                <div>${mainHex.title} (${mainHex.alias})</div>
                <div>${scoreToLabel(mainHex.score)}</div>
                <div>${mainHex.description}</div>`;

    // 동효 출력
    html += `<h3>동효</h3>
             <div class="line">${changingLine.position} - ${scoreToLabel(changingLine.score)}</div>
             <div>${changingLine.description}</div>`;

    // 지괘 출력
    html += `<h3>지괘</h3>
             <div class="hexagram">${derivedHex.unicode ?? ""}</div>
             <div>${derivedHex.title}${derivedHex.alias ? ` (${derivedHex.alias})` : ""}</div>
             <div>${scoreToLabel(derivedHex.score)}</div>
             <div>${derivedHex.description}</div>`;

    output.innerHTML = html;
  } catch (err) {
    // 네트워크 오류나 JSON 파싱 오류 처리
    output.innerHTML = "에러 발생: " + err.message;
  }
});
