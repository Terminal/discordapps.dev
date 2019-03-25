const flatten = require('flat');
const fs = require('fs');
const path = require('path');

const note = `Note that some keys may be used by iterating over an array.
In such instance, the keys are not directly used.

`

// An excellent adaption
// https://gist.github.com/kethinov/6658166
const walkSync = (dir, filelist = []) => {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    if (fs.statSync(dir + file).isDirectory()) {
      filelist = walkSync(dir + file + '/', filelist);
    } else {
      filelist.push((dir + file).replace(/\\/g, '/'));
    }
  });
  return filelist;
};

let keys = {};
const locales = ['da', 'de', 'en-GB', 'en-US', 'fr', 'pl', 'zh-cn']
  .map((locale) => {
    const data = require(`../src/locales/${locale}.json`);
    Object.keys(flatten(data)).forEach(key => keys[key] = false);
    return {
      locale,
      data
    }
  });

walkSync(`${path.join(__dirname, '..', 'src')}/`)
  .forEach((file) => {
    const contents = fs.readFileSync(file, { encoding: 'utf8' });
    Object.keys(keys).forEach((key) => {
      if (contents.includes(key)) {
        keys[key] = true;
      }
    });
  });

const unused = [];

Object.keys(keys)
  .sort((a, b) => a.localeCompare(b))
  .map(key => `- \`${key}\`\n`)
  .forEach((key) => {
    if (!keys[key]) unused.push(key);
  })

fs.writeFileSync('unused.md', note + unused.join(''));
