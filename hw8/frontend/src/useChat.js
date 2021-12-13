import {useState} from 'react';
const client = new WebSocket("ws://localhost:4000/");


const useChat =() => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});

    const sendMessage = (message) =>{
        if(message.length === 0){
            return;
        }
        else if(message.constructor === Array){
            message.map((msg)=>setMessages([...messages, msg]))
        }else setMessages([...messages, message])
        console.log(message)
    };
    const sendData = (data) =>{
        if(data[1].body.length === 0){
            setStatus({type: "empty-string", msg: ""});
        }else client.send(JSON.stringify(data));
    };
    const clearMessages = () => {
        client.send(JSON.stringify(["delete", {}]));
    };
    const initData = () =>{
        client.send(JSON.stringify(['init', {}]));
    }
    client.onmessage = (byteString) => {
        const {data} = byteString;
        const [task, payload] = JSON.parse(data);
        switch(task) {
            case "output":{
                sendMessage(payload); break;
            }
            case 'init':{
                setMessages(()=>payload); break;
            }
            case 'cleared':{
                setMessages([]); break;
            }
            case 'status': {
                setStatus(payload); break;
            }
            default: break;
        }
    }

    return{
        status, messages, sendMessage, clearMessages, initData, sendData
    };
};

export default useChat;