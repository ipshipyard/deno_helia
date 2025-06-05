import dgram from 'node:dgram'

const socket = dgram.createSocket({ type: 'udp4', reuseAddr: true })

socket.bind(1900, () => {
  try {
    socket.addMembership('239.255.255.250', '0.0.0.0')
    // socket.addMembership('239.255.255.250', '192.168.3.65')
    console.log('Joined multicast group')
  } catch (err) {
    console.error('addMembership failed:', err)
  }
})
