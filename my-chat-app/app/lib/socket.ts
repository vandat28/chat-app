import io from 'socket.io-client';


export const getSocket = () => {

    const socketInstance = io('http://localhost:8080');

    return socketInstance;
};