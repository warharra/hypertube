const error = require('./error')
const pool = require('../db')
const utils = require('../utility/utils')
const _ = require('lodash')
const chalk = require('chalk')
const fetch = require('node-fetch')
const cheerio = require('cheerio')

exports.isAuthenticated = (req, res) => {
  return res.json({ auth: true })
}
