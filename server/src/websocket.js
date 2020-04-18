import socketio from 'socket.io';
import calculateDistance from './utils/calculateDistance';

let io;
const connections = [];

exports.setupWebSocket = server => {
  io = socketio(server);

  io.on('connection', socket => {
    const { latitude, longitude } = socket.handshake.query;

    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
    });
  });
};

export function findConnections(coordinates) {
  return connections.filter(connection => {
    return calculateDistance(coordinates, connection.coordinates) < 10;
  });
}

export function sendMessage(to, message, data) {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
}
