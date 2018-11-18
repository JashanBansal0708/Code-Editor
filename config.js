'use strict'
var ignore = require('./ignore')

module.exports = {
  mailer: {
    service : 'Gmail',
    auth: {
      user: ignore.email,
      pass: ignore.pass
    }
  }
}