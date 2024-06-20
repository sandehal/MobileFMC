import dgram from 'react-native-udp';
import { Buffer } from 'buffer';

//LEGACY CODE
// const SERVER_PORT = 7878; // Replace with the port you expect data on
// const SERVER_IP = '0.0.0.0'; // Listen on all interfaces
// const XP11_PLUGIN_PORT = 7879; // Replace with the port the X-Plane plugin listens on
// const XP11_PLUGIN_IP = '192.168.86.21'; // Replace with the IP address of the X-Plane machine

const SERVER_PORT = 7878; // Replace with the port you expect data on
const CLIENT_PORT = 7880; // Port where the app listens for acknowledgment
const XP11_PLUGIN_PORT = 7879; // Replace with the port the X-Plane plugin listens on
const BROADCAST_ADDRESS = '255.255.255.255'; // Broadcast address

const setupUdpListener = (onMessage, onAck) => {
  const socket = dgram.createSocket('udp4');

  socket.bind(CLIENT_PORT);

  socket.on('listening', () => {
    const address = socket.address();
    console.log(`UDP socket listening on ${address.address}:${address.port}`);
    socket.setBroadcast(true); // Enable broadcast mode
  });

  socket.on('message', (msg, rinfo) => {
    try {
      const data = JSON.parse(msg.toString()); // Assuming the server sends JSON data
      if (data.command === 'ack') {
        console.log('Received ack from X-Plane plugin');
        onAck(rinfo.address);
      }
      else {
        onMessage(data);
      }
      
    } catch (error) {
      console.error('Failed to parse message:', error);
    }
  });

  socket.on('error', (err) => {
    console.error(`UDP socket error: ${err.stack}`);
    socket.close();
  });

  const sendConnectRequest = () => {
    const message = Buffer.from(JSON.stringify({ command: 'connect-request' }));
    socket.send(message, 0, message.length, XP11_PLUGIN_PORT, BROADCAST_ADDRESS, (err) => {
      if (err) {
        console.error('UDP send error:', err.stack);
      } else {
        console.log('Connect request sent');
      }
    });
  };

  const sendJson = (data, serverIp) => {
    if (!serverIp) {
      console.error('Server IP is not defined.');
      return;
    }

    const message = Buffer.from(JSON.stringify(data));
    socket.send(message, 0, message.length, XP11_PLUGIN_PORT, serverIp, (err) => {
      if (err) {
        console.error('UDP send error:', err.stack);
      } else {
        console.log('Message sent: ', data);
      }
    });
  };

  return { socket, sendConnectRequest, sendJson };
};

export default setupUdpListener;