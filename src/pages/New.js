import { useEffect } from 'react';
import DiaryEditor from '../components/DiaryEditor';

const New = () =>{
    useEffect(()=> {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `감정기록 : New감정기록`;
    },[]);

    return(
        <div>
            <DiaryEditor />
        </div>
    )
};

export default New;