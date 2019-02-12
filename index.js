const dns = require('dns')
// const P_ARGS = process.argv.splice(process.execArgv.length + 2)
const fi = require('./_sample.json')
const fs = require('fs')

const DL = host => new Promise((resolve, reject) =>
  dns.lookup(host, (err, address) => (err != null ? reject(err) : resolve(address)))
)

fs.appendFileSync('./results.txt', `OK HOSTS:\n\n`)

fi.forEach(async host => {
  let s = false
  try {
    s = await DL(host)
  } catch (e) {}

  if (s !== false) {
    console.log(`OK\t ${host}`)
    fs.appendFileSync('./results.txt', `${host}\n`)
  } else console.log(`ERR\t ${host}`)
})
