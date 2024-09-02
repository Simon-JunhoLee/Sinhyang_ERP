import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const WEB_CompanyCEO = () => {

    const imageStyle = {
        width: '100%',
        height: 'auto',
        display: 'flex',
        padding: '20px',
        borderRadius: '100px',
        maxWidth: '700px',
        margin: 'auto',
    };

    const textStyle = {
        textAlign: 'justify',
        lineHeight: '1.6',
        fontSize: '1.1rem',
        margin: '0 15px',
    };

    return (
        <Container className='mt-2 text-center'>
            <Row className='justify-content-center'>
                <Col lg={6}>
                    <img src='/images/menupage/ceo.png' alt='CEO' style={imageStyle} />
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col lg={8}>
                    <div className='text-center'>
                        <h3 className='mb-3'>안녕하십니까, 신향의 CEO 최동식입니다.</h3>
                        <p style={textStyle}>
                            저희 신향을 방문해주신 여러분께 진심으로 감사의 인사를 전합니다. 신향은 고객 여러분의 건강과 행복을 최우선으로 생각하며,<br />
                            최고 품질의 식품을 제공하기 위해 끊임없이 노력하고 있습니다. 저희 회사는 건강한 재료와 엄격한 품질 관리를 통해 맛있고 안전한 식품을 생산하고 있습니다.<br />
                            고객 여러분의 신뢰를 바탕으로, 신향은 지속적으로 성장해왔으며, 앞으로도 혁신과 품질 향상을 통해 고객 만족을 위해 최선을 다할 것입니다.<br />
                            또한, 환경 보호와 사회적 책임을 다하는 기업이 되기 위해 다양한 사회공헌 활동과 친환경 경영을 실천하고 있습니다.<br />
                            신향의 모든 임직원들은 고객 여러분의 사랑과 신뢰에 보답하기 위해 항상 노력할 것을 약속드립니다.<br />
                        </p>
                        <div className='text-end me-5'>
                            <div className='mt-2'>(주)신향 대표이사</div>
                            <h2>최동식</h2>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default WEB_CompanyCEO;
