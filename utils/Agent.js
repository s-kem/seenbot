const superagent = require('superagent')
const promise = require('superagent-promise')
const each = require('lodash/each')

const agent = promise(superagent, Promise)

// default Accept and Content-Type to JSON
const setHeaders = (req, headers = {} ) => {
  if ( !headers['Accept'] ) { // eslint-disable-line
    req.set('Accept', 'application/json')
  }
  if ( !headers['Content-Type'] ) {
    req.set('Content-Type', 'application/json')
  }
  each(headers, (value, key) => {
    req.set(key, value)
  })

  return req
}

const processSuccess = result => result
const processError = error => Promise.reject(error)

const wrapper = method => {
  if ( method === 'put' || method === 'post' ) {
    return (url, data, headers = {}) =>
      setHeaders(agent[method](url, data), headers).then(processSuccess).catch(processError)
  }

  return (url, headers = {}) =>
    setHeaders(agent[method](url), headers).then(processSuccess).catch(processError)
}

const get = wrapper('get')
const put = wrapper('put')
const post = wrapper('post')
const del = wrapper('del')

module.exports = { post, get, del, put }
