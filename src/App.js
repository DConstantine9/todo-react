import React, { useEffect, useState } from 'react';
import {v4 as uuid} from "uuid"
import {randomColor} from "randomcolor"
import Draggable from 'react-draggable';
import './App.css';

function App() {
  const [item, setItem] = useState("")
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  ) 

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items))
  }, [items])

  const newItem = () => {
    if (item.trim() !== "") {
      const newItem = {
        id: uuid(),
        item: item,
        color: randomColor({
          luminosity: "light"
        }),
        defaultPos: {
          x: 100,
          y: -100
        }
      } 
      console.log(newItem)
      setItems((items) => [...items, newItem])
      setItem("")
    } else {
      
    }
  }

  const deleteNode = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }
  

  return (
    <div className="App">
      <div className='wrapper'>
        <input 
          placeholder='type here...' 
          onChange={(e) => {
            setItem(e.target.value)
        }} />
        <button 
          className='enter'
          onClick={newItem}
        >
          ENTER
        </button>

        
        {items.map((item, i) => {
          return (
            <Draggable 
              key={i}
              defaultPosition={item.defaultPos}
            >
              <div className='todo__item' style={{backgroundColor: item.color}}>
                {`${item.item}`}
                <button 
                  className='delete'
                  onClick={() => deleteNode(item.id)}
                >
                  X
                </button>
              </div>
            </Draggable>
          )
        })}
      </div>
    </div>
  );
}

export default App;
