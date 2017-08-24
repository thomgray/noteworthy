const fs = require('fs-plus');
const md = require('./markdown');

module.exports = {
  getStructuredPath(rawPath) {
    regex = /^(.+)\/(.+)\.(md|txt)$/
    match = regex.exec(rawPath)
    dir = match[1]
    file = match[2]
    extn = match[3]
    return  {file: file, dir: dir, extension: extn} 
  },
  getMap() {
    var str = fs.readFileSync(__dirname + '/../data/notemap.json', null, 'utf8');
    return JSON.parse(str);
  },
  getConfig() {
    return JSON.parse(fs.readFileSync(__dirname + '/../data/config.json', null, 'utf8'));
  },
  setConfig(key, value) {
    config = this.getConfig()
    config[key] = value;
    this.saveConfig(config)
  },
  saveConfig(config) {
    var serailized = JSON.stringify(config, null, '  ');
    fs.writeFileSync(__dirname + '/../data/config.json', serailized, 'utf8')
  },
  getNotePaths() {
    config = this.getConfig();
    noteDirs = this.getConfig().notedirs.map(fs.absolute);
    notePaths = Array.prototype.concat.apply([], noteDirs.map(function(dir) {
        return (fs.readdirSync(dir).filter((path) => {
          return path.endsWith('.md') || path.endsWith('.txt');
        })).map(function(file) { 
          regex = /^(.*)\.(md|txt)$/
          match = regex.exec(file)
          file = match[1]
          extn = match[2]
          return  {file: file, dir: dir, extension: extn} 
        });
    }));
    return notePaths;
  },
  loadNote(path) {
    if (typeof path == 'string') {
      return fs.readFileSync(path, 'utf8');
    } else if ('dir' in path && 'file' in path) {
      return fs.readFileSync(`${path.dir}/${path.file}.${path.extension}`, 'utf8');
    }
  },
  getTitleForNote(path) {
    str = this.loadNote(path);
    nodes = md.markdown(str);
    h1s = nodes.querySelectorAll('h1');
    console.log(h1s);
    return h1s[0].innerHTML
  }
}