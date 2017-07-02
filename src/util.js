module.exports = {
  getFileName(path) {
    final = path.split('/').pop()
    return final.replace(/\.[md|txt]$/, '');
  },
  removeAllChildren(node) {
    while (node.hasChildNodes()) {
      node.removeChild(node.lastChild);
    }
  }
}