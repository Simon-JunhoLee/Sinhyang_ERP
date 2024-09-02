import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Button, Card, Col, InputGroup, Row, Form, Container } from 'react-bootstrap';


const WEB_BBSUpdatePage = () => {
    const { bbs_id } = useParams();
    const [form, setForm] = useState([]);



    const callAPI = async () => {
        const res = await axios.get(`/bbs/read/${bbs_id}`);
        console.log(res.data);
        setForm(res.data);
    }

    useEffect(() => {
        callAPI();
    }, [])


    const onClickUpdate = () => {

        if (!window.confirm(`${bbs_id}를 수정하시겠습니까?`)) return;
        axios.put(`/bbs/${bbs_id}`, form);
        alert("수정되었습니다. 수정된 페이지로 이동합니다.");
        window.location.href = `/web/customer/bbs/read/${bbs_id}`;

    }
    const onChangeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    return (
        <Container>
            <h1 className='text-center mb-4'>수정</h1>
            <form>
                <Row>
                    <Col xs={8} lg={4} md={4}>
                        <Form.Select className='mb-2'
                            name='bbs_category' value={form.bbs_category} onChange={onChangeForm}
                        >
                            <option>문의</option>
                            <option>제안</option>
                            <option>칭찬/불만</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Form.Control className='mb-1'
                    name='bbs_title' value={form.bbs_title} onChange={onChangeForm}
                    placeholder='제목을 입력하세요'

                />
                <Form.Control className='mb-2'
                    name='bbs_content' value={form.bbs_content} onChange={onChangeForm}
                    placeholder='내용을 입력하세요'
                    as="textarea"
                    rows={10}
                />
                <Button variant='outline-primary btn-sm' className='me-2' onClick={onClickUpdate}>수정하기</Button>
                <Button type='reset' variant='outline-danger btn-sm'>취소</Button>

            </form>
        </Container>
    )
}

export default WEB_BBSUpdatePage