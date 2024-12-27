import fs from 'fs'

if (!fs.existsSync('./out')) {
  fs.mkdirSync('./out')
}

await import('./lb_lists.js');
