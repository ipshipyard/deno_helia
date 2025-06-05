import { createHelia } from 'npm:helia@5.4.2'

const node = await createHelia()

console.info('Helia is running')
console.info('PeerId:', node.libp2p.peerId.toString())
