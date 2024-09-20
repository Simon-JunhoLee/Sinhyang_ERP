import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Accordion, Button, Col, Container, Row, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';



const ERP_FAQPage = () => {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(50);

    const [count, setCount] = useState(0);
    const [key, setKey] = useState('');
    const [word, setWord] = useState('');

    const callAPI = async () => {
        const res = await axios.get(`/faq/list?key=${key}&word=${word}&size=${size}&page=${page}`);
        console.log(res.data.FAQlist);
        console.log(res.data.total);
        setList(res.data.FAQlist);
        setCount(res.data.total);

    }

    useEffect(() => {
        callAPI();
    }, [page, key]);

    return (
        <Container className='text-center'>

            <h1 className='mb-5'>자주 묻는 질문 (FAQ)</h1>
            {sessionStorage.getItem('member_info_id') &&
                <div className='text-end mb-3'>



                    <a href='/erp/faq/insert'>
                        <Button variant='outline-primary btn-sm'>글쓰기</Button>
                    </a>

                </div>
            }

            <Row>
                <Col>
                    <Accordion>
                        {list.map((faq, index) => (
                            <Accordion.Item eventKey={index.toString()} key={faq.faq_id}>
                                <Accordion.Header>
                                    <span className="web-faq-color">[Q]</span> {faq.faq_title}
                                </Accordion.Header>
                                <Accordion.Body>
                                    <span className="web-faq-color">[A]</span> {faq.faq_content}
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </Col>
            </Row>

        </Container>

    )
}

export default ERP_FAQPage