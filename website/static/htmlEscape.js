const charmap = {
  '&': '&amp;',
  '"': '&quot;',
  '<': '&lt;',
  '>': '&gt;'
};

const charregex = new RegExp(`([${Object.keys(charmap).map(char => `\\${char}`)}])`, 'g');

module.exports = text => text.replace(charregex, char => charmap[char]);
