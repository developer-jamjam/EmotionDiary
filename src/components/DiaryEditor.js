import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiaryDispatchContext } from '../App.js';

import MyButton from './MyButton';
import MyHeader from './MyHeader';
import EmotionItem from './EmotionItem';

const emotionList = [
    {
        emotion_id: 1,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion1.png`,
        emotion_descript: '아주 Nice'
    },
    {
        emotion_id: 2,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion2.png`,
        emotion_descript: '조금 Nice'
    },
    {
        emotion_id: 3,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion3.png`,
        emotion_descript: 'SoSo 나쁘지않음'
    },
    {
        emotion_id: 4,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion4.png`,
        emotion_descript: '조금 Bad'
    },
    {
        emotion_id: 5,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion5.png`,
        emotion_descript: '완전 Bad'
    }
]

const getStringDate = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {  
      month = `0${month}`;
    }
    if (day < 10) { 
      day = `0${day}`;
    }
    return `${year}-${month}-${day}`;
}

const DiaryEditor = () => {
    const contentRef = useRef();
    const [content,setContent] = useState("");
    const [emotion,setEmotion] = useState(3);
    const [date, setDate] = useState(getStringDate(new Date()));

    const {onCreate} = useContext(DiaryDispatchContext);
    const navigate = useNavigate();

    const handleClickEmote = (emotion) => {
        setEmotion(emotion);
    }

    const handleSubmit = () => {
        if (content.length < 1) {
            contentRef.current.focus();
            return;
        }

        onCreate(date, content, emotion);
        navigate('/',{replace: true});
    }


    return (
        <div className="DiaryEditor">
            <MyHeader 
                headText={"감정 기록하기"} 
                leftChild={<MyButton text={"◀ 뒤로가기"} onClick={()=> navigate(-1)}/>}
            />
            <div>
                <section>
                    <h4>작성하려는 날은 언제인가요?</h4>
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
                    <h4>어떤 기분이셨나요?</h4>
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
                            placeholder="그 하루는 어땠고 또 어떤 기분 이신가요?"
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