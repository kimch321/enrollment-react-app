import React, {useState} from 'react';
import EnrollmentForm from "./components/EnrollmentForm";

// EnrollmentForm이라는 폼을 return하도록 정의된 App 컴포넌트
const App = () => {
    const [program, setProgram] = useState("UG");  // 프로그램 종류
    const [ugSeats, setUgSeats] = useState(60);  // ug 참가가능 인원수
    const [pgSeats, setPgSeats] = useState(1);  // pg 참가가능 인원수
    const handleChange = (e) => {
        setProgram(e.target.value);
    };
    // 프로그램별 참가가능 인원수를 변경하는 함수
    const setUpdateSeats = (modifySeat) => {
        if(program === 'UG'){
            setUgSeats(modifySeat)
        } else {
            setPgSeats(modifySeat)
        }
    };
    return (
        <div className={"App"}>
            <div className={"programs"}>
                <h3 className={"title"}>프로그램 참가 등록양식</h3>
                <ul className={"ulEnrol"}>
                    <li onChange={handleChange}  className={"parentLabels"}>
                        <input type="radio" value={"UG"} name={"programgroup"} defaultChecked />학사과정
                        <input type="radio" value={"PG"} name={"programgroup"} />학사과정
                    </li>
                    <li><label>{(program === "UG") ? ugSeats : pgSeats}</label></li>
                </ul>
            </div>
            <EnrollmentForm chosenProgram={program}
                            curruntSeat={(program === 'UG')? ugSeats : pgSeats}
             setUpdateSeats={setUpdateSeats}/>
        </div>
    );
};

// 컴포넌트나 모듈형태로 작성하는 경우
// 기본적으로 내보내기할 함수명 지정
export default App;