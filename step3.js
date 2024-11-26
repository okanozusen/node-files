const fs = require('fs');
const axios = require('axios');
const process = require('process');

function handleOutput(data, outPath) {
  if (outPath) {
    fs.writeFile(outPath, data, 'utf8', (err) => {
      if (err) {
        console.error(`Couldn't write ${outPath}:\n  ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(data);
  }
}

function cat(path, outPath) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}:\n  ${err}`);
      process.exit(1);
    }
    handleOutput(data, outPath);
  });
}

async function webCat(url, outPath) {
  try {
    const res = await axios.get(url);
    handleOutput(res.data, outPath);
  } catch (err) {
    console.error(`Error fetching ${url}:\n  ${err}`);
    process.exit(1);
  }
}

const args = process.argv.slice(2);
let outPath;
let input;

if (args[0] === '--out') {
  if (args.length < 3) {
    console.error('Usage: node step3.js --out output-filename input');
    process.exit(1);
  }
  outPath = args[1];
  input = args[2];
} else {
  input = args[0];
}

if (input.startsWith('http')) {
  webCat(input, outPath);
} else {
  cat(input, outPath);
}
