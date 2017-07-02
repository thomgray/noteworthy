const DAO = require('./DAO');

module.exports = {
  findWithString(string, notes) {
    var noteMap = notes.map(function(note){
      return {
        matchValue: getMatchValue(note.content, string),
        note: note
      }
    })
    noteMap = noteMap.sort(function(note1, note2) {
      return (note1.matchValue < note2.matchValue)? 1 : (note1.matchValue > note2.matchValue)? -1 : 0;
    });
    noteMap = noteMap.filter(function(n){
      return n.matchValue > 0;
    })
    return noteMap.slice(0, 10);
  }
}

function getMatchValue(noteContent, string) {
  match =  noteContent.match(new RegExp(string, 'g'));
  return match? match.length: 0;
  
}
