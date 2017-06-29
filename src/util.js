module.exports = {
  getFileName(path) {
    final = path.split('/').pop()
    return final.replace(/\.[md|txt]$/, '');
  }
}