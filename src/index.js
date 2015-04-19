var ltx = require('ltx')

var BusinessLogic = function(config) {
  this.config = config
}

BusinessLogic.prototype.process = function(stanza, callback) {
  if (stanza.is('message')) {
    var reply = new ltx.Element('message')
    reply.attrs.to = stanza.attrs.from
    reply.c('body').t('I got your message')
    return callback(stanza)
  }
  console.log('I give up on ' + stanza.root().toString())
}

module.exports = BusinessLogic
