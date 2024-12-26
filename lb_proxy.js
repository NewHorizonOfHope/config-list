import fetch from 'node-fetch'
import fs from 'fs'

const link = 'https://raw.githubusercontent.com/hagezi/dns-blocklists/main/wildcard/doh-vpn-proxy-bypass-onlydomains.txt'

;(async () => {
  let lines = (await (await fetch(link)).text()).trim().split('\n').map(x => x.trim())
  lines = lines.filter(x => !x.startsWith('#') && !/cleanbrowsing/.test(x))
  fs.writeFileSync('./out/lb_proxy.txt', lines.join('\n'))
})()
