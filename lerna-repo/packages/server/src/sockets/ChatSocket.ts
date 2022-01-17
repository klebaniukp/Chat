// import { client as redisClient } from '../redis/client';
import { Server } from 'socket.io';

export class ChatConnection {
    socket: any;
    io: Server;
    constructor(io: Server, socket: any) {
        this.socket = socket;
        this.io = io;

        socket.on('connect', () => this.connected());
        socket.on('connect_error', (error: string) => {
            console.log(`connect_error due to ${error}`);
        });
    }

    connected() {
        console.log('connected');
    }
}
