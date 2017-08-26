const DAO = require('./DAO');

module.exports = {
  findWithString(string, notes) {
    var noteMap = Array.prototype.concat.apply([], notes.map(function(note){
      return getMatches(note, string);
    }));
    noteMap = noteMap.sort(function(note1, note2) {
      return (note1.matchValue < note2.matchValue)? 1 : (note1.matchValue > note2.matchValue)? -1 : 0;
    });
    return noteMap.slice(0, 10);
  }
}

function getMatchValue(section, string) {
  match =  section[0].textContent.match(new RegExp(string, 'g'));
  return match ? match.length: 0;
}

function getNoteSections(note) {
  var array = Array.from(note.structuredContent.childNodes);
  var sections = [];
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
      section = array.slice(i, j);
      sections.push(section);
      i=j;
    } else {
      i++;
    }
  }
  return sections;
}

function getMatches(note, query) {
  var sections = getNoteSections(note);
  var matches = sections.map(function(section){
    return {
      note: note,
      matchValue: getMatchValue(section, query),
      subHeading: section[0].textContent
    };
  }).filter(function(match){
    return match.matchValue > 0;
  });
  return matches;
}

