const marked = require('marked');
const shell = require('electron').shell
const $ = require('jquery')
const {clipboard} = require('electron')

module.exports = {
  markdown(string) {
    node = document.createElement('div');
    node.classList.add('marked-container')
    node.innerHTML = marked(string)
    const links = node.querySelectorAll('a[href]')
    
    mapIds(node)

    Array.prototype.forEach.call(links, function (link) {
      const url = link.getAttribute('href')
      if (url.indexOf('http') === 0) {
        link.addEventListener('click', function (e) {
          e.preventDefault()
          shell.openExternal(url)
        })
      }
    })
    
    const code = $(node).find('pre:has(code)').toArray()
    code.forEach((block) => {
      block.classList.add('code-container')
      var copyIcon = document.createElement('div')
      copyIcon.onclick = copyCode;
      copyIcon.classList.add('code__copyIcon')
      block.appendChild(copyIcon)
    })
    
    mapCheckBoxes(node)

    return node;
  }
}

function mapCheckBoxes(nodes) {
  listItems = nodes.querySelectorAll('li')
  listItems.forEach(function(li){
    match = li.innerHTML.match(/^\[( |x)\] (.*)$/)
    if (match) {
      checked = match[1] !== ' '
      content = match[2]
      checkBoxDiv = document.createElement('div')
      checkBox = document.createElement('input')
      checkBox.setAttribute('type', 'checkbox')
      if (checked) {
        checkBox.setAttribute('checked', true)
      }
      label = document.createElement('label')
      label.innerHTML = content
      checkBoxDiv.appendChild(checkBox)
      checkBoxDiv.appendChild(label)
      li.innerHTML = ""
      li.appendChild(checkBoxDiv)
    }

  })
}

function mapIds(nodes) {
  parentIds = [];
  
  nodes.childNodes.forEach(function(node) {
    if (node.tagName) {
      match = node.tagName.match(/H(\d)/);
      if (match) {
        original = node.id
        hval = parseInt(match[1]);
        position = parentIds.findIndex(function(element){
          return element.hval >= hval;
        });
        if (position >= 0) {
          parentIds = parentIds.slice(0, position);
        }
        parentIds.push({
          id: original,
          hval: hval
        });
        node.id = parentIds.reduce(function(sum, value) {
          return sum ?  `${sum}:${value.id}` : value.id;
        }, null);
      }
    }
  });
}

function copyCode(ev) {
  clipboard.writeText(ev.target.previousSibling.innerHTML)
}
