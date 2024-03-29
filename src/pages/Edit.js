import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DiaryStateContext } from '../App';
import DiaryEditor from '../components/DiaryEditor';

const Edit = () =>{
    const navigate = useNavigate();
    const {id} = useParams();
    const [originData, setOriginData] = useState();
    const diaryList = useContext(DiaryStateContext);
    
    useEffect(()=> {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `감정기록 : ${id}번째기록수정`;
    },[]);

    useEffect(()=>{
        if (diaryList.length >= 1) {
            const targetDiary = diaryList.find(
                (it)=> parseInt(it.id) === parseInt(id)
            )

            if (targetDiary) {
                setOriginData(targetDiary);
            } else {
                navigate('/home',{ replace: true});
            }
        }
    },[id,diaryList]);


    return (
        <div>
            {originData && <DiaryEditor isEdit={true} originData={originData} />}
        </div>
    );
};

export default Edit;