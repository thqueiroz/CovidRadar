import socketio from 'socket.io-client';

const socket = socketio('http://192.168.1.2:3333', {
    autoConnect: false
});

function subscribeToNewDev(subscribeFunction) {
    socket.on('new-user-location', subscribeFunction);
}

function connect(latitude, longitude) {
    socket.io.opts.query = {
        latitude,
        longitude
    };
    socket.connect();
}

function disconnect() {
    if (socket.connected) {
        socket.disconnect();
    }
}

export { connect, disconnect, subscribeToNewDev };
