
import ssdp from 'npm:@achingbrain/ssdp@4.2.2'


const bus = await ssdp({
  cache: false,
  sockets: [{
    type: 'udp4',
    broadcast: {
      address: '239.255.255.250',
      port: 1900
    },
    bind: {
      address: '0.0.0.0',
      port: 1900
    },
    maxHops: 4
  }]
})

// print error messages to the console
bus.on('error', console.error)


// this is the unique service name we are interested in:
const serviceType = 'urn:schemas-upnp-org:device:InternetGatewayDevice:2'

for await (const service of bus.discover({ serviceType })) {
  // search for instances of a specific service
  console.log(service)
}
