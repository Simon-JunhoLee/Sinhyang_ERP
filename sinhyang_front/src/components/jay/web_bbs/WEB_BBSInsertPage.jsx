import axios from 'axios';
import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'

const WEB_BBSInsertPage = () => {

    const [form, setForm] = useState({
        bbs_writer: sessionStorage.getItem('visitor_id'),
        bbs_title: '',
        bbs_category: '문의',
        bbs_content: '',
    })

    const { bbs_writer, bbs_title, bbs_category, bbs_content } = form;

    const onSubmit = async (e) => {
        e.preventDefault();
        if (bbs_title === '') {
            alert("제목을 반드시 적어주세요");
            return;
        }

        await axios.post('/bbs/insert', form);
        alert("문의게시판 등록완료");
        window.location.href = '/web/customer/bbs';


    };

    const onChangeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const onChangeReset = (e) => {
        setForm({ ...form, bbs_title: '', bbs_category: '', bbs_content: '', })
    }



    //문의 제안 칭찬/불만

    return (
        <div>
            <h2 className='text-center mb-4'>고객 게시판글쓰기</h2>
            <Container>
                <form onSubmit={onSubmit} onReset={onChangeReset}>
                    <Row>
                        <Col lg={4} md={4} xs={4}>
                            <Form.Select className='mb-2'
                                name='bbs_category' value={bbs_category} onChange={onChangeForm}
                            >
                                <option>문의</option>
                                <option>제안</option>
                                <option>칭찬/불만</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <Form.Control className='mb-1'
                        name='bbs_title' value={bbs_title} onChange={onChangeForm}
                        placeholder='제목을 입력하세요'

                    />
                    <Form.Control className='mb-3'
                        name='bbs_content' value={bbs_content} onChange={onChangeForm}
                        placeholder='내용을 입력하세요'
                        as="textarea"
                        rows={10}
                    />
                    <Button type='submit' variant='outline-primary btn-sm' className='me-2'>작성완료</Button>
                    <Button type='reset' variant='outline-danger btn-sm'>취소</Button>

                </form>
            </Container>
        </div>
    )
}

export default WEB_BBSInsertPage