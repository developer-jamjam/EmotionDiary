import React, { useReducer, useRef } from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Home from './pages/Home';
import Edit from './pages/Edit';
import New from './pages/New';
import Diary from './pages/Diary';

const reducer = (state, action) => {
  let newState = [];
  switch(action.type) {
    case "INIT":{
      return action.data;
    }
    case "CREATE":{
      const newItem = {
        ...action.data
      };
      newState = [newItem, ...state];
      break;
    }
    case "REMOVE":{
      newState = state.filter((it)=>it.id !== action.targetId);
      break;
    }
    case "EDIT":{
      newState = state.map((it)=>
        it.id === action.data.id ? {...action.data} : it
      );
      break;
    }
    default:
      return state;
  }
  return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id: 1,
    content: "코드네임 버본",
    emotion:5,
    date: 1678200416929
  },
  {
    id: 2,
    content: "코드네임 베르무트",
    emotion:4,
    date: 1678200416930
  },
  {
    id: 3,
    content: "코드네임 진",
    emotion:1,
    date: 1678200416931
  },
  {
    id: 4,
    content: "FBI수사관 아카이 슈이치",
    emotion:4,
    date: 1678200416932
  },
  {
    id: 5,
    content: "팝마트 캐릭터 Dimoo",
    emotion:3,
    date: 1678200416933
  },
];

function App() {

  const [data, dispatch] = useReducer(reducer, dummyData);
  const dataId = useRef(0);

  const onCreate = (date, content, emotion) => {
    dispatch({
      type:"CREATE", 
      data:{
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  const onRemove = (targetId)=>{
    dispatch({type:"REMOVE"},targetId);
  };

  const onEdit = (targetId,date,content,emotion) =>{
    dispatch({
      type:"EDIT",
      data:{
        id: targetId,
        date : new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider 
        value={{
          onCreate,
          onEdit,
          onRemove,
        }}
      >
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/new' element={<New />} />
            <Route path='/edit/:id' element={<Edit />} />
            <Route path='/diary/:id' element={<Diary />} />
          </Routes>
          </div>
      </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
