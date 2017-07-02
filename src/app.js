// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// dependencies
const md = require('./markdown');
var fs = require('fs');
const DAO = require('./DAO');
const tree = require('./tree');
const util = require('./util');
const searchEngine = require('./searchEngine');
var Split = require('split.js')

// anchor objects
const markedWrapper = document.getElementById("marked")
const treeView = document.getElementById('tree-view');

var treeViewList = document.createElement('ul');
var p =  document.createElement('div');
var commandLine = document.getElementById('command-line');
var commandLinePopUp = document.getElementById('command-line__popup')

markedWrapper.appendChild(p);

var notePaths = DAO.getNotePaths();
var currentNote = DAO.getConfig()['currentNote'];
if (currentNote) {
  selectNote(currentNote)
}

var treeList = tree.getFileList(notePaths, clickTreeNote);
treeView.appendChild(treeList);

commandLine.addEventListener('keydown', function (e) {
  if (e.which == 9) { //tab
    e.preventDefault();
  } else if (e.which == 13) { // enter
    nodes = commandLinePopUp.firstChild.childNodes
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].classList.contains('selected')) {
        nodes[i].click();
        break;
      }
    }
  } else if (e.which == 40) { // down
    node = commandLinePopUp.firstChild.firstChild
    while (node.nextSibling) {
      if (node.classList.contains('selected')) {
        node.classList.remove('selected')
        node.nextSibling.classList.add('selected')
        break;
      }
      node = node.nextSibling
    }
  } else if (e.which == 38) { //up
    node = commandLinePopUp.firstChild.lastChild
    while (node.previousSibling) {
      if (node.classList.contains('selected')) {
        node.classList.remove('selected')
        node.previousSibling.classList.add('selected')
        break;
      }
      node = node.previousSibling
    }
  }
});

function getSearchResultsAsUl(results) {
  ul = document.createElement('ul')
  ul.classList.add('popup__list')
  results.forEach(function(el){
    li = document.createElement('li');
    li.classList.add('popup__list-item')
    li.addEventListener('click', function(e){
      selectNote(el.note.path)
      util.removeAllChildren(commandLinePopUp)
      markedWrapper.firstChild.scrollIntoView();
    });
    li.innerHTML = el.note.path.file
    ul.appendChild(li)
  });
  return ul
}

commandLine.onblur = function(){ commandLinePopUp.classList.remove('shown')}

commandLine.oninput = function(){
  text = commandLine.value;
  results = searchEngine.findWithString(text, notePaths.map(function(note){
    return {
      path: note,
      content: DAO.loadNote(note)
    }
  }))
  if (results && results.length) {
    commandLinePopUp.classList.add('show');
    util.removeAllChildren(commandLinePopUp);
    ul = getSearchResultsAsUl(results);
    ul.firstChild.classList.add('selected')
    commandLinePopUp.appendChild(ul);
  } else {
    commandLinePopUp.classList.remove('show')
    util.removeAllChildren(commandLinePopUp)
  }
}

var leftPane = document.getElementById('left-pane');
var rightPane = document.getElementById('right-pane');

Split([leftPane, rightPane], {
  sizes: [20, 80],
  minSize: [100, 300],
  gutterSize: 5,
})

function clickTreeNote(ev) {
    path = ev.target.getAttribute('note-path')
    selectNote(path)
}

function selectNote(notePath) {
  raw = DAO.loadNote(notePath)
  p = md.markdown(raw)
  markedWrapper.removeChild(markedWrapper.firstChild)
  markedWrapper.appendChild(p)
  DAO.setConfig("currentNote", notePath);
  currentNote = notePath
}

module.exports = {
  close() {
    DAO.setConfig("currentNote", currentNote);
  }
}
