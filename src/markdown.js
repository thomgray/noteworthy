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

    return node;
  }
}

function copyCode(ev) {
  clipboard.writeText(ev.target.previousSibling.innerHTML)
}
