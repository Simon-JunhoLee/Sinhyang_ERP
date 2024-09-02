import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const ERPNoticeReadPage = () => {

    const {notice_id} = useParams();
    const [form, setForm] = useState('');
    
    
    // const callAPI = async () =>{
    //     const res = await axios.get(`/erp/notice/${notice_id}`);
    //     console.log(res.data);
    //     setForm(res.data);
    // }

    useEffect(()=>{
        axios.get(`/erp/notice/${notice_id}`)
        .then(res => setForm(res.data))
    },[])


    const onDelete = async () => {
        Swal.fire({
            title: "글을 삭제하시겠습니까?",
            text: "",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "삭제"
            
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`/erp/notice/${form.notice_id}`);
                window.location.href="/erp/notice/list";
            }
        });   
    }

    const onClickNotice = async () => {

        Swal.fire({
            title: "공지를 등록 하시겠습니까?",
            text: "",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "등록"
            
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.put(`/erp/notice/1`, form, notice_id);
                window.location.href="/erp/notice/list";
            }
        });   
    }
    
    const onClickUnNotice = async () => {
        Swal.fire({
            title: "글을 공지에서 해제 하시겠습니까?",
            text: "",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "해제"
            
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.put(`/erp/notice/0`, form, notice_id);
                window.location.href="/erp/notice/list";
            }
        });
    }



  return (
    <Row className='justify-content-center'>
        <Col lg={5}>
            <Card>
                <CardHeader className='text-center'>
                    <Row>
                        <Col className='text-end'>[{notice_id}] {form.notice_title} </Col>
                        <Col style={{width: '5%'}} className='text-end'>조회수 : {form.notice_viewcnt}</Col>
                    </Row>
                </CardHeader>
                <CardBody style={{whiteSpace:"pre-wrap"}}>
                    {form.notice_contents}
                </CardBody>
                <CardFooter>
                    <div className='text-end'>
                        Created by {form.notice_writer} on {moment(form.notice_regdate).format('yy년MM월DD일 HH시mm분ss초')}
                    </div>
                </CardFooter>
            </Card>
            {sessionStorage.getItem('member_info_id')===form.notice_writer &&
                <Row>
                    <Col>
                        {form.notice_type===0 ?
                            <div>
                                <Button size='sm' variant='outline-primary' onClick={onClickNotice}>공지등록하기</Button>
                            </div>
                        :
                            <div>
                                <Button size='sm' variant='outline-primary' onClick={onClickUnNotice}>공지해제하기</Button>
                            </div>
                        }
                    </Col>
                    <Col>
                        <div className='text-end my-3'>
                            <Button variant='outline-danger' className='me-2' size='sm' onClick={onDelete}>삭제하기</Button>
                            <Link to={`/erp/notice/update/${form.notice_id}`}><Button variant='outline-info' size='sm'>수정하기</Button></Link>
                        </div>
                    </Col>
                </Row>
            }
        </Col>
    </Row>
  )
}

export default ERPNoticeReadPage