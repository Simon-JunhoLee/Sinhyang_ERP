
import React from 'react';
import { Col, Row } from 'react-bootstrap';


const Web_bottomPage = () => {

  return (
    <>
      <hr />
      <div className='web-bottom-page'>

        <div className='web-bottom-container'>
          <Row className=' justify-content: space-between;'>
            <Col>
              <img src='/images/menupage/shlogi3.png' className='company-logo' />
            </Col>
            <Col>
              <h5>회사소개</h5>
              <ul>
                <li><a href='/web/company/view'>회사개요</a></li>
                <li><a href='/web/company/history'>회사연혁</a></li>
                <li><a href='/web/company/ceo'>CEO인사말</a></li>
              </ul>
            </Col>
            <Col>
              <h5>제품소개</h5>
              <ul>
                <li><a href="/web/items/read">제품소개</a></li>
              </ul>
            </Col>
            <Col>
              <h5>고객지원</h5>
              <ul>
                <li><a href='/web/customer/bbs'>고객 게시판</a></li>
                <li><a href='/web/customer/faq'>FAQ</a></li>
              </ul>
            </Col>
          </Row>
          <div className='row mt-3'>
            <Col>
              <p>신향 고객상담실: 080-125-1111</p>
              <p>신향 견적문의실: 080-123-1212 (월-금 09:30-18:30)</p>
            </Col>
          </div>
        </div>
        <div className='back-to-top'>
          <a href='#top'>상단으로</a>
        </div>
      </div>

    </>
  );
}

export default Web_bottomPage;
