import React, { useEffect, useState } from 'react'
import "./event.css";
import { Col, Row } from 'react-bootstrap';


const ERPEventTestPage = () => {
    const totalCells = 9; // 전체 칸 수
    const numbersPerCell = 9; // 각 칸당 숫자 개수
    const maxClicks = 3; // 최대 클릭 가능 횟수

    const [board, setBoard] = useState([]);
    const [winningNumbers, setWinningNumbers] = useState([]);
    const [clickCount, setClickCount] = useState(0);

    useEffect(() => {
        initializeGame();
        loadClickCountFromSession();
    }, []);

  // 게임 초기화
  const initializeGame = () => {
    const newBoard = Array.from({ length: totalCells }, (_, index) => ({
      id: index,
      numbers: generateNumbers(), // 각 칸의 숫자 리스트 생성
      isWinner: false,
      isClicked: false,
    }));

    setBoard(newBoard);
    selectWinningNumbers(newBoard);
  };

  // 당첨 숫자 선택
const selectWinningNumbers = (currentBoard) => {
    const newWinningNumbers = generateWinningNumbers();

    // 각 칸마다 당첨 여부 설정
    const updatedBoard = currentBoard.map(item => ({
        ...item,
        isWinner: newWinningNumbers.includes(item.numbers[0]), // 첫 번째 숫자만 확인
    }));

    setBoard(updatedBoard);
    setWinningNumbers(newWinningNumbers);
};

  // 숫자 생성 (1부터 100까지 중 랜덤하게 선택)
    const generateNumbers = () => {
        const numbers = [];
            while (numbers.length < numbersPerCell) {
                const randomNumber = Math.floor(Math.random() * 100) + 1;
                if (!numbers.includes(randomNumber)) {
                numbers.push(randomNumber);
                }
            }
        return numbers;
    };

  // 당첨 숫자 생성
  const generateWinningNumbers = () => {
    const winningNumbers = [];
    while (winningNumbers.length < numbersPerCell) {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      if (!winningNumbers.includes(randomNumber)) {
        winningNumbers.push(randomNumber);
      }
    }
    return winningNumbers;
  };

    // 세션 스토리지에서 클릭 횟수 로드
    const loadClickCountFromSession = () => {
        const clickCountFromSession = sessionStorage.getItem('clickCount');
        if (clickCountFromSession) {
            setClickCount(parseInt(clickCountFromSession, 10));
        }
    };

    // 세션 스토리지에 클릭 횟수 저장
    const saveClickCountToSession = (count) => {
        sessionStorage.setItem('clickCount', count.toString());
    };

    // 칸 클릭 시 실행되는 함수
        const handleClick = (id) => {
        const clickedCell = board.find(item => item.id === id);
        if (clickedCell.isClicked) {
            alert("이미선택한칸입니다.")
            return;
        }else if(clickCount >= maxClicks){
            alert("기회를 모두 소진하셨습니다.")
            return;
        }
        const updatedBoard = board.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    isClicked: true,
                };
            }
            return item;
        });

        setBoard(updatedBoard);
        setClickCount(prevCount => prevCount + 1); // 클릭 횟수 증가
        saveClickCountToSession(clickCount + 1); // 클릭 횟수 세션에 저장

        if (clickedCell.isWinner) {
            alert('당첨되었습니다!');
        }
    };

  return (
    <Row className='justify-content-center'>ㄴ
        <Col lg={4}>
            <div className="App">
                <h1>신향이벤트</h1>
                <p> 남은 횟수: {maxClicks - clickCount}</p>
                <div className="board">
                    <div className="grid-container">
                        {board.map(item => (
                            <div
                            key={item.id}
                            className={`cell ${item.isClicked ? (item.isWinner ? 'winner' : 'loser') : ''}`}
                            onClick={() => handleClick(item.id)}
                            >
                            {item.isClicked ? (item.isWinner ? '당첨' : '꽝') : '확인하기'}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Col>
    </Row>
  )
}

export default ERPEventTestPage