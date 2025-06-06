import { createSocket } from 'node:dgram'


const ssdpSocketOptions = {
  broadcast: {
    address: '239.255.255.250',
    port: 1900
  },
    bind: {
      address: '0.0.0.0',
      port: 1900
    },
  maxHops: 4
}

const socket = createSocket({
  type: 'udp4',
  reuseAddr: true,
}, (buf, info) => {
  console.log('transport:incoming-message', buf, info)
})

socket.bind(ssdpSocketOptions.bind.port, ssdpSocketOptions.bind.address)

socket.on('error', (err) => {
  console.log('error', err)
})

socket.on('listening', () => {
  try {
    console.log(ssdpSocketOptions.broadcast.address, socket.address().address)
    socket.addMembership(ssdpSocketOptions.broadcast.address, socket.address().address)
    // socket.addMembership(ssdpSocketOptions.broadcast.address)
    socket.setBroadcast(true)
    socket.setMulticastTTL(ssdpSocketOptions.maxHops)

    console.log('listening')
  } catch (error: unknown) {
    console.log('error', error)
  }
})
