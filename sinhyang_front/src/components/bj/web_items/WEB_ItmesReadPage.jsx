
import React, { useState } from 'react';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const WEB_ItmesReadPage = () => {
    const [onButton, setOnButton] = useState('음료');
    const navigate = useNavigate();

    const onClickButton = (category, path) => {
        setOnButton(category);
        navigate(path);
    };

    return (
        <div >
        <>
            <img src='/images/menupage/itemsl.png' className='no-space' />

            <div className='web-image-text'>    
                <h1>제품소개</h1>
                <p>즐거운 하루, 행복한 시간</p>
            </div>
        </>
                <h3 className='text-center mb-4 mt-5'>
                    제품소개
                </h3>
       
        <Container>
            <Row className="justify-content-center">
                <Card>
                    <Card.Body>
                        <Col lg={12} className="d-flex justify-content-center flex-wrap">
                            <Button onClick={() => onClickButton('음료', '/web/items/read')}
                                variant={onButton === '음료' ? 'danger' : 'outline-secondary'} className="mb-2 mx-4 button-size-big">
                                음료
                            </Button>


                            <Button onClick={() => onClickButton('면', '/web/items/noodle')}
                                variant={onButton === '면' ? 'danger' : 'outline-secondary'} className="mb-2 mx-4 button-size-big">
                                면
                            </Button>

                            <Button onClick={() => onClickButton('스낵', '/web/items/snack')}
                                variant={onButton === '스낵' ? 'danger' : 'outline-secondary'} className="mb-2 mx-4 button-size-big">
                                스낵
                            </Button>


                            <Button onClick={() => onClickButton('간편식', '/web/items/efood')}
                                variant={onButton === '간편식' ? 'danger' : 'outline-secondary'}  className="mb-2 mx-4 button-size-big" >
                                간편식
                            </Button>

                        </Col>
                    </Card.Body>
                </Card>
            </Row>
        </Container>

    </div>   
    );
}

export default WEB_ItmesReadPage;
