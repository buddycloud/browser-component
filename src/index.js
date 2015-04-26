var ltx = require('ltx')

var BusinessLogic = function(config) {
  this.config = config
}

BusinessLogic.prototype.process = function(stanza, callback) {
  if (stanza.is('message')) {
    var reply = new ltx.Element('message')
    reply.attrs.to = stanza.attrs.from
    reply.attrs.from = stanza.attrs.to
    reply.c('body').t('I got your message')
    return callback(reply)
  }
  console.log('I give up on: ' + stanza.root().toString())
  callback()
}

module.exports = BusinessLogic
