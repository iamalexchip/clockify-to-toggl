const fs = require('fs');
const path = require('path');
const { convertTimesheet } = require('./methods');
const resPath = './res/';
const files = fs.readdirSync(resPath);

for (const file of files) {
  try {
    const input = fs.readFileSync(resPath + file).toString();
    const data = convertTimesheet(input);
    console.info(`Converting: ${file}`);

    if (data) {
      fs.writeFileSync('./output/c2t - ' + file, data);
      console.log(`Converted successfully: c2t - ${file}`);
    }
  } catch(e) {
    console.log(e)
  }
}

