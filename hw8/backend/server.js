const WebSocket = require('ws');
import http from 'http';
import express from 'express';
import dotenv from 'dotenv-defaults';
import mongoose from 'mongoose';
import {sendData, sendStatus, initData, deleteDataB} from './wssConnect';
import Message from'./models/message';
import cors from 'cors';

const app = express();
app.use(cors());
const server = http.createServer(app);
const wss = new WebSocket.Server({server});
dotenv.config();

const port = process.env.PORT || 5000;
app.listen(port, ()=>{console.log(`listening on port ${port}`)});

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((res)=>console.log('mongo db connection created'));

const db = mongoose.connection;

db.once('open', () => {
    const broadcastMessage = (data) =>{
        if(data === 0) wss.clients.forEach((client)=>{
            deleteDataB(client);
        });
        else wss.clients.forEach((client) =>{
            sendData(["output", data], client);
        })
    }

    console.log(wss.readyState);
    console.log(wss);
    wss.on('connection', (ws)=>{
        initData(ws);
        ws.onmessage = async (byteString) => {
            const {data} = byteString;
            const [task, payload] = JSON.parse(data);

            switch(task){
                case 'input':{
                    const {name, body} = payload;
                    const message = new Message({name, body});
                    console.log(name, body)
                    try {await message.save();}catch(e){
                        throw new Error("Message DB save error: " + e);
                    }
                    //console.log('2')
                    //sendData(['output', [payload]], ws);
                    sendStatus({
                        type: 'success',
                        msg: 'Message sent.'
                    }, ws)
                    broadcastMessage(['output', payload]);
                    break;
                }
                case 'delete': {
                    await Message.deleteMany({})

                    broadcastMessage(0);
                    sendStatus({
                        type: 'success', msg:'Message cache cleared'}, ws)
                    }

                default: break;
            }
        }

    })
    const PORT = process.env.PORT || 4000;
    server.listen(PORT, ()=>{console.log(`Listening on http://localhost:${PORT}`)});
    }
    )
