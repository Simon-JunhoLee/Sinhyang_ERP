import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Accordion, Col, Container, Row, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const WEB_FAQPage = () => {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);

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
        <Container>
            <h1 className='text-center mb-5'>자주 묻는 질문 (FAQ)</h1>

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

export default WEB_FAQPage