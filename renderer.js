// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const md = require('./md/markdown');
var fs = require('fs');

var marked = require('marked');

var file = fs.readFileSync(process.env.HOME +'/Documents/note-worthy/c.md', "utf8");
var p =  md.markdown(file);
console.log(p);

document.getElementById("marked").appendChild(p);

document.getElementById('toggle-edit-btn').onclick = () => {
  console.log("BAR");
}
