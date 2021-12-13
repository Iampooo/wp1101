import './App.css';
import { Button, Input, message, Tag } from 'antd';
import useChat from './useChat';
import {useState, useEffect, useRef} from 'react';
import {UserOutlined} from "@ant-design/icons";
import styled from 'styled-components';

const LOCALSTORAGE_KEY = "save-me";
function App() {
  const {status, messages, sendMessage, clearMessages, sendData} = useChat();
  const [username, setUsername] = useState('');
  const [body, setBody] = useState('');
  const [signedIn, setSignedIn] = useState(0);
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
  const [me, setMe] = useState(savedMe || "");
  const displayStatus = (payload) =>{
    if(payload.msg){
      const{type, msg} = payload;
      const content = {content: msg, duration: 0.5};
      switch(type){
        case 'success': message.success(content);break;
        case 'error':
        default: message.error(content); break;
      }
    }
  }
  const bodyRef = useRef(null);
  useEffect(() =>{displayStatus(status)}, [status])
  useEffect(() =>{
    if(signedIn){
      localStorage.setItem(LOCALSTORAGE_KEY, me);
    }
  }, [signedIn, me])

  const Wrapper = styled.section`
    margin: 100px auto 0 solid;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 500px;
    margin: auto;
  `
  const signInPage =<Wrapper>

    <div className="App-title" styled={{marginBottom: "20px"}}>
      <h1>My Chat Room</h1>
    </div>
      <Input.Search
        prefix = {<UserOutlined/>}
        value={me} enterButton ="Sign In"
        onChange={(e)=>setMe(e.target.value)}
        placeholder="Enter your name"
        size = "large" style = {{width: 300, margin: 50}}
        onSearch = { (name) => {
            if(!name) displayStatus({type: "error", msg: "Please enter a name",});
            else {
              setSignedIn(true);
              setUsername(name);
            }}}

            />
    </Wrapper>
  const chatRoom = <div className="App">
  <div className="App-title">
    <h1>{username}'s ChatRoom</h1>
    <Button type="primary" danger onClick={clearMessages}>
      Clear
    </Button>
  </div>
  <div className="App-messages">
    {messages.length === 0 ?
      (<p style={{ color: '#ccc' }}>No messages...</p>) :
      (messages.map(({name, body}, i) => (
          <p className="App-message" key={i}>
            <Tag color="blue">{name}</Tag> {body}
          </p>
        )))}

  </div>
  {/* <Input
    // placeholder="Username"
    // value={username}
    // onChange={(e)=>setUsername(e.target.value)}
    // style={{ marginBottom: 10 }}
    // onKeyDown={(e)=>{
    //   if(e.key === 'Enter'){bodyRef.current.focus()}
    // }}
  ></Input> */}
  <Input.Search
    ref={bodyRef}
    value={body}
    onChange={(e)=> setBody(e.target.value)}
    enterButton="Send"
    placeholder="Type a message here..."
    onSearch={(msg) => {
      if(!msg||!username){
        displayStatus({
          type: 'error', msg: 'Please enter a username and a message body.'
        }); return;
      }
      sendData(['input',{name:username, body:msg}])
      setBody('');
    }}
  ></Input.Search>
</div>
  return signedIn ? chatRoom : signInPage;
}

export default App
