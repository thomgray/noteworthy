const marked = require('marked');
const shell = require('electron').shell

module.exports = {
  markdown(string) {
    node = document.createElement('div');
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

    return node;
  }
}
