import Message from './models/message';


const sendData =(data, ws) =>{
    ws.send(JSON.stringify(data));
}

const sendStatus = (payload, ws) =>{
    sendData(["status", payload], ws);
}

const initData = (ws) => {
    Message.find().sort({created_at:-1}).limit(100)
    .exec((err,res)=>{
        if(err) throw err; sendData(['init', res], ws);
    });
    console.log('avv');
};

const deleteDataB = (ws) =>{
    sendData(['cleared',{}], ws);
}
export {sendData, sendStatus, initData, deleteDataB}