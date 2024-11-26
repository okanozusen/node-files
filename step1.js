const fs = require('fs');
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

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Please provide a file path.');
  process.exit(1);
}

const filePath = args[0];
cat(filePath);
