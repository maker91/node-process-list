'use strict'

const ps = require('bindings')('processlist')
const then = require('pify')

const es6snapshot = then(ps.snapshot)

const allowedFields = Object.freeze([
  'name',
  'pid',
  'ppid',
  'path',
  'threads',
  'owner',
  'priority',
  'cmdline',
  'starttime',
  'vmem',
  'pmem',
  'cpu',
  'utime',
  'stime'
])

const defaultFields = {
  name: true,
  pid: true,
  ppid: true,
  path: true,
  threads: true,
  owner: true,
  priority: true,
  cmdline: true,
  starttime: true,
  vmem: true,
  pmem: true,
  cpu: true,
  utime: true,
  stime: true
}

module.exports = {
  snapshot,
  allowedFields
}

/**
 * get process list
 * @param {Object} args
 * @param {bool} opts.pid
 * @param {bool} opts.ppid
 * @param {bool} opts.name
 * @param {bool} opts.path
 * @param {bool} opts.owner
 * @param {bool} opts.threads
 * @param {bool} opts.priority
 * @param {bool} opts.cmdline
 */
function snapshot (args) {
  let opts = {}

  args = Array.isArray(args) ? args : Array.from(arguments)

  if (!args.length) {
    opts = defaultFields
  }

  for (let i = 0; i < args.length; ++i) {
    if (allowedFields.indexOf(args[i]) === -1) {
      throw new Error(`Unknown field "${args[i]}"`)
    }

    opts[args[i]] = true
  }

  return es6snapshot(opts)
}
