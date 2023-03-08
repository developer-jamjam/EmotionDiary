import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DiaryStateContext } from '../App';
import MyButton from '../components/MyButton';
import MyHeader from '../components/MyHeader';
import { getStringDate } from '../util/date';
import { emotionList } from '../util/emotion';


const Diary = () =>{

    const {id} = useParams(); 
    const diaryList = useContext(DiaryStateContext); 
    const navigate = useNavigate(); 
    const [data,setData] = useState();


    useEffect(()=>{
        if (diaryList.length >= 1) {
            const targetDiary = diaryList.find(
                (it)=> parseInt(it.id) === parseInt(id)
            ); 
            
            if (targetDiary) {
                setData(targetDiary);
            } else {
                alert("감정기록이 없습니다.")
                navigate('/',{ replace: true});
            }
        }
    },[id,diaryList])

    if (!data) {
        return <div className="DiaryPage">로딩중입니다 .... </div>
    } else {

        const curEmotionData = emotionList.find(
            (it)=>parseInt(it.emotion_id) === parseInt(data.emotion)
        );
        
        return (
            <div className="DiaryPage">
                <MyHeader 
                    headText={`${getStringDate(new Date(data.date))} 감정기록`}
                    leftChild={<MyButton text={"◀ 뒤로가기"} onClick={()=> navigate(-1)} />}
                    rightChild={<MyButton text={"기록수정"} onClick={()=>navigate(`/edit/${data.id}`)} />}
                />
                <article>
                    <section>
                        <h4>기록된 감정</h4>
                        <div 
                            className={[
                                "diary_img_wrapper",
                                `diary_img_wrapper_${data.emotion}`,
                            ].join(" ")}
                        >
                            <img src={curEmotionData.emotion_img} />
                            <div className="emotion_descript">
                                {curEmotionData.emotion_descript}
                            </div>
                        </div>
                    </section>
                    <section>
                        <h4>작성한 감정기록</h4>
                        <div className="diary_content_wrapper">
                            <p>{data.content}</p>
                        </div>
                    </section>
                </article>
            </div>
        );
    }

    
};

export default Diary;