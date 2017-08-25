const DAO = require('./DAO');

module.exports = {
  findWithString(string, notes) {
    var noteMap = Array.prototype.concat.apply([], notes.map(getMatches));
    noteMap = noteMap.sort(function(note1, note2) {
      return (note1.matchValue < note2.matchValue)? 1 : (note1.matchValue > note2.matchValue)? -1 : 0;
    });
    return noteMap.slice(0, 10);
  }
}

function getMatchValue(noteContent, string) {
  match =  noteContent.match(new RegExp(string, 'g'));
  return match? match.length: 0;
  
}

function getMatches(note) {
  var matches = [];
  var array = Array.from(note.structuredContent.childNodes);
  var i = 0;
  while (i < array.length) {
    node = array[i];
    if (node.tagName && node.tagName.match(/H\d/)) {
      var j = i+1;
      while (j < array.length) {
        if (array[j].tagName && array[j].tagName.match(/H\d/)) {
          break;
        }
        j++;
      }
      
      i=j;
    }
  }
  console.log(array);
  note.structuredContent.childNodes.forEach(function(node) {
    if (node.tagName && node.tagName.match(/H\d/)) {
      lastHeader = node;
      // console.log(node.tagName);
    }
  });
  return [];
  // return {
  //   matchValue: getMatchValue(note.content, string),
  //   note: note
  // }
}
