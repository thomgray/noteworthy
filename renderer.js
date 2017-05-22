// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const md = require('./md/markdown');
var fs = require('fs');

var marked = require('marked');

const markedWrapper = document.getElementById("marked")
const editCheckbox = document.getElementById('edit-checkbox');
const treeView = document.getElementById('tree-view');

var file = fs.readFileSync(process.env.HOME +'/Documents/note-worthy/c.md', "utf8");
var p =  md.markdown(file);

var rawWrapper = document.createElement('div');
var raw = document.createElement('textarea');
raw.classList.add("raw-md");

markedWrapper.appendChild(p);

editCheckbox.onclick = () => {
  if (editCheckbox.checked) {
    markedWrapper.removeChild(p);
    raw.innerHTML = file;
    markedWrapper.appendChild(raw);
  } else {
    markedWrapper.removeChild(raw)
    this.p = md.markdown(file);
    markedWrapper.appendChild(p);
  }
};

document.getElementById('command-line').addEventListener('keydown', function (e) {
  if (e.which == 9) {
    e.preventDefault();
    console.log("autocomplete");
  } else if (e.which == 13) {
    console.log("return");
  }
});


