import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const ERPNoticeUpdatePage = () => {

    const {notice_id} = useParams();

    const [form, setForm] = useState({
        notice_writer : sessionStorage.getItem("member_info_id"),
        notice_title : "",
        notice_contents :  ""
    });
    

    const {notice_title, notice_contents} = form;

    const callAPI = async () =>{
        const res = await axios.get(`/erp/notice/${notice_id}`);
        //console.log(res.data);
        setForm(res.data);
    }

    useEffect(()=>{
        callAPI();
    },[])




    const onChangeForm = (e) =>{
        setForm({...form, [e.target.name]: e.target.value});
    }

    const onReset = () =>{
        setForm({...form, notice_title:"", notice_contents:""});
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        Swal.fire({
            title: "글을 수정 하시겠습니까?",
            text: "",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "수정"
            
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.put(`/erp/notice`, form, notice_id);
                window.location.href="/erp/notice/list";
            }
        });  
    }



  return (
    <Row className='justify-content-center'>
        <h1 className='text-center'>글수정페이지 </h1>
        <Col lg={8}>
            <form onReset={onReset} onSubmit={onSubmit}>
                <Form.Control placeholder='제목을 입력하세요' className='mb-2' name="notice_title" value={notice_title}  onChange={onChangeForm} />
                <Form.Control as="textarea" rows={15} placeholder='내용을 입력하세요' name='notice_contents' value={notice_contents} onChange={onChangeForm} />
                <div className='text-end my-2'>
                    <Button className='me-2' size='sm' variant='outline-danger' type='reset'>다시쓰기</Button>
                    <Button size='sm' variant='outline-warning' type='submit'>수정하기</Button>
                </div>
            </form>
        </Col>
    </Row>
  )
}

export default ERPNoticeUpdatePage