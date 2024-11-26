const fs = require('fs');
const axios = require('axios');
const process = require('process');

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}:\n  ${err}`);
      process.exit(1);
    }
    console.log(data);
  });
}

async function webCat(url) {
  try {
    const res = await axios.get(url);
    console.log(res.data);
  } catch (err) {
    console.error(`Error fetching ${url}:\n  ${err}`);
    process.exit(1);
  }
}

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Please provide a file path or URL.');
  process.exit(1);
}

const input = args[0];

if (input.startsWith('http')) {
  webCat(input);
} else {
  cat(input);
}
