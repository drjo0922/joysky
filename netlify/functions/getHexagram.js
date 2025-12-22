const fs = require("fs");
const path = require("path");

exports.handler = async function (event, context) {
  try {
    // hexagrams.json이 같은 폴더에 있다고 가정
    const filePath = path.join(__dirname, "hexagrams.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(raw);

    const hexagrams = json.hexagrams;

    // 본괘 무작위 선택
    const mainHex = hexagrams[Math.floor(Math.random() * hexagrams.length)];

    // 동효 무작위 선택
    const changingLine =
      mainHex.lines[Math.floor(Math.random() * mainHex.lines.length)];

    // 지괘 무작위 선택 (실제 주역 계산 로직은 더 복잡)
    const derivedHex = hexagrams[Math.floor(Math.random() * hexagrams.length)];

    return {
      statusCode: 200,
      body: JSON.stringify({ mainHex, changingLine, derivedHex }),
    };
  } catch (err) {
    // 에러를 JSON으로 감싸서 반환
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};