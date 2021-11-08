import React,{memo, useState} from 'react';

import './App.css';
import Buttons from './components/Buttons';

function App() {
  const [value, setValue] = useState("0");
  const [memory, setMemory] = useState(null);
  const [operator, setOperator] = useState(null);



  const commafy =(value)=>{
    let output = '';
    let decimal = '';
    let isNeg = false;
    if(value.includes('.')){
      output = value.substring(0, value.indexOf('.'));
      decimal = value.substring(value.indexOf('.'));
    }else output = value;
    if(parseFloat(value)<0){
      isNeg = true;
      output = value.substring(1);
    }
    return isNeg ? '-' + parseFloat(output).toLocaleString() + decimal : parseFloat(output).toLocaleString() + decimal;
  };

  const handleButtonClick = content => () => {
    const num = parseFloat(value);
    var isOn = 0;
    if(content==='AC'){
      setValue('0');
      setMemory(null);
      setOperator(null);
      return;
    }
    if(content==='±'){
      setValue((num* -1).toString());
      return;
    }
    if(content==='%'){
      setValue((num/100).toString());
      setMemory(null);
      setOperator(null);
      return;
    }
    if(content==='÷'){
      if(operator !== null){

        if(operator==='+'){
          setMemory((memory+num));
        }
        else if(operator==='-'){
          setMemory((memory-num));
        }
        else if(operator==='×'){
          setMemory((memory*num));
        }
        else if(operator==='÷'){
          setMemory((memory/num));
        }
      }else setMemory(num);
      setOperator('÷');
      isOn = 1;
      return;
    }
    if(content==='×'){
      if(operator !== null){

        if(operator==='+'){
          setMemory((memory+num));
        }
        else if(operator==='-'){
          setMemory((memory-num));
        }
        else if(operator==='×'){
          setMemory((memory*num));
        }
        else if(operator==='÷'){
          setMemory((memory/num));
        }
      }else setMemory(num);
      setOperator('×');
      isOn = 1;
      return;
    }
    if(content==='-'){
      if(operator !== null){

        if(operator==='+'){
          setMemory((memory+num));
        }
        else if(operator==='-'){
          setMemory((memory-num));
        }
        else if(operator==='×'){
          setMemory((memory*num));
        }
        else if(operator==='÷'){
          setMemory((memory/num));
        }
      }else setMemory(num);
      setOperator('-');
      isOn = 1;
      return;
    }
    if(content==='+'){
      if(operator !== null){

        if(operator==='+'){
          setMemory((memory+num));
        }
        else if(operator==='-'){
          setMemory((memory-num));
        }
        else if(operator==='×'){
          setMemory((memory*num));
        }
        else if(operator==='÷'){
          setMemory((memory/num));
        }
      }else setMemory(num);
      setOperator('+');
      isOn = 1;
      return;
    }
    if(content==='='){
      if(!operator) return;
      if(operator==='+'){
        setValue((memory+num).toString());
      }
      else if(operator==='-'){
        setValue((memory-num).toString());
      }
      else if(operator==='×'){
        setValue((memory*num).toString());
      }
      else if(operator==='÷'){
        setValue((memory/num).toString());
      }

      setMemory(null);
      setOperator(null);
      return;
    }
    if(content === '.'){
      if(value.includes('.')) return;
      setValue(value+'.');
      return;
    }
    if(content === '0'){
      if (operator==='÷'){
        setValue('error');
        return;
      }
    }
    if(value[value.length -1] ==='.'){
      setValue(value+content);
    }
    if(isOn === 1) {
      setValue(content);
      isOn = 0;
      return;
    }
    setValue((parseFloat(num + content)).toString());
    console.log(operator);
    console.log(isOn);
  };

  return (

    <div className="container">
      <div className="display">{commafy(value)}</div>
      <div className="buttons">
        <Buttons onButtonClick={handleButtonClick}content="AC" type="function"/>
        <Buttons onButtonClick={handleButtonClick}content="±" type="function"/>
        <Buttons onButtonClick={handleButtonClick}content="%" type="function"/>
        <Buttons onButtonClick={handleButtonClick}content="÷" type="operator"  operator={operator}/>
        <Buttons onButtonClick={handleButtonClick}content="7"/>
        <Buttons onButtonClick={handleButtonClick}content="8"/>
        <Buttons onButtonClick={handleButtonClick}content="9"/>
        <Buttons onButtonClick={handleButtonClick}content="×" type="operator"  operator={operator}/>
        <Buttons onButtonClick={handleButtonClick}content="4"/>
        <Buttons onButtonClick={handleButtonClick}content="5"/>
        <Buttons onButtonClick={handleButtonClick}content="6"/>
        <Buttons onButtonClick={handleButtonClick}content="-" type="operator" operator={operator}/>
        <Buttons onButtonClick={handleButtonClick}content="1"/>
        <Buttons onButtonClick={handleButtonClick}content="2"/>
        <Buttons onButtonClick={handleButtonClick}content="3"/>
        <Buttons onButtonClick={handleButtonClick}content="+" type="operator" operator={operator}/>
        <Buttons onButtonClick={handleButtonClick}content="0"/>
        <Buttons onButtonClick={handleButtonClick}content="."/>
        <Buttons onButtonClick={handleButtonClick}content="=" type="operator" operator={operator}/>

      </div>
    </div>
  );
}

export default App;
