import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DiaryItem from './DiaryItme';
import MyButton from './MyButton';

const sortOptionsList = [
    {value:"latest", name:"최근 기록"},
    {value:"oldest", name:"오래된 기록"},
]

const filterOptionList = [
    {value:"all", name: "감정조각"},
    {value:"good", name:"좋은감정 조각"},
    {value:"bad", name:"나쁜감정 조각"},
    {value:"notbad", name:"SoSo 조각"},
]

const ControlMenu =({value,onChange,optionsList})=> {
    return (
        <select className="ControlMenu" value={value} onChange={(e)=>onChange(e.target.value)}>
            {optionsList.map((it,idx)=> <option key={idx} value={it.value}>{it.name}</option>)}
        </select>
    ) 
}


const DiaryList = ({diaryList}) => {
    const navigate = useNavigate();
    const [sortType,setSortType] = useState("latest");
    const [filter,setFilter] = useState("all");

    const getProcessedDiaryList = () => {

        const filterCallBack = (item) => {
            if (filter === 'good') {
                return parseInt(item.emotion) <= 2 ;
            } else if (filter === 'bad') {
                return parseInt(item.emotion) > 3;
            } else {
                return parseInt(item.emotion) == 3;
            }
        }

        const compare = (a, b)=> {
            if(sortType === 'latest') {
                return parseInt(b.date) - parseInt(a.date);
            } else {
                return parseInt(a.date) - parseInt(b.date);
            }
        }
        const copyList = JSON.parse(JSON.stringify(diaryList));

        const filteredList = filter === 'all' ? copyList : copyList.filter((it)=>filterCallBack(it));
        const sortedList = filteredList.sort(compare);
        return sortedList;
    };

    return (
        <div className="DiaryList">
            <div className="menu_wrapper">
                <div className="left_col">
                    <ControlMenu 
                        value={sortType} 
                        onChange={setSortType}
                        optionsList={sortOptionsList}    
                    />
                    <ControlMenu
                        value={filter}
                        onChange={setFilter}
                        optionsList={filterOptionList}
                    />
                </div>
                <div className="right_col">
                    <MyButton 
                        type={"positive"} 
                        text={"새로운 감정기록하기"} 
                        onClick={()=> navigate("/new")}
                    />
                </div>
            </div>
            {getProcessedDiaryList().map((it)=> (
                <DiaryItem key={it.id} {...it} />
            ))}
        </div>
    );
};

DiaryList.defaultProps = {
    diaryList: [],
};
export default DiaryList;