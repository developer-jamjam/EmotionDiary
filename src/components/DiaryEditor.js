import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiaryDispatchContext } from '../App.js';

import MyButton from './MyButton';
import MyHeader from './MyHeader';
import EmotionItem from './EmotionItem';
import { getStringDate } from '../util/date.js';
import { emotionList } from '../util/emotion.js';


const DiaryEditor = ({isEdit,originData}) => {
    const contentRef = useRef();
    const [content,setContent] = useState("");
    const [emotion,setEmotion] = useState(3);
    const [date, setDate] = useState(getStringDate(new Date()));

    const {onCreate, onEdit} = useContext(DiaryDispatchContext);
    const navigate = useNavigate();

    const handleClickEmote = (emotion) => {
        setEmotion(emotion);
    }

    const handleSubmit = () => {
        if (content.length < 1) {
            contentRef.current.focus();
            return;
        }
        if (window.confirm(isEdit? "감정 기록을 수정 하시겠습니까?" : "새로운 감정을 기록 하시겠습니까?")) {
            if (!isEdit) {
                onCreate(date, content, emotion);
            } else {
                onEdit(originData.id, date, content, emotion);
            }
        }
        navigate('/',{replace: true});
    }

    useEffect(()=>{
        if(isEdit){
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setEmotion(originData.emotion);
            setContent(originData.content);
        }
    },[isEdit,originData])

    return (
        <div className="DiaryEditor">
            <MyHeader 
                headText={isEdit ? "감정 수정하기" :"감정 기록하기"} 
                leftChild={<MyButton text={"◀ 뒤로가기"} onClick={()=> navigate(-1)}/>}
            />
            <div>
                <section>
                    <h4>감정을 기록하려는 날은?</h4>
                    <div className="input_box">
                        <input 
                            className="input_date"
                            type="date" 
                            value={date}
                            onChange={(e)=>setDate(e.target.value)}
                        />
                    </div>
                </section>
                <section>
                    <h4>어떤 기분이셨나요? <br/>(Pick Emotion)</h4>
                    <div className="input_box emotion_list_wrapper">
                        {emotionList.map((it)=>(
                            <EmotionItem 
                                key={it.emotion_id} {...it} 
                                onClick={handleClickEmote}
                                isSelected={it.emotion_id === emotion}
                            />
                        ))}
                    </div>
                </section>
                <section>
                    <h4>기록 할 하루는 어땠나요?</h4>
                    <div className="input_box text_wrapper">
                        <textarea 
                            placeholder="감정을 기록해주세요"
                            ref={contentRef} 
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </section>
                <section>
                    <div className="control_box">
                        <MyButton text={"기록취소"} onClick={()=> navigate(-1)}/>
                        <MyButton 
                            text={"기록완료"} 
                            type={"positive"} 
                            onClick={handleSubmit}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DiaryEditor;