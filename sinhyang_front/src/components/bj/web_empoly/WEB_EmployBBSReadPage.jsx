import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import moment from 'moment';

const WEB_EmployBBSReadPage = () => {
    const { employ_bbs_id } = useParams();
    const [list, setList] = useState('');
    const [loading, setLoading] = useState(true);

    const callAPI = async () => {
        const res = await axios.get(`/employ/bbs/${employ_bbs_id}`);
     //   console.log(res.data);
        setList(res.data);
        setLoading(false);
    }

    useEffect(() => {
        callAPI();
    }, []);


  return (
    <Container>
            <a href='/web/employ/bbs'>
                <IoIosArrowBack /> 채용공고로
            </a>
            <hr />
            <Row className="d-flex justify-content-between align-items-center mb-2">
                <Col>
                    <div className='ms-5'>
                        <strong>{list.employ_bbs_title}</strong>
                        <div style={{ fontSize: '13px' }}>등록일: {moment(list.employ_bbs_regdate).format('yy년MM월DD일 HH시mm분')}</div>
                        <div style={{ fontSize: '13px' }}>조회수: {list.employ_bbs_viewcnt}</div>
                    </div>

                </Col>

            </Row>


    <hr />
     <Card>
        <Card.Body style={{ whiteSpace: 'pre-wrap' }}>
            {list.employ_bbs_contents}
        </Card.Body>
    </Card>
    </Container>
  )
}

export default WEB_EmployBBSReadPage