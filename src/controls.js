var exec = require('child_process').exec;

module.exports = {
  openInAtom(note) {
    if (note.dir && note.file && note.extension) {
      notePath = `${note.dir}/${note.file}.${note.extension}`;
      exec(`atom ${notePath}`, function (error, stdout, stderr) {
        if (error !== null) {
          console.log('exec error: ' + error);
        }
      });
    } else {
      console.log("I won't open that!");
    }
  }
}