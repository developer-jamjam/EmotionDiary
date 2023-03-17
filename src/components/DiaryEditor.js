import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiaryDispatchContext } from '../App.js';

import MyButton from './MyButton';
import MyHeader from './MyHeader';
import EmotionItem from './EmotionItem';
import { getStringDate } from '../util/date.js';
import { emotionList } from '../util/emotion.js';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';


const DiaryEditor = ({isEdit,originData}) => {
    const contentRef = useRef();
    const [content,setContent] = useState("");
    const [emotion,setEmotion] = useState(3);
    const [date, setDate] = useState(getStringDate(new Date()));

    const {onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);
    const navigate = useNavigate();

    const MyConfirm = withReactContent(Swal);

    const handleClickEmote = useCallback((emotion) => {
        setEmotion(emotion);
    },[]);

    const handleSubmit = () => {
        if (content.length < 1) {
            contentRef.current.focus();
            return;
        }

        MyConfirm.fire({
            title: isEdit? <p>감정 기록을 수정 하시겠습니까?</p> : <p>새로운 감정을 기록 하시겠습니까?</p> ,
            showDenyButton: true,
            confirmButtonText: isEdit? "수정" : "기록" ,
            denyButtonText: isEdit? "수정취소" : "기록취소",
        }).then((result) => {
            if (result.isConfirmed) {
                if (!isEdit) {
                    onCreate(date, content, emotion);
                } else {
                    onEdit(originData.id, date, content, emotion);
                }
                navigate('/home',{replace: true});
            }
        })
    }

    const handleRemove = () => {
        MyConfirm.fire({
            icon: 'warning',
            title: <p>감정기록을 삭제 하시겠습니까?</p> ,
            showDenyButton: true,
            confirmButtonText: "기록삭제",
            denyButtonText: "취소",
        }).then((result)=> {
            if (result.isConfirmed) {
                onRemove(originData.id);
                navigate('/home',{replace: true});
            }
        })
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
                rightChild={
                    isEdit && <MyButton text={"삭제하기"} type={"negative"} onClick={handleRemove} /> 
                }
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
                        <MyButton text={isEdit ? "수정취소" : "기록취소"} onClick={()=> navigate(-1)}/>
                        <MyButton 
                            text={isEdit? "수정완료": "기록완료"} 
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