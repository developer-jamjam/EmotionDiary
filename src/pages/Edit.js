import { useNavigate, useSearchParams } from 'react-router-dom';

const Edit = () =>{
    const navigate = useNavigate();
    const [searchParams,setSearchParams] = useSearchParams();

    const id = searchParams.get("id");
    console.log("id : " , id);

    return (
        <div>
            <h1>Edit</h1>
            <p>일기 수정하는 공간 </p>
            <button onClick={()=>setSearchParams({ who:"404"})}>
                QS Change
            </button>
            <button onClick={()=>{navigate("/home")}}>
                Home
            </button>
            <button onClick={()=>{navigate(-1);}} > 
                뒤로가기
            </button>
        </div>
    );
};

export default Edit;