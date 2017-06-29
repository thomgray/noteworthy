// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// dependencies
const md = require('./markdown');
var fs = require('fs');
const DAO = require('./DAO');
const tree = require('./tree');
const util = require('./util');
var Split = require('split.js')

// anchor objects
const markedWrapper = document.getElementById("marked")
const treeView = document.getElementById('tree-view');

var treeViewList = document.createElement('ul');
var p =  document.createElement('div');
markedWrapper.appendChild(p);

var notePaths = DAO.getNotePaths();
var currentNote = DAO.getConfig()['currentNote'];
if (currentNote) {
  console.log(currentNote);
  selectNote(currentNote)
}

var treeList = tree.getFileList(notePaths, clickTreeNote);
treeView.appendChild(treeList);


document.getElementById('command-line').addEventListener('keydown', function (e) {
  if (e.which == 9) {
    e.preventDefault();
    console.log("autocomplete");
  } else if (e.which == 13) {
    console.log("return");
  }
});

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
  DAO.setConfig("currentNote", notePath);
  currentNote = notePath
  raw = DAO.loadNote(currentNote)
  p = md.markdown(raw)
  markedWrapper.removeChild(markedWrapper.firstChild)
  markedWrapper.appendChild(p)
}

module.exports = {
  close() {
    DAO.setConfig("currentNote", currentNote);
  }
}
