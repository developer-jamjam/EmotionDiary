import React, { useEffect, useReducer, useRef } from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Home from './pages/Home';
import Edit from './pages/Edit';
import New from './pages/New';
import Diary from './pages/Diary';
import Main from './pages/Main';

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

  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {

  const [data, dispatch] = useReducer(reducer, []);

  useEffect(()=> {
    const localData = localStorage.getItem("diary");
    if (localData) {
      const diaryList = JSON.parse(localData).sort((a,b)=>parseInt(b.id) - parseInt(a.id));
      
      if (diaryList.length >= 1) {
        dataId.current = parseInt(diaryList[0].id) + 1;
        dispatch({ type:"INIT", data:diaryList });
      }
    }
  },[])

  const dataId = useRef(0); //key값 관련 오류가 난다면 이쪽을 확인 해 볼것 
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

  const onRemove = (targetId) => {
    dispatch({type:"REMOVE", targetId});
  };

  const onEdit = (targetId,date,content,emotion) => {
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
            <Route path='/' element={<Main />} />
            <Route path='/home' element={<Home />} />
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
