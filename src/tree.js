const renderer = require('./app');

module.exports = {
  getTree(model) {
    var ul = document.createElement('ul')
    ul.classList.add('tree-list', 'tree-list-top')
    model.forEach((item) => {
      ul.appendChild(getListItem(item))
    })
    return ul;
  },
  getFileList(notes, onclick) {
    var ul = document.createElement('ul')
    ul.classList.add('tree-list', 'tree-list-top')
    notes.forEach(function(note) {
      ul.appendChild(makeListItem(note, onclick));
    })
    return ul;
  }
}

function getListItem(item) {
  var li = document.createElement('li')
  var div = document.createElement('div')
  div.classList.add('tree-list__element')
  div.innerHTML = item.name
  div.setAttribute('note-id', item.id)
  div.onclick = itemSelected
  li.appendChild(div)
  li.classList.add('tree-list__item')
  console.log(item.id);
  if (item.children && item.children.length) {
    var innerList = document.createElement('ul')
    innerList.classList.add('tree-list','tree-list-inner')
    item.children.forEach((child) => {
        innerList.appendChild(getListItem(child))
    })
    li.appendChild(innerList)
  }
  return li
}

function makeListItem(note, onclick) {
  var li = document.createElement('li')
  var div = document.createElement('div')
  div.classList.add('tree-list__element')
  div.setAttribute('note-path', `${note.dir}/${note.file}`);
  div.innerHTML = note.file
  div.onclick = onclick
  li.appendChild(div)
  return li
}

function selectNote(ev) {
  path = ev.target.getAttribute('note-id')
  console.log(path);
}

function itemSelected(ev) {
  renderer.chooseNote(ev.target.getAttribute('note-id'))
}