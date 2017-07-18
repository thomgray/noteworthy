var exec = require('child_process').exec;

module.exports = {
  openInAtom(note) {
    notePath = `${note.dir}/${note.file}.${note.extension}`;
    exec(`atom ${notePath}`, function (error, stdout, stderr) {
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
  }
}