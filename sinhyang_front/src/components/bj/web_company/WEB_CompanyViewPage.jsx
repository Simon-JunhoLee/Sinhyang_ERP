import React from 'react';
import { Col, Container, Row, Card } from 'react-bootstrap';
import { HiOutlineLightBulb } from "react-icons/hi";
import { PiHandshakeThin } from "react-icons/pi";

const WEB_CompanyViewPage = () => {
  return (
    <div>
    <Container className="company-view mt-5">
      <Row className="text-center mb-3">
        <Col>
          <h2>회사개요</h2>
          <hr />
        </Col>
      </Row>
      <Row className="company-banner align-items-center">
        <Col>
          <div className="blue-content">
            <h3>신향F&B</h3>
            <p>고객의 식생활을 향상시키는 글로벌 식품 기업</p>
          </div>
        </Col>
      </Row>
      <Row className="company-info mt-4 align-items-center">
        <Col xs={2} className="text-center">
          <img src='/images/menupage/shlogo.png' width='200px' alt='Company Logo'/>
        </Col>
        <Col xs={10}>
          <ul className="company-info-list">
            <li>
              <strong>설립년도:</strong> 1999년
            </li>
            <li>
              <strong>대표자:</strong> 최동식
            </li>
            <li>
              <strong>전체 직원수:</strong> 신향 한국 52명 베트남 125명, 인도 150명
            </li>
            <li>
              <strong>연매출:</strong> 	23년 기준 124억원
            </li>
          </ul>
        </Col>
      </Row>
    </Container>

    <br/>


      <Container>
      <h2 className='text-center mt-5'>가치체계</h2>
      <Row className='text-center mt-5 justify-content-center'>
        <Col lg={5} >
          <Card>
            <Card.Body>
              <div className='d-flex justify-content-between align-items-center'>
                <div>우리 제품을 사용한 고객의 경쟁우위 확보</div>
                <div className='web-company-icon'>
                  <PiHandshakeThin color='blue' size={32} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={5} >
          <Card>
            <Card.Body>
              <div className='d-flex justify-content-between align-items-center'>
                <div>끊임없는 도전과 혁신을 통한 Group의 지속적 성장</div>
                <div className='web-company-icon'>
                  <HiOutlineLightBulb color='yellow' size={32} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

    <div className="mt-5">
        <Row className="align-items-center">
          <Col xs={12} md={6}>
            <img src='/images/menupage/shf.png' alt='Company Research' className="img-fluid  compnay-view-img" />
          </Col>
          <Col xs={12} md={6}>
            <div>
              <h2>최고의 신선도</h2>
              <p>세계인의 식탁에 건강과 행복을 제공하기 위해 신향은 오늘도 열심히 일합니다.</p>

            </div>
          </Col>
        </Row>
      </div>


    </div>
   
  );
}

export default WEB_CompanyViewPage;
