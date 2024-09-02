import React from 'react'
import { Row, Col } from 'react-bootstrap'

const WEB_CompanyHistoryPage = () => {
  return (
    <div>
      <div className="mt-5">
        <Row className="align-items-center">
          <Col xs={12} md={6}>
            <img src='/images/menupage/shf.png' alt='Company Research' className="img-fluid  compnay-history-img" />
          </Col>
          <Col xs={12} md={6}>
            <div>
              <h1 className='com-history-header'>2023</h1>
              <p>12월) ㈜신향 상장</p>
              <p>10월) 소비자중심경영(CCM) 선포식</p>
              <p>4월) 우크라이나 난민 구호물품 지원</p>
            </div>
          </Col>
        </Row>
      </div>


      <div className="mt-5">
        <Row className="align-items-center">
          <Col xs={12} md={6}>
            <img src='/images/menupage/shitems3.jpg' alt='Company Research' className="img-fluid  compnay-history-img" />
          </Col>
          <Col xs={12} md={6}>
            <div>
              <h1 className='com-history-header'>2016</h1>
              <p>8월) 제1회 신향 농업상생 자원봉사활동</p>
              <p>4월) 2023 국가고객만족도(NCSI) 라면 부문 3위 선정(한국생산성본부)</p>
              <p>2월) 신향 버터칩 판매</p>
            </div>
          </Col>
        </Row>
      </div>



      
      <div className="mt-5">
        <Row className="align-items-center">
          <Col xs={12} md={6}>
            <img src='/images/menupage/shitems1.jpg' alt='Company Research' className="img-fluid  compnay-history-img" />
          </Col>
          <Col xs={12} md={6}>
            <div>
              <h1 className='com-history-header'>2008</h1>
              <p>10월) 2016 사회공헌 식품기부사업 보건복지부 장관상 수상</p>
              <p>2월) 신향 미소국 우주식품으로 최종인증 통과</p>
            </div>
          </Col>
        </Row>
      </div>
  

            
      <div className="mt-5">
        <Row className="align-items-center">
          <Col xs={12} md={6}>
            <img src='/images/menupage/build1.png' alt='Company Research' className="img-fluid  compnay-history-img" />
          </Col>
          <Col xs={12} md={6}>
            <div>
              <h1 className='com-history-header'>1999</h1>
              <p>10월) 회사 창립 </p>
            </div>
          </Col>
        </Row>
      </div>
    </div>



  )
}

export default WEB_CompanyHistoryPage