document.getElementById("btn").addEventListener("click", async () => {
  const output = document.getElementById("output");
  output.innerHTML = "점치는 중...";

  try {
    // Netlify Function 호출 (hexagrams.json은 클라이언트에서 직접 접근 불가)
    const res = await fetch("/.netlify/functions/getHexagram");
    const data = await res.json();

    const { mainHex, changingLine, derivedHex } = data;

    // 본괘 출력
    let html = `<div class="hexagram">${mainHex.unicode}</div>
                <div>${mainHex.title} (${mainHex.alias})</div>
                <div>길흉 점수: ${mainHex.score}</div>
                <div>${mainHex.description}</div>`;

    // 동효 출력
    html += `<h3>동효</h3>
             <div class="line">${changingLine.position} - 길흉 점수: ${changingLine.score}</div>
             <div>${changingLine.description}</div>`;

    // 지괘 출력
    html += `<h3>지괘</h3>
             <div class="hexagram">${derivedHex.unicode}</div>
             <div>${derivedHex.title} (${derivedHex.alias})</div>
             <div>길흉 점수: ${derivedHex.score}</div>
             <div>${derivedHex.description}</div>`;

    output.innerHTML = html;
  } catch (err) {
    output.innerHTML = "에러 발생: " + err.message;
  }
});