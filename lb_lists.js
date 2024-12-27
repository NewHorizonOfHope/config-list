import fetch from 'node-fetch'
import fs from 'fs'

const load = async (name, filterRE, link) => {
  let lines = (await(await fetch(link)).text()).trim().split('\n').map(x => x.trim())
  lines = lines.filter(x => !x.startsWith('#') && (filterRE != null ? !filterRE.test(x) : 1))
  fs.writeFileSync(`./out/lb_${name}.txt`, lines.join('\n'))
}

;(async () => {
  await Promise.all([
    load('proxy', /cleanbrowsing/, 'https://raw.githubusercontent.com/hagezi/dns-blocklists/main/wildcard/doh-vpn-proxy-bypass-onlydomains.txt'),
    load('unsafe_engines', null, 'https://raw.githubusercontent.com/hagezi/dns-blocklists/main/wildcard/nosafesearch-onlydomains.txt'),
    load('torrents', /(archive\.org)/, 'https://raw.githubusercontent.com/SM443/Pi-hole-Torrent-Blocklist/main/all-torrent-websites.txt')
  ])
})()
