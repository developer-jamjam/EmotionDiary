import { useNavigate } from 'react-router-dom';

const Main = () => {

    const navigate = useNavigate();
    
    return (
        <div className="MainPage">
            <div className='main_img_div'>
                <img className='main_img' src={process.env.PUBLIC_URL + `/tumbnail_404s.png`} />
            </div>
            <div className='main_btn_div'>
                <button className='main_button' onClick={()=>{navigate("/home")}}>감정 기록 가보자고!</button>
            </div>
        </div>
    )
}
export default Main;