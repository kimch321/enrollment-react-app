import React, {useState} from 'react';
import EnrollmentForm from "./components/EnrollmentForm";
import EnrolList from "./components/EnrolList";



// EnrollmentForm이라는 폼을 return하도록 정의된 App 컴포넌트
const App = () => {
    const [program, setProgram] = useState("UG");  // 프로그램 종류
    const [ugSeats, setUgSeats] = useState(60);  // ug 참가가능 인원수
    const [pgSeats, setPgSeats] = useState(1);  // pg 참가가능 인원수

    // 과정 등록한 학생들 정보를 저장하는 변수 선언
    const [studDetails, setStudDetails] = useState({});

    const [action, setAction] = useState();             // 작업종류 지정
    const [selItemKey, setSelItemKey] = useState();     // 등록정보 키

    // 라디오 버튼 체크 상태 처리, 초기값은 true로 설정
    const [isUGChecked, setIsUGChecked] = useState(true);
    // (삭제나 수정시) 참가가능 인원수 조정 필요 여부 설정, 초기값은 false로 설정
    const [isRestoreSeats, setIsRestoreSeats] = useState(false);

    const handleChange = (e) => {
        setProgram(e.target.value);
        // 참가 프로그램이 혹시라도 변경됐다면
        setIsUGChecked(!isUGChecked);
        if (isRestoreSeats) {
            e.target.value === 'US' ? // 변경전 프로그램 인원수를 원래대로 복원
                setPgSeats(pgSeats +1) : setUgSeats(ugSeats + 1)
            setIsRestoreSeats(false);
        }
    };

    // 프로그램별 참가가능 인원수를 변경하는 함수
    const setUpdateSeats = (modifySeat) => {
        if(program === 'UG'){
            setUgSeats(modifySeat)
        } else {
            setPgSeats(modifySeat)
        }
    };

    // 작업종류 , 키 설정 함수
    const handleItemSelection = (action,key) => {
        setAction(action);
        setSelItemKey(key);
    }

    // 등록학생 삭제나 수정시 참가가능 인원수 재수정
    const restoreSeats = (pgm) => {
        pgm === 'UG'? setUgSeats(ugSeats + 1) : setPgSeats(pgSeats + 1);
        setAction('');
    };

    // 수정시 참가 프로그램 변경시 참가가능 인원수 재조정
    const setReSelectProgram = (selProgram) => {
        selProgram === 'UG' ? setIsUGChecked(true) : setIsUGChecked(false)
        setProgram(selProgram);
        setIsRestoreSeats(true);
    }

    return (
        <div className={"App"}>
            <div className={"programs"}>
                <h3 className={"title"}>프로그램 참가 등록양식</h3>
                <ul className={"ulEnrol"}>
                    <li onChange={handleChange}  className={"parentLabels"}>
                        <input type="radio" value={"UG"} name={"programgroup"}
                               defaultChecked={isUGChecked} />학사과정
                        <input type="radio" value={"PG"} name={"programgroup"}
                               defaultChecked={!isUGChecked}/>학사과정
                    </li>
                    <li><label>{(program === "UG") ? ugSeats : pgSeats}</label></li>
                </ul>
            </div>
            <EnrollmentForm
                chosenProgram = {program}
                curruntSeat = {(program === 'UG')? ugSeats : pgSeats}
                setUpdateSeats = {setUpdateSeats}
                setStuDetails = {setStudDetails}
                handleItemSelection = {handleItemSelection}
                setReSelectProgram = {setReSelectProgram}
            />
            <EnrolList
                studDetails = {studDetails}
                setStudDetails = {setStudDetails}
                selectedItemKey = {selItemKey}
                action ={action}
                setAction = {setAction}
                restoreSeats = {restoreSeats}
            />
        </div>
    );
};

// 컴포넌트나 모듈형태로 작성하는 경우
// 기본적으로 내보내기할 함수명 지정
export default App;