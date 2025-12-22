const fs = require("fs");
const path = require("path");

exports.handler = async function(event, context) {
  try {
    // hexagrams.json이 같은 폴더에 있으므로 __dirname 기준으로 바로 접근
    const filePath = path.join(__dirname, "hexagrams.json");
    const raw = fs.readFileSync(filePath);
    const json = JSON.parse(raw);

    const hexagrams = json.hexagrams;
    const mainHex = hexagrams[Math.floor(Math.random() * hexagrams.length)];
    const changingLine = mainHex.lines[Math.floor(Math.random() * mainHex.lines.length)];
    const derivedHex = hexagrams[Math.floor(Math.random() * hexagrams.length)];

    return {
      statusCode: 200,
      body: JSON.stringify({ mainHex, changingLine, derivedHex })
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};